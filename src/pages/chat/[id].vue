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
        <div ref="messagesContainer" class="w-full h-full overflow-y-auto px-6 pt-20 pb-24 scroll-smooth">
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
              <p class="text-xs text-slate-500 max-w-xs mt-1 mb-6 dark:text-slate-400">
                Say hi, ask about the room, or see if your vibes match.
              </p>

              <!-- Ice Breakers -->
              <div class="flex flex-wrap justify-center gap-2 max-w-md">
                <button
                    v-for="ice in iceBreakers"
                    :key="ice"
                    class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
                    @click="sendIceBreaker(ice)"
                >
                  {{ ice }}
                </button>
              </div>
            </div>

            <!-- Messages list -->
            <div
                v-else
                class="space-y-1"
            >
              <template v-for="(item, index) in processedMessages" :key="item.id || index">
                
                <!-- Date Divider -->
                <div v-if="item.type === 'divider'" class="flex justify-center py-4">
                  <span class="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wide dark:bg-slate-800 dark:text-slate-400">
                    {{ item.content }}
                  </span>
                </div>

                <!-- Message Bubble -->
                <div
                    v-else
                    class="flex w-full group"
                    :class="[
                      item.isMe ? 'justify-end' : 'justify-start',
                      item.isGroupStart ? 'mt-4' : 'mt-1'
                    ]"
                >
                  <!-- Avatar (only for other person, and only at start of group) -->
                  <div v-if="!item.isMe" class="w-8 flex-shrink-0 mr-2 flex items-end">
                    <div v-if="item.isGroupEnd" class="h-8 w-8 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                      <img v-if="thread?.other_profile?.avatar_url" :src="thread.other_profile.avatar_url" class="h-full w-full object-cover" />
                      <div v-else class="h-full w-full flex items-center justify-center text-[10px] font-bold text-slate-500">{{ headerInitials }}</div>
                    </div>
                    <div v-else class="w-8"></div>
                  </div>

                  <div
                      class="max-w-[80%] sm:max-w-[70%] px-4 py-2 text-sm shadow-sm relative"
                      :class="[
                        item.isMe 
                          ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white dark:from-white dark:to-slate-200 dark:text-slate-900' 
                          : 'bg-white text-slate-700 border border-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
                        item.isMe 
                          ? (item.isGroupStart ? 'rounded-t-2xl rounded-bl-2xl' : 'rounded-l-2xl') + ' ' + (item.isGroupEnd ? 'rounded-br-sm' : 'rounded-r-md')
                          : (item.isGroupStart ? 'rounded-t-2xl rounded-br-2xl' : 'rounded-r-2xl') + ' ' + (item.isGroupEnd ? 'rounded-bl-sm' : 'rounded-l-md')
                      ]"
                  >
                    <p class="whitespace-pre-wrap break-words leading-relaxed">
                      {{ item.content }}
                    </p>
                    
                    <div class="flex items-center justify-end gap-1 mt-1 opacity-60">
                      <span class="text-[10px] font-medium" :class="item.isMe ? 'text-white' : 'text-slate-400'">
                        {{ formatTimeShort(item.created_at) }}
                      </span>
                      <!-- Read Receipt (only for me) -->
                      <span v-if="item.isMe" class="flex" :title="item.read_at ? 'Read' : 'Sent'">
                        <svg v-if="item.read_at" class="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" class="opacity-50" style="transform: translateX(-4px);" />
                        </svg>
                        <svg v-else class="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

              </template>
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
import {ref, onMounted, computed, watch, nextTick} from 'vue'
import {useRoute, useRouter} from '#imports'
import {useChat} from '~/composables/useChat'

const route = useRoute()
const router = useRouter()
const otherProfileId = route.params.id as string

console.log('[Chat] Setup started for ID:', otherProfileId)

try {
  useSeoMeta({
    title: computed(() => {
      try {
        return thread.value?.other_profile ? `Chat with ${thread.value.other_profile.full_name} - Amigo Lease` : 'Chat - Amigo Lease'
      } catch (e) {
        console.error('[Chat] Error in title computed:', e)
        return 'Chat - Amigo Lease'
      }
    }),
    description: 'Private conversation on Amigo Lease.',
  })
} catch (e) {
  console.error('[Chat] Error in useSeoMeta:', e)
}


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
  scrollToBottom()
})

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(() => messages.value.length, () => {
  scrollToBottom()
})

watch(() => loading.value, (newVal) => {
  if (!newVal) {
    scrollToBottom()
  }
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

// --- PROCESSED MESSAGES (Grouping & Dividers) ---

interface ProcessedItem {
  type: 'message' | 'divider'
  id?: string
  content: string
  created_at?: string
  sender_profile_id?: string
  read_at?: string | null
  isMe?: boolean
  isGroupStart?: boolean
  isGroupEnd?: boolean
}

const processedMessages = computed<ProcessedItem[]>(() => {
  const raw = messages.value
  if (!raw.length) return []

  const result: ProcessedItem[] = []
  let lastDateStr = ''
  let lastSenderId = ''
  let lastTime = 0

  for (let i = 0; i < raw.length; i++) {
    const m = raw[i]
    if (!m) continue

    const d = new Date(m.created_at)
    const dateStr = d.toDateString()
    const time = d.getTime()

    // 1. Date Divider
    if (dateStr !== lastDateStr) {
      result.push({
        type: 'divider',
        content: formatDateDivider(d)
      })
      lastDateStr = dateStr
      lastSenderId = '' // reset grouping on new day
    }

    // 2. Grouping Logic
    const isMe = m.sender_profile_id === currentUserId.value
    const isSameSender = m.sender_profile_id === lastSenderId
    const isWithinTime = (time - lastTime) < 5 * 60 * 1000 // 5 mins

    let isGroupStart = true
    if (isSameSender && isWithinTime) {
      isGroupStart = false
      // Update previous message to NOT be group end
      const prevMsgIdx = result.length - 1
      const prevMsg = result[prevMsgIdx]
      if (prevMsg && prevMsg.type === 'message') {
        prevMsg.isGroupEnd = false
      }
    }

    result.push({
      type: 'message',
      id: m.id,
      content: m.content,
      created_at: m.created_at,
      sender_profile_id: m.sender_profile_id,
      read_at: m.read_at,
      isMe,
      isGroupStart,
      isGroupEnd: true // assume end until next message proves otherwise
    })

    lastSenderId = m.sender_profile_id
    lastTime = time
  }

  return result
})

const formatDateDivider = (d: Date) => {
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday = d.toDateString() === yesterday.toDateString()

  if (isToday) return 'Today'
  if (isYesterday) return 'Yesterday'
  
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const formatTimeShort = (iso?: string) => {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// --- ICE BREAKERS ---
const iceBreakers = [
  "Hi! Is the room still available?",
  "Hey, I think we'd be great roommates!",
  "When are you free for a viewing?",
  "Love the location! Tell me more."
]

const sendIceBreaker = (text: string) => {
  draft.value = text
  handleSend()
}

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
</script>