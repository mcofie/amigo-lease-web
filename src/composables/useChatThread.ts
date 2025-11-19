// src/composables/useChatThread.ts
import {ref} from 'vue'
import {useNuxtApp} from '#app'

export interface ChatMessage {
    id: string
    thread_id: string
    sender_profile_id: string
    content: string
    created_at: string
}

export interface ChatThreadInfo {
    id: string
    created_at: string
    subject: string | null
    other_profile: {
        id: string
        full_name: string | null
        avatar_url: string | null
    } | null
}

export const useChatThread = () => {
    const {$supabase} = useNuxtApp()

    const thread = ref<ChatThreadInfo | null>(null)
    const messages = ref<ChatMessage[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const ensureThreadWithProfile = async (otherProfileId: string) => {
        loading.value = true
        error.value = null

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            loading.value = false
            return null
        }

        const { data, error: rpcError } = await ($supabase as any)
            .rpc('amigo_ensure_direct_thread', {
                other_profile_id: otherProfileId
            })

        if (rpcError || !data) {
            error.value = rpcError?.message ?? 'Could not create chat'
            loading.value = false
            return null
        }

        const threadId = data as string
        await loadThread(threadId)
        await loadMessages(threadId)
        loading.value = false
        return threadId
    }

    const loadThread = async (threadId: string) => {
        const {data, error: threadError} = await $supabase
            .from('amigo.chat_threads')
            .select(`
        id,
        created_at,
        subject,
        other_profile:profiles!thread_other_profile_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
            .eq('id', threadId)
            .maybeSingle()

        if (threadError || !data) {
            error.value = threadError?.message ?? 'Thread not found'
            return
        }

        thread.value = data as ChatThreadInfo
    }

    const loadMessages = async (threadId: string) => {
        const {data, error: msgError} = await $supabase
            .from('amigo.messages')
            .select('*')
            .eq('thread_id', threadId)
            .order('created_at', {ascending: true})

        if (msgError) {
            error.value = msgError.message
            return
        }

        messages.value = data as ChatMessage[]
    }

    const sendMessage = async (threadId: string, content: string) => {
        if (!content.trim()) return

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            return
        }

        const { data, error: insertError } = await ($supabase as any)
            .from('amigo.messages')
            .insert(
                {
                    thread_id: threadId,
                    sender_profile_id: user.id,
                    content
                } as any
            )
            .select('*')
            .maybeSingle()

        if (insertError) {
            error.value = insertError.message
            return
        }

        if (!data) {
            // nothing returned – nothing to push
            return
        }

        const msg = data as ChatMessage
        messages.value.push(msg)
    }

    return {
        thread,
        messages,
        loading,
        error,
        ensureThreadWithProfile,
        loadThread,
        loadMessages,
        sendMessage
    }
}