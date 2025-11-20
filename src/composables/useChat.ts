// src/composables/useChat.ts
import { ref, onUnmounted } from 'vue'
import { useNuxtApp } from '#imports'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface ChatMessage {
    id: string
    thread_id: string
    sender_profile_id: string
    content: string
    created_at: string
    read_at: string | null
}

export interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
    city: string | null
    area: string | null
}

export interface ChatThreadMeta {
    id: string
    kind: 'profile' | 'listing' | null
    profile_one_id: string
    profile_two_id: string
    listing_id: string | null
    last_message_at: string | null
    created_at: string
    // extra meta for UI (what /chat/[id] expects)
    other_profile?: Profile | null
}

export const useChat = () => {
    const { $supabase } = useNuxtApp()

    const messages = ref<ChatMessage[]>([])
    const loading = ref(false)
    const sending = ref(false)
    const error = ref<string | null>(null)
    const currentUserId = ref<string | null>(null)

    const thread = ref<ChatThreadMeta | null>(null)
    const otherProfile = ref<Profile | null>(null)

    const resolving = ref(false)
    const resolveError = ref<string | null>(null)

    let channel: RealtimeChannel | null = null
    let currentThreadId: string | null = null

    /**
     * Ensure we know who the current user is.
     */
    const initUser = async (): Promise<string | null> => {
        if (currentUserId.value) return currentUserId.value

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            return null
        }

        currentUserId.value = user.id
        return user.id
    }

    /**
     * Load a profile (used for "other" person in header).
     */
    const loadOtherProfile = async (id: string) => {
        const { data, error: profileError } = await ($supabase as any)
            .schema('amigo')
            .from('profiles')
            .select('id, full_name, avatar_url, city, area')
            .eq('id', id)
            .maybeSingle()

        if (!profileError && data) {
            otherProfile.value = data as Profile
        }
    }

    /**
     * Load all messages in a thread and start realtime subscription.
     */
    const loadMessages = async (threadId: string) => {
        loading.value = true
        error.value = null

        const userId = await initUser()
        if (!userId) {
            loading.value = false
            return
        }

        const { data, error: fetchError } = await ($supabase as any)
            .schema('amigo')
            .from('messages')
            .select('*')
            .eq('thread_id', threadId)
            .order('created_at', { ascending: true })

        if (fetchError) {
            error.value = fetchError.message
            loading.value = false
            return
        }

        messages.value = (data || []) as ChatMessage[]
        loading.value = false

        subscribeToThread(threadId)
    }

    /**
     * Subscribe to realtime INSERTs on this thread.
     */
    const subscribeToThread = (threadId: string) => {
        // If already subscribed to this thread, do nothing
        if (currentThreadId === threadId && channel) return

        // Clean up any existing channel
        if (channel) {
            $supabase.removeChannel(channel)
            channel = null
        }

        currentThreadId = threadId

        channel = $supabase
            .channel(`chat-thread-${threadId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'amigo',
                    table: 'messages',
                    filter: `thread_id=eq.${threadId}`
                },
                payload => {
                    const newMsg = payload.new as ChatMessage
                    if (!messages.value.find(m => m.id === newMsg.id)) {
                        messages.value = [...messages.value, newMsg]
                    }
                }
            )
            .subscribe()
    }

    /**
     * Send a message in the thread.
     */
    const sendMessage = async (threadId: string, content: string) => {
        const text = content.trim()
        if (!text || sending.value) return

        const userId = await initUser()
        if (!userId) return

        sending.value = true
        error.value = null

        const { data, error: insertError } = await ($supabase as any)
            .schema('amigo')
            .from('messages')
            .insert({
                thread_id: threadId,
                sender_profile_id: userId,
                content: text
            } as any)
            .select('*')
            .maybeSingle()

        if (insertError) {
            error.value = insertError.message
            sending.value = false
            return
        }

        if (data) {
            // optimistic add; realtime will also send it, but we de-dup
            if (!messages.value.find(m => m.id === data.id)) {
                messages.value = [...messages.value, data as ChatMessage]
            }
        }

        sending.value = false
    }

    /**
     * Mark messages as read (for this thread and not sent by me).
     */
    const markMessagesRead = async (threadId: string) => {
        const userId = await initUser()
        if (!userId) return

        await ($supabase as any)
            .schema('amigo')
            .from('messages')
            .update({ read_at: new Date().toISOString() } as any)
            .eq('thread_id', threadId)
            .neq('sender_profile_id', userId)
            .is('read_at', null)
    }

    /**
     * Profile-based entry:
     * /chat/[id] where [id] is the OTHER PROFILE id.
     */
    const ensureThreadWithProfile = async (other_profile_id: string) => {
        resolving.value = true
        resolveError.value = null

        const userId = await initUser()
        if (!userId) {
            resolving.value = false
            return null
        }

        const { data: rpcThread, error: rpcError } = await ($supabase as any)
            .rpc('get_or_create_profile_thread', { other_profile_id })

        if (rpcError || !rpcThread) {
            resolveError.value = rpcError?.message ?? 'Could not start conversation'
            resolving.value = false
            return null
        }

        const t = rpcThread as ChatThreadMeta

        await loadOtherProfile(other_profile_id)

        thread.value = {
            ...t,
            other_profile: otherProfile.value ?? null
        }

        await loadMessages(t.id)
        await markMessagesRead(t.id)

        resolving.value = false
        return t.id
    }

    /**
     * Thread-based entry:
     * /chat/[threadId] where param is the THREAD id.
     */
    const loadThreadMeta = async (threadId: string) => {
        resolving.value = true
        resolveError.value = null

        const userId = await initUser()
        if (!userId) {
            resolving.value = false
            return null
        }

        const { data: t, error: threadError } = await ($supabase as any)
            .schema('amigo')
            .from('chat_threads')
            .select('id, kind, profile_one_id, profile_two_id, listing_id, last_message_at, created_at')
            .eq('id', threadId)
            .maybeSingle()

        if (threadError || !t) {
            resolveError.value = threadError?.message ?? 'Conversation not found'
            resolving.value = false
            return null
        }

        const row = t as ChatThreadMeta

        const otherId =
            row.profile_one_id === userId ? row.profile_two_id : row.profile_one_id

        await loadOtherProfile(otherId)

        thread.value = {
            ...row,
            other_profile: otherProfile.value ?? null
        }

        await loadMessages(row.id)
        await markMessagesRead(row.id)

        resolving.value = false
        return row.id
    }

    /**
     * Optional: clear current thread + messages.
     */
    const resetThread = () => {
        messages.value = []
        thread.value = null
        otherProfile.value = null
        currentThreadId = null
        if (channel) {
            $supabase.removeChannel(channel)
            channel = null
        }
    }

    onUnmounted(() => {
        resetThread()
    })

    return {
        // core chat state
        messages,
        loading,
        sending,
        error,
        currentUserId,

        // thread meta / header data
        thread,
        otherProfile,
        resolving,
        resolveError,

        // actions
        loadMessages,
        sendMessage,
        markMessagesRead,
        ensureThreadWithProfile,
        loadThreadMeta,
        resetThread
    }
}