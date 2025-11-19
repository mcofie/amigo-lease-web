// src/composables/useChat.ts
import {ref, onUnmounted} from 'vue'
import {useNuxtApp} from '#app'

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

    let channel: any = null


    const initUser = async () => {
        const {
            data: {user},
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            return null
        }

        currentUserId.value = user.id
        return user
    }

    const loadMessages = async (threadId: string) => {
        loading.value = true
        error.value = null

        const user = await initUser()
        if (!user) {
            loading.value = false
            return
        }

        const {data, error: fetchError} = await $supabase
            .from('amigo.messages')
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

        // subscribe to realtime inserts
        subscribeToThread(threadId)
    }

    const subscribeToThread = (threadId: string) => {
        // clean existing channel
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
                (payload: any) => {
                    const newMsg = payload.new as ChatMessage
                    // avoid duplicates
                    if (!messages.value.find((m) => m.id === newMsg.id)) {
                        messages.value = [...messages.value, newMsg]
                    }
                }
            )
            .subscribe()
    }

    const sendMessage = async (threadId: string, content: string) => {
        if (!content.trim()) return
        if (sending.value) return

        sending.value = true
        error.value = null

        const user = await initUser()
        if (!user) {
            sending.value = false
            return
        }

        const { data, error: insertError } = await ($supabase as any)
            .from('amigo.messages')
            .insert(
                {
                    thread_id: threadId,
                    sender_profile_id: user.id,
                    content: content.trim()
                } as any
            )
            .select('*')
            .maybeSingle()

        if (insertError) {
            error.value = insertError.message
            sending.value = false
            return
        }

        if (data) {
            const msg = data as ChatMessage
            // optimistic add (realtime will also send it, but we guard against dupes)
            if (!messages.value.find((m) => m.id === msg.id)) {
                messages.value = [...messages.value, msg]
            }
        }

        sending.value = false
    }


    const markMessagesRead = async (threadId: string) => {
        const {
            data: { user }
        } = await $supabase.auth.getUser()
        if (!user) return

        await ($supabase as any)
            .schema('amigo')
            .from('messages')
            .update({ read_at: new Date().toISOString() })
            .eq('thread_id', threadId)
            .neq('sender_profile_id', user.id)
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