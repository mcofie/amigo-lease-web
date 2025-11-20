<!-- src/pages/chat/[id].vue (or similar) -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Top bar -->
    <header class="border-b bg-white px-4 py-3">
      <div class="max-w-3xl mx-auto flex items-center justify-between gap-3">
        <button
            class="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-800"
            @click="router.back()"
        >
          ← Back
        </button>

        <div class="flex items-center gap-2">
          <img
              v-if="thread?.other_profile"
              :src="thread.other_profile.avatar_url || '/default-avatar.png'"
              class="h-7 w-7 rounded-full object-cover"
          />
          <div class="text-xs text-right">
            <p class="font-medium text-gray-900 truncate max-w-[140px]">
              {{ thread?.other_profile?.full_name || 'Roommate' }}
            </p>
            <p class="text-[11px] text-gray-400">
              Chatting on Amigo Lease
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Messages -->
    <main class="flex-1 overflow-y-auto px-4 py-4">
      <div class="max-w-3xl mx-auto space-y-4">
        <div v-if="loading" class="flex justify-center py-10">
          <div class="h-8 w-8 border-2 border-dashed border-gray-400 rounded-full animate-spin" />
        </div>

        <div
            v-else-if="messages.length === 0"
            class="text-center text-xs text-gray-500 py-10"
        >
          No messages yet. Say hi 👋
        </div>

        <div v-else class="space-y-3">
          <div
              v-for="m in messages"
              :key="m.id"
              class="flex"
              :class="m.sender_profile_id === currentUserId ? 'justify-end' : 'justify-start'"
          >
            <div
                class="max-w-[75%] rounded-2xl px-3 py-2 text-xs"
                :class="m.sender_profile_id === currentUserId
                ? 'bg-gray-900 text-white rounded-br-sm'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'"
            >
              <p class="whitespace-pre-wrap">
                {{ m.content }}
              </p>
              <p class="text-[10px] mt-1 text-gray-400 text-right">
                {{ new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </p>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-[11px] text-red-500">
          {{ error }}
        </p>
      </div>
    </main>

    <!-- Input -->
    <footer class="border-t bg-white px-4 py-3">
      <div class="max-w-3xl mx-auto flex items-center gap-2">
        <textarea
            v-model="draft"
            rows="1"
            class="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            placeholder="Say hi 👋, share your vibe, or ask about the place…"
            @keydown.enter.prevent="handleEnter"
        />
        <button
            class="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-medium hover:bg-black disabled:opacity-40"
            :disabled="!draft.trim() || sending"
            @click="handleSend"
        >
          {{ sending ? 'Sending…' : 'Send' }}
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useChatThread } from '~/composables/useChatThread'

const route = useRoute()
const router = useRouter()
const otherProfileId = route.params.id as string

const {
  thread,
  messages,
  loading,
  error,
  sending,
  currentUserId,
  ensureThreadWithProfile,
  sendMessage
} = useChatThread()

const draft = ref('')

onMounted(async () => {
  await ensureThreadWithProfile(otherProfileId)
})

const handleSend = async () => {
  if (!draft.value.trim()) return
  await sendMessage(draft.value.trim())
  draft.value = ''
}

const handleEnter = () => {
  handleSend()
}
</script>