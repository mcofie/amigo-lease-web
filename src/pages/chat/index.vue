<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-4xl mx-auto space-y-8">

      <!-- HEADER -->
      <header class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div class="space-y-2">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
            <span class="relative flex h-2 w-2">
              <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Inbox
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Messages
          </h1>
          <p class="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base">
            All your conversations with potential roommates and hosts in one place.
          </p>
        </div>

        <div class="flex flex-col items-end gap-3">
          <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm disabled:opacity-60 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
              :disabled="loading"
              @click="refresh"
          >
            <span
                class="mr-2 h-1.5 w-1.5 rounded-full"
                :class="loading ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'"
            />
            <span>{{ loading ? 'Refreshing...' : 'Refresh Inbox' }}</span>
          </button>
          <p v-if="threadsWithMeta.length > 0" class="text-xs font-medium text-slate-400 dark:text-slate-500">
            {{ threadsWithMeta.length }} active {{ threadsWithMeta.length === 1 ? 'conversation' : 'conversations' }}
          </p>
        </div>
      </header>

      <!-- ERROR -->
      <div
          v-if="errorMessage"
          class="rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-sm font-medium text-rose-700 flex items-center gap-3 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400"
      >
        <span class="text-lg">⚠️</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- LOADING -->
      <div v-else-if="loading" class="py-24 flex flex-col items-center justify-center gap-4">
        <div
            class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"/>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider animate-pulse">Loading chats...</p>
      </div>

      <!-- EMPTY STATE -->
      <div
          v-else-if="threadsWithMeta.length === 0"
          class="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-20 px-6 text-center dark:border-slate-800 dark:bg-gray-900/50"
      >
        <div
            class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 dark:bg-gray-800 dark:border-slate-700">
          <span class="text-3xl">💬</span>
        </div>
        <h3 class="text-slate-900 font-bold text-lg mb-2 dark:text-white">
          No conversations yet
        </h3>
        <p class="text-slate-500 text-sm max-w-xs mx-auto mb-8 dark:text-slate-400">
          Check your matches, find someone whose vibe fits yours, and say hi to start a chat.
        </p>
        <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            @click="goToMatches"
        >
          Browse Matches →
        </button>
      </div>

      <!-- THREAD LIST -->
      <section v-else class="space-y-4">
        <div class="flex items-center justify-between px-2">
          <h2 class="text-xs font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Recent Messages</h2>
        </div>

        <article
            v-for="item in threadsWithMeta"
            :key="item.thread.id"
            class="group relative bg-white rounded-2xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-4 dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
            @click="openChat(item.otherProfileId)"
        >
          <!-- Avatar -->
          <div class="flex-shrink-0 relative">
            <div
                class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-900 text-xs font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              <img
                  v-if="item.avatar_url"
                  :src="item.avatar_url"
                  alt=""
                  class="w-full h-full object-cover"
              />
              <span v-else>{{ initials(item.otherName) }}</span>
            </div>
            <!-- Online dot placeholder if needed -->
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-900 truncate dark:text-white">
                  {{ item.otherName }}
                </h4>
                <span
                    v-if="item.score != null"
                    class="inline-flex items-center px-1.5 py-0.5 rounded-md bg-orange-50 border border-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400"
                >
                  {{ item.score }}% Match
                </span>
              </div>
              <span class="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                {{ formatTime(item.thread.last_message_at || item.thread.created_at) }}
              </span>
            </div>

            <p class="text-xs text-slate-500 font-medium truncate pr-8 dark:text-slate-400">
              <span class="text-slate-300 mr-1 dark:text-slate-600">↪</span>
              {{ item.thread.last_message_preview || 'Start the conversation...' }}
            </p>

            <!-- Location hint -->
            <div v-if="item.location"
                 class="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="truncate max-w-[200px]">{{ item.location }}</span>
            </div>
          </div>

          <!-- Chevron -->
          <div
              class="text-slate-300 group-hover:text-slate-400 transition-colors pr-2 dark:text-slate-700 dark:group-hover:text-slate-500">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {useRouter, useNuxtApp} from '#imports'

interface ChatThread {
  id: string
  profile_one_id: string
  profile_two_id: string
  last_message_at: string | null
  last_message_preview: string | null
  created_at: string
}

interface ThreadWithMeta {
  thread: ChatThread
  otherProfileId: string
  otherName: string
  location: string | null
  score: number | null
  avatar_url: string | null
}

const router = useRouter()
const {$supabase} = useNuxtApp()

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const currentUserId = ref<string | null>(null)

const threads = ref<ChatThread[]>([])
const profilesById = ref<
    Record<
        string,
        {
          full_name?: string | null
          city?: string | null
          area?: string | null
          avatar_url?: string | null
        }
    >
