<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-6">
    <div
        class="w-full max-w-3xl flex flex-col rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden dark:bg-gray-900 dark:border-slate-800 h-[650px] max-h-[85vh] relative"
    >
      <!-- Top bar (Fixed Overlay) -->
      <header
          class="absolute top-0 left-0 w-full h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white/80 backdrop-blur-md z-20 dark:bg-gray-900/80 dark:border-slate-800"
      >
        <button
            class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
            type="button"
            @click="router.back()"
        >
          <span class="text-lg leading-none">←</span>
          <span>Back</span>
        </button>

        <div class="flex items-center gap-3">
          <!-- Avatar / initials -->
          <div
              class="h-9 w-9 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700"
          >
            <template v-if="thread?.other_profile?.avatar_url">
              <img
                  :src="thread.other_profile.avatar_url"
                  class="h-full w-full object-cover"
                  alt="Avatar"
              />
            </template>
            <template v-else>
              {{ headerInitials }}
            </template>
          </div>

          <div class="text-left">
            <p class="text-sm font-bold text-slate-900 dark:text-white leading-none">
              {{ headerName }}
            </p>
            <p class="text-[10px] font-medium text-slate-400 mt-1 dark:text-slate-500">
              Amigo Lease Chat
            </p>
          </div>
        </div>

        <!-- Placeholder for spacing or action menu -->
        <div class="w-16 flex justify-end">
          <!-- Optional: Menu icon could go here -->
        </div>
      </header>

      <!-- Messages Area -->
      <main class="w-full h-full bg-slate-50/50 dark:bg-gray-900/50 relative">
        <!-- Decorative background pattern -->
        <div
            class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]"></div>

        <!-- Scrollable List (Padding top/bottom ensures content isn't hidden behind absolute header/footer) -->
        <div class="w-full h-full overflow-y-auto px-6 pt-20 pb-24 scroll-smooth">
          <div class="space-y-6">
            <!-- Loading -->
            <div v-if="loading" class="flex justify-center py-10">
              <div class="flex flex-col items-center gap-3 text-xs font-medium text-slate-400">
                <div
                    class="h-6 w-6 rounded-full border-2 border-t-slate-900 border-slate-200 animate-spin dark:border-t-white dark:border-slate-700"/>
                <span>Loading history...</span>
              </div>
            </div>

            <!-- Empty -->
            <div
                v-else-if="messages.length === 0"
                class="flex flex-col items-center justify-center py-20 text-center"
            >
              <div
                  class="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-4 dark:bg-slate-800">
                👋
              </div>
              <p class="text-sm font-bold text-slate-900 dark:text-white">
                Start the conversation
              </p>
              <p class="text-xs text-slate-500 max-w-xs mt-1 dark:text-slate-400">
                Say hi, ask about the room, or see if your vibes match.
              </p>
            </div>

            <!-- Messages list -->
            <div
                v-else
                class="space-y-2"
            >
              <div
                  v-for="m in messages"
                  :key="m.id"
                  class="flex w-full"
                  :class="m.sender_profile_id === currentUserId ? 'justify-end' : 'justify-start'"
              >
                <div
                    class="max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm relative group"
                    :class="m.sender_profile_id === currentUserId
                    ? 'bg-slate-900 text-white rounded-br-sm dark:bg-white dark:text-slate-900'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'"
                >
                  <p class="whitespace-pre-wrap break-words leading-relaxed">
                    {{ m.content }}
                  </p>
                  <p
                      class="mt-1 text-[10px] font-medium text-right opacity-60"
                      :class="m.sender_profile_id === currentUserId ? 'text-white' : 'text-slate-400'"
                  >
                    {{ formatTime(m.created_at) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="flex justify-center pt-2">
              <p
                  class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-bold text-rose-600 border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400"
              >
                <span>⚠️</span>
                <span>{{ error }}</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <!-- Input (Fixed Overlay) -->
      <footer
          class="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 bg-white/80 backdrop-blur-md z-20 dark:bg-gray-900/80 dark:border-slate-800">
        <div
            class="flex items-end gap-3 bg-slate-50 p-2 rounded-3xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <textarea
              v-model="draft"
              rows="1"
              class="flex-1 resize-none bg-transparent border-0 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:text-white max-h-32"
              placeholder="Type a message..."
              @keydown.enter.prevent="handleEnter"
          />
          <button
              class="h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              :class="!draft.trim() || sending
                ? 'bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 dark:bg-white dark:text-slate-900'"
              :disabled="!draft.trim() || sending"
              @click="handleSend"
          >
            <svg v-if="sending" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-4 w-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from '#imports'
import {useChat} from '~/composables/useChat'

const route = useRoute()
const router = useRouter()
const otherProfileId = route.params.id as string

// Use the new unified useChat composable
const {
  thread,
  messages,
  loading,
  error,
  sending,
  currentUserId,
  ensureThreadWithProfile,
  sendMessage
} = useChat()

const draft = ref('')
const activeThreadId = ref<string | null>(null)

onMounted(async () => {
  // ensureThreadWithProfile will:
  // - call RPC get_or_create_profile_thread(other_profile_id)
  // - load messages
  // - subscribe to realtime
  // - set thread.value and other_profile inside it
  const id = await ensureThreadWithProfile(otherProfileId)
  activeThreadId.value = id
})

const headerName = computed(() => {
  return thread.value?.other_profile?.full_name || 'Roommate'
})

const headerInitials = computed(() => {
  const name = headerName.value?.trim()
  if (!name) return 'AL'

  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 0) return 'AL'

  if (parts.length === 1) {
    const first = parts[0] ?? ''
    return first.slice(0, 2).toUpperCase()
  }

  const first = parts[0]?.[0] ?? ''
  const second = parts[1]?.[0] ?? ''
  const combined = (first + second).toUpperCase()

  return combined || 'AL'
})

const handleSend = async () => {
  const text = draft.value.trim()
  if (!text) return

  const threadId = activeThreadId.value || thread.value?.id
  if (!threadId) return

  await sendMessage(threadId, text)

  // only clear if no error
  if (!error.value) {
    draft.value = ''
  }
}

const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) {
    handleSend()
  }
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}
</script>