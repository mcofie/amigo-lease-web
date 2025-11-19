<!-- src/pages/chat/[threadId].vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Top bar -->
    <header class="h-14 flex items-center justify-between px-4 border-b bg-white">
      <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-900"
          @click="goBack"
      >
        ← Back
      </button>

      <div class="text-center">
        <p class="text-sm font-medium">
          {{ headerTitle }}
        </p>
        <p class="text-[11px] text-gray-500" v-if="subtitle">
          {{ subtitle }}
        </p>
      </div>

      <div class="w-10"/> <!-- spacer -->
    </header>

    <!-- Messages -->
    <main class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div v-if="loading" class="flex justify-center py-6">
          <p class="text-xs text-gray-500">Loading messages…</p>
        </div>

        <div v-else-if="messages.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
          <p class="text-sm text-gray-500">No messages yet.</p>
          <p class="text-xs text-gray-400">Say hi and break the ice.</p>
        </div>

        <div
            v-else
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="isMine(msg) ? 'justify-end' : 'justify-start'"
        >
          <div
              class="max-w-[75%] rounded-2xl px-3 py-2 text-sm"
              :class="isMine(msg)
              ? 'bg-orange-500 text-white rounded-br-sm'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'"
          >
            <p class="whitespace-pre-wrap break-words">
              {{ msg.content }}
            </p>
            <p
                class="mt-1 text-[10px]"
                :class="isMine(msg) ? 'text-orange-100/80' : 'text-gray-400'"
            >
              {{ formatTime(msg.created_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Error bar -->
      <div v-if="error" class="px-4 pb-1">
        <p class="text-[11px] text-red-500">
          {{ error }}
        </p>
      </div>

      <!-- Input -->
      <form
          class="border-t bg-white px-3 py-2 flex items-end gap-2"
          @submit.prevent="handleSend"
      >
        <textarea
            v-model="draft"
            rows="1"
            placeholder="Type a message..."
            class="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            @keydown.enter.exact.prevent="handleSend"
            @keydown.enter.shift.stop
        />
        <button
            type="submit"
            class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="!draft.trim() || sending"
        >
          {{ sending ? 'Sending…' : 'Send' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute, useRouter, useNuxtApp} from '#imports'
import {useChat} from '~/composables/useChat'

const route = useRoute()
const router = useRouter()
const {$supabase} = useNuxtApp()
const threadId = route.params.threadId as string

const {
  messages,
  loading,
  sending,
  error,
  currentUserId,
  loadMessages,
  sendMessage,
  markMessagesRead      // 👈 pull it from the composable
} = useChat()

const draft = ref('')

// For header – you can later replace with real other profile data
const headerTitle = ref('Chat')
const subtitle = ref<string | null>('')

interface ChatThreadRow {
  title?: string | null
  context?: string | null
}

// Optional: load some basic thread info (if you have amigo.chat_threads)
const loadThreadInfo = async () => {
  const {
    data: { user }
  } = await $supabase.auth.getUser()

  if (!user) {
    router.push('/auth')
    return
  }

  const { data, error } = await $supabase
      .schema('amigo')
      .from('chat_threads')
      .select('title, context') // only what you need
      .eq('id', threadId)
      .maybeSingle()

  if (error) {
    // optional: handle/log error
    headerTitle.value = 'Chat'
    subtitle.value = null
    return
  }

  const thread = data as ChatThreadRow | null

  if (thread) {
    headerTitle.value = thread.title ?? 'Chat'
    subtitle.value = thread.context ?? null
  } else {
    headerTitle.value = 'Chat'
    subtitle.value = null
  }
}

onMounted(async () => {
  if (!threadId) {
    // await loadUnreadCountIfYouExposeItSomehow // you could emit an event or just ignore for now
    router.push('/matches')
    return
  }

  await loadThreadInfo()
  await loadMessages(threadId)
  await markMessagesRead(threadId)
})

const handleSend = async () => {
  if (!draft.value.trim()) return
  await sendMessage(threadId, draft.value)
  if (!error.value) {
    draft.value = ''
  }
}

const isMine = (msg: any) => {
  return msg.sender_profile_id === currentUserId.value
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}

const goBack = () => {
  router.back()
}
</script>