>({})
const matchesByOtherId = ref<Record<string, { score: number | null }>>({})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true
  errorMessage.value = null

  const {
    data: {user},
    error: authError
  } = await $supabase.auth.getUser()

  if (authError || !user) {
    router.push('/auth')
    return
  }
  currentUserId.value = user.id

  // 1) Load threads where I'm either side
  const {data: threadsData, error: threadsErr} = await $supabase
      .schema('amigo')
      .from('chat_threads')
      .select('*')
      .or(`profile_one_id.eq.${user.id},profile_two_id.eq.${user.id}`)

  if (threadsErr) {
    errorMessage.value = threadsErr.message
    loading.value = false
    return
  }

  threads.value = (threadsData || []) as ChatThread[]

  if (threads.value.length === 0) {
    loading.value = false
    return
  }

  // 2) Other profile IDs
  const otherIds = new Set<string>()
  for (const t of threads.value) {
    const otherId =
        t.profile_one_id === user.id ? t.profile_two_id : t.profile_one_id
    otherIds.add(otherId)
  }

  const idsArray = Array.from(otherIds)
  if (idsArray.length === 0) {
    loading.value = false
    return
  }

  // 3) Load those profiles (include avatar_url)
  const {data: profilesData, error: profilesErr} = await $supabase
      .schema('amigo')
      .from('profiles')
      .select('id, full_name, city, area, avatar_url')
      .in('id', idsArray)

  if (profilesErr) {
    errorMessage.value = profilesErr.message
    loading.value = false
    return
  }

  const mapProfiles: Record<
      string,
      { full_name?: string | null; city?: string | null; area?: string | null; avatar_url?: string | null }
  > = {}

  for (const p of (profilesData || []) as {
    id: string
    full_name?: string | null
    city?: string | null
    area?: string | null
    avatar_url?: string | null
  }[]) {
    mapProfiles[p.id] = {
      full_name: p.full_name ?? null,
      city: p.city ?? null,
      area: p.area ?? null,
      avatar_url: p.avatar_url ?? null
    }
  }

  profilesById.value = mapProfiles

  // 4) Load match scores (if any)
  const {data: matchesData, error: matchesErr} = await $supabase
      .schema('amigo')
      .from('matches')
      .select('other_profile_id, score')
      .eq('profile_id', user.id)
      .in('other_profile_id', idsArray)

  if (matchesErr) {
    console.warn(matchesErr)
  } else {
    const mapMatches: Record<string, { score: number | null }> = {}
    for (const m of (matchesData || []) as {
      other_profile_id: string
      score: number | null
    }[]) {
      mapMatches[m.other_profile_id] = {score: m.score}
    }
    matchesByOtherId.value = mapMatches
  }

  loading.value = false
}

const threadsWithMeta = computed<ThreadWithMeta[]>(() => {
  if (!currentUserId.value) return []

  const result: ThreadWithMeta[] = []

  for (const t of threads.value) {
    const otherId =
        t.profile_one_id === currentUserId.value ? t.profile_two_id : t.profile_one_id

    const profile = profilesById.value[otherId] || {}
    const matchInfo = matchesByOtherId.value[otherId] || {score: null}

    const location =
        profile.city && profile.area
            ? `${profile.area}, ${profile.city}`
            : profile.city || profile.area || null

    result.push({
      thread: t,
      otherProfileId: otherId,
      otherName: profile.full_name || 'Roommate',
      location,
      score: matchInfo.score ?? null,
      avatar_url: profile.avatar_url ?? null
    })
  }

  // sort by last_message_at (desc), fallback created_at
  return result.sort((a, b) => {
    const aTime = a.thread.last_message_at || a.thread.created_at
    const bTime = b.thread.last_message_at || b.thread.created_at
    return new Date(bTime).getTime() - new Date(aTime).getTime()
  })
})

// Helpers
const initials = (name: string): string => {
  const trimmed = name.trim()
  if (!trimmed) return 'RM'

  const parts = trimmed.split(/\s+/).filter(Boolean)
  const first = parts[0]?.charAt(0)
  const second = parts[1]?.charAt(0)

  if (first && second) return (first + second).toUpperCase()
  if (first) return first.toUpperCase()
  return 'RM'
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''

  const now = new Date()
  const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()

  if (isToday) {
    return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  return d.toLocaleDateString([], {month: 'short', day: 'numeric'})
}

// Actions
const openChat = (otherProfileId: string) => {
  router.push(`/chat/${otherProfileId}`)
}

const goToMatches = () => {
  router.push('/matches')
}

const refresh = async () => {
  await loadData()
}
</script>