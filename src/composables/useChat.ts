// src/composables/useChat.ts
import {ref, onUnmounted} from 'vue'
import {useNuxtApp} from '#imports'

export interface ChatMessage {
    id: string
    thread_id: string
    sender_profile_id: string
    content: string
    created_at: string
    read_at: string | null
}

export const useChat = () => {
    const {$supabase} = useNuxtApp()

    const messages = ref<ChatMessage[]>([])
    const loading = ref(false)
    const sending = ref(false)
    const error = ref<string | null>(null)
    const currentUserId = ref<string | null>(null)

    // Supabase Realtime channel
    let channel: ReturnType<typeof $supabase.channel> | null = null

    /**
     * Ensure we know who the current user is.
     */
    const initUser = async () => {
        if (currentUserId.value) return currentUserId.value

        const {
            data: {user},
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

        const {data, error: fetchError} = await $supabase
            .schema('amigo')
            .from('messages')
            .select('*')
            .eq('thread_id', threadId)
            .order('created_at', {ascending: true})

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
        // Clean up any existing channel
        if (channel) {
            $supabase.removeChannel(channel)
            channel = null
        }

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

        const {data, error: insertError} = await $supabase
            .schema('amigo')
            .from('messages')
            .insert({
                thread_id: threadId,
                sender_profile_id: userId,
                content: text
            })
            .select('*')
            .maybeSingle<ChatMessage>()

        if (insertError) {
            error.value = insertError.message
            sending.value = false
            return
        }

        if (data) {
            // optimistic add; realtime will also send it, but we de-dup
            if (!messages.value.find(m => m.id === data.id)) {
                messages.value = [...messages.value, data]
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

        await $supabase
            .schema('amigo')
            .from('messages')
            .update({read_at: new Date().toISOString()})
            .eq('thread_id', threadId)
            .neq('sender_profile_id', userId)
            .is('read_at', null)
    }

    onUnmounted(() => {
        if (channel) {
            $supabase.removeChannel(channel)
            channel = null
        }
    })

    return {
        messages,
        loading,
        sending,
        error,
        currentUserId,
        loadMessages,
        sendMessage,
        markMessagesRead
    }
}