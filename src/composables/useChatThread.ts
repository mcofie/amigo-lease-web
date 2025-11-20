// src/composables/useChatThread.ts
import { ref, computed } from 'vue'
import { useNuxtApp } from '#imports'
import { useChat } from '~/composables/useChat' // ✅ import the composable

export interface ChatThread {
    id: string
    kind: string
    profile_one_id: string
    profile_two_id: string
    created_at: string
    other_profile?: {
        id: string
        full_name: string | null
        city: string | null
        area: string | null
        avatar_url: string | null
    } | null
}

export const useChatThread = () => {
    const { $supabase } = useNuxtApp()

    const thread = ref<ChatThread | null>(null)
    const threadLoading = ref(false)
    const threadError = ref<string | null>(null)

    const {
        messages,
        loading: messagesLoading,
        sending,
        error: chatError,
        currentUserId,
        loadMessages,
        sendMessage,
        markMessagesRead
    } = useChat()

    const loading = computed(() => threadLoading.value || messagesLoading.value)
    const error = computed(() => threadError.value || chatError.value)

    const ensureThreadWithProfile = async (otherProfileId: string) => {
        threadLoading.value = true
        threadError.value = null

        // 1) call RPC to get/create thread
        const { data, error: rpcError } = await $supabase
            .rpc('get_or_create_profile_thread', { other_profile_id: otherProfileId })

        if (rpcError || !data) {
            threadError.value = rpcError?.message ?? 'Failed to start chat'
            threadLoading.value = false
            return
        }

        const t = data as ChatThread
        thread.value = t

        // 2) fetch other profile summary
        const { data: other, error: profileError } = await $supabase
            .schema('amigo')
            .from('profiles')
            .select('id, full_name, city, area, avatar_url')
            .eq('id', otherProfileId)
            .maybeSingle<{
                id: string
                full_name: string | null
                city: string | null
                area: string | null
                avatar_url: string | null
            }>()

        if (!profileError && other && thread.value) {
            thread.value = {
                ...thread.value,
                other_profile: other
            }
        }

        // 3) load messages + mark read
        await loadMessages(t.id)
        await markMessagesRead(t.id)

        threadLoading.value = false
    }

    const sendMessageInThread = async (content: string) => {
        if (!thread.value) return
        await sendMessage(thread.value.id, content)
        await markMessagesRead(thread.value.id)
    }

    return {
        thread,
        messages,
        loading,
        error,
        sending,
        currentUserId,
        ensureThreadWithProfile,
        sendMessage: sendMessageInThread
    }
}