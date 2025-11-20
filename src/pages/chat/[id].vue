<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white flex justify-center px-4 py-6">
    <div
        class="w-full max-w-3xl flex flex-col rounded-3xl bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.12)] border border-orange-100 overflow-hidden"
    >
      <!-- Top bar -->
      <header
          class="h-14 flex items-center justify-between px-4 border-b border-orange-100 bg-white/80 backdrop-blur-sm"
      >
        <button
            class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900"
            type="button"
            @click="router.back()"
        >
          <span class="text-lg leading-none">←</span>
          <span>Back</span>
        </button>

        <div class="flex items-center gap-2 max-w-[60%]">
          <!-- Avatar / initials -->
          <div
              class="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-[11px] font-semibold text-white shadow-sm"
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

          <div class="min-w-0 text-left">
            <p class="text-sm font-semibold text-gray-900 truncate">
              {{ headerName }}
            </p>
            <p class="text-[11px] text-gray-500 truncate">
              Chatting on Amigo Lease
            </p>
          </div>
        </div>

        <div class="w-14" />
      </header>

      <!-- Messages -->
      <main class="flex-1 flex flex-col bg-gradient-to-b from-white via-orange-50/40 to-white">
        <div class="flex-1 overflow-y-auto px-4 py-4">
          <div class="space-y-4 max-w-full">
            <!-- Loading -->
            <div v-if="loading" class="flex justify-center py-10">
              <div class="flex flex-col items-center gap-2 text-xs text-gray-500">
                <div class="h-8 w-8 rounded-full border-2 border-dashed border-gray-300 animate-spin" />
                <span>Loading messages…</span>
              </div>
            </div>

            <!-- Empty -->
            <div
                v-else-if="messages.length === 0"
                class="flex flex-col items-center justify-center py-14 text-center gap-2"
            >
              <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                💬
              </div>
              <p class="text-sm font-medium text-gray-800">
                No messages yet
              </p>
              <p class="text-xs text-gray-500 max-w-xs">
                Say hi, share your vibe, or ask about the place. First messages don’t have to be perfect.
              </p>
            </div>

            <!-- Messages list -->
            <div
                v-else
                class="space-y-3"
            >
              <div
                  v-for="m in messages"
                  :key="m.id"
                  class="flex"
                  :class="m.sender_profile_id === currentUserId ? 'justify-end' : 'justify-start'"
              >
                <div
                    class="max-w-[75%] rounded-2xl px-3 py-2 text-xs shadow-sm"
                    :class="m.sender_profile_id === currentUserId
                    ? 'bg-gray-900 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'"
                >
                  <p class="whitespace-pre-wrap break-words">
                    {{ m.content }}
                  </p>
                  <p
                      class="mt-1 text-[10px] text-right"
                      :class="m.sender_profile_id === currentUserId ? 'text-gray-300' : 'text-gray-400'"
                  >
                    {{ formatTime(m.created_at) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="pt-1">
              <p
                  class="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-[11px] text-red-600 border border-red-100"
              >
                <span class="text-xs">⚠️</span>
                <span>{{ error }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Input -->
        <footer class="border-t border-orange-100 bg-white/90 px-3 py-3">
          <div class="flex items-end gap-2">
            <textarea
                v-model="draft"
                rows="1"
                class="flex-1 resize-none rounded-2xl border border-gray-200 px-3 py-2 text-xs bg-white/90 shadow-inner focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Say hi 👋, share your vibe, or ask about the place…"
                @keydown.enter.prevent="handleEnter"
            />
            <button
                class="px-4 py-2 rounded-2xl bg-gray-900 text-white text-xs font-medium hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                :disabled="!draft.trim() || sending"
                @click="handleSend"
            >
              {{ sending ? 'Sending…' : 'Send' }}
            </button>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useChat } from '~/composables/useChat'

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

const handleEnter = () => {
  handleSend()
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>