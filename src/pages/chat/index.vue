<!-- src/pages/chat/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white">
    <div class="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Inbox</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Messages
          </h1>
          <p class="text-sm text-gray-500">
            All your conversations in one place.
          </p>
        </div>

        <button
            type="button"
            class="self-start inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl border border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100 shadow-sm"
            :disabled="loading"
            @click="refresh"
        >
          <span class="h-1.5 w-1.5 rounded-full" :class="loading ? 'bg-emerald-400 animate-pulse' : 'bg-gray-300'" />
          <span>{{ loading ? 'Refreshing…' : 'Refresh' }}</span>
        </button>
      </header>

      <!-- Error -->
      <div
          v-if="errorMessage"
          class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
      >
        {{ errorMessage }}
      </div>

      <!-- Loading -->
      <section v-if="loading" class="py-16 flex flex-col items-center justify-center gap-3">
        <div class="h-10 w-10 border-2 border-dashed rounded-full animate-spin border-gray-400" />
        <p class="text-sm text-gray-500">Loading your conversations…</p>
      </section>

      <!-- Empty state -->
      <section
          v-else-if="threadsWithMeta.length === 0"
          class="py-16"
      >
        <div class="max-w-md mx-auto text-center rounded-3xl bg-white/90 border border-gray-200 shadow-[0_18px_40px_rgba(0,0,0,0.04)] px-6 py-10 space-y-3">
          <div class="text-3xl">💬</div>
          <p class="text-sm font-medium text-gray-900">
            You don’t have any conversations yet.
          </p>
          <p class="text-xs text-gray-500">
            Start by checking your matches and saying hi to someone who fits your vibe.
          </p>
          <button
              type="button"
              class="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm hover:bg-black shadow-sm"
              @click="goToMatches"
          >
            Go to matches
          </button>
        </div>
      </section>

      <!-- Thread list -->
      <section v-else class="space-y-3">
        <article
            v-for="item in threadsWithMeta"
            :key="item.thread.id"
            class="bg-white/95 border border-gray-200 rounded-2xl px-4 py-3.5 shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition"
            @click="openChat(item.thread.id)"
        >
          <div class="flex items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[11px] font-semibold text-orange-700"
            >
              {{ initials(item.otherName) }}
            </div>
            <div class="space-y-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ item.otherName }}
              </p>
              <p class="text-[11px] text-gray-500 line-clamp-1">
                {{ item.thread.last_message_preview || 'Tap to start chatting' }}
              </p>
              <p v-if="item.location" class="text-[10px] text-gray-400">
                {{ item.location }}
              </p>
            </div>
          </div>

          <div class="text-right text-[11px] text-gray-400 space-y-1">
            <p>{{ formatTime(item.thread.last_message_at || item.thread.created_at) }}</p>
            <p v-if="item.score != null">
              Match:
              <span class="text-orange-600 font-medium">
                {{ item.score }}%
              </span>
            </p>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useNuxtApp } from '#imports'

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
}

const router = useRouter()
const { $supabase } = useNuxtApp()

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const currentUserId = ref<string | null>(null)

const threads = ref<ChatThread[]>([])
const profilesById = ref<Record<string, { full_name?: string | null; city?: string | null; area?: string | null }>>({})
const matchesByOtherId = ref<Record<string, { score: number | null }>>({})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true
  errorMessage.value = null

  const {
    data: { user },
    error: authError
  } = await $supabase.auth.getUser()

  if (authError || !user) {
    router.push('/auth')
    return
  }
  currentUserId.value = user.id

  // 1) Load threads where I'm either side
  const { data: threadsData, error: threadsErr } = await $supabase
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

  // 2) Figure out "other" profile IDs
  const otherIds = new Set<string>()
  for (const t of threads.value) {
    const otherId = t.profile_one_id === user.id ? t.profile_two_id : t.profile_one_id
    otherIds.add(otherId)
  }

  const idsArray = Array.from(otherIds)
  if (idsArray.length === 0) {
    loading.value = false
    return
  }

  // 3) Load those profiles
  const { data: profilesData, error: profilesErr } = await $supabase
      .schema('amigo')
      .from('profiles')
      .select('id, full_name, city, area')
      .in('id', idsArray)

  if (profilesErr) {
    errorMessage.value = profilesErr.message
    loading.value = false
    return
  }

  const mapProfiles: Record<string, any> = {}
  for (const p of profilesData || []) {
    mapProfiles[p.id] = p
  }
  profilesById.value = mapProfiles

  // 4) Load match scores for these people (if exist)
  const { data: matchesData, error: matchesErr } = await $supabase
      .schema('amigo')
      .from('matches')
      .select('other_profile_id, score')
      .eq('profile_id', user.id)
      .in('other_profile_id', idsArray)

  if (matchesErr) {
    // don't fail the whole page; just no scores
    console.warn(matchesErr)
  } else {
    const mapMatches: Record<string, { score: number | null }> = {}
    for (const m of matchesData || []) {
      mapMatches[m.other_profile_id] = { score: m.score }
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
        t.profile_one_id === currentUserId.value
            ? t.profile_two_id
            : t.profile_one_id

    const profile = profilesById.value[otherId] || {}
    const matchInfo = matchesByOtherId.value[otherId] || { score: null }

    const location =
        profile.city && profile.area
            ? `${profile.area} · ${profile.city}`
            : profile.city || profile.area || null

    result.push({
      thread: t,
      otherProfileId: otherId,
      otherName: profile.full_name || 'Roommate',
      location,
      score: matchInfo.score ?? null
    })
  }

  // sort by last_message_at (desc), fallback created_at
  return result.sort((a, b) => {
    const aTime = a.thread.last_message_at || a.thread.created_at
    const bTime = b.thread.last_message_at || b.thread.created_at
    return new Date(bTime).getTime() - new Date(aTime).getTime()
  })
})

// helpers
const initials = (name: string): string => {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// actions
const openChat = (threadId: string) => {
  router.push(`/chat/${threadId}`)
}

const goToMatches = () => {
  router.push('/matches')
}

const refresh = async () => {
  await loadData()
}
</script>