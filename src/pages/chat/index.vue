<!-- src/pages/chat/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- HEADER -->
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1.5">
          <div
              class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Inbox</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Messages
          </h1>
          <p class="text-sm text-gray-500">
            All your conversations with potential roommates and hosts in one place.
          </p>
        </div>

        <div class="flex flex-col items-end gap-2">
          <p
              v-if="threadsWithMeta.length > 0 && !loading"
              class="text-[11px] text-gray-500"
          >
            {{ threadsWithMeta.length }} conversation{{ threadsWithMeta.length === 1 ? '' : 's' }}
          </p>

          <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black shadow-sm self-start sm:self-auto disabled:opacity-60"
              :disabled="loading"
              @click="refresh"
          >
            <span
                class="mr-2 h-1.5 w-1.5 rounded-full"
                :class="loading ? 'bg-emerald-400 animate-pulse' : 'bg-gray-300'"
            />
            <span>{{ loading ? 'Refreshing…' : 'Refresh inbox' }}</span>
          </button>
        </div>
      </header>

      <!-- ERROR -->
      <div
          v-if="errorMessage"
          class="rounded-3xl bg-white/95 border border-red-100 px-6 py-4 text-xs text-red-600 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
      >
        {{ errorMessage }}
      </div>

      <!-- LOADING -->
      <section
          v-else-if="loading"
          class="py-16 flex flex-col items-center justify-center gap-3"
      >
        <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-400 animate-spin" />
        <p class="text-sm text-gray-500">
          Loading your conversations…
        </p>
      </section>

      <!-- EMPTY STATE -->
      <section v-else-if="threadsWithMeta.length === 0" class="py-14">
        <div
            class="rounded-3xl bg-white/95 border border-dashed border-gray-200 px-6 py-14 text-center space-y-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)] text-sm"
        >
          <div class="text-3xl">💬</div>
          <p class="text-gray-900 font-medium">
            You don’t have any conversations yet.
          </p>
          <p class="text-gray-500 text-xs max-w-sm mx-auto">
            Check your matches, find someone whose vibe fits yours, and say hi to start a chat.
          </p>
          <button
              type="button"
              class="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm hover:bg-black shadow-sm"
              @click="goToMatches"
          >
            Browse matches
          </button>
        </div>
      </section>

      <!-- THREAD LIST -->
      <section v-else class="space-y-3">
        <p class="text-[11px] text-gray-500 px-1">
          Latest conversations first.
        </p>

        <article
            v-for="item in threadsWithMeta"
            :key="item.thread.id"
            class="rounded-3xl bg-white/95 border border-gray-200 px-4 py-4 md:px-5 md:py-5 shadow-sm hover:shadow-md hover:border-gray-300 transition cursor-pointer"
            @click="openChat(item.otherProfileId)"
        >
          <div class="flex items-center gap-3 md:gap-4">
            <!-- AVATAR / INITIALS -->
            <div class="flex-shrink-0">
              <img
                  v-if="item.avatar_url"
                  :src="item.avatar_url"
                  alt=""
                  class="w-11 h-11 rounded-full object-cover bg-gray-100 border border-gray-200"
              />
              <div
                  v-else
                  class="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-[11px] font-semibold text-white shadow-sm"
              >
                {{ initials(item.otherName) }}
              </div>
            </div>

            <!-- MAIN CONTENT -->
            <div class="flex-1 min-w-0 space-y-1">
              <!-- Name + match -->
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-semibold text-gray-900 truncate">
                  {{ item.otherName }}
                </p>

                <div
                    v-if="item.score != null"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-[11px] text-orange-700 border border-orange-100"
                >
                  <span class="text-[12px]">⚡</span>
                  <span>Match {{ item.score }}%</span>
                </div>
              </div>

              <!-- Last message -->
              <p class="text-[12px] text-gray-600 line-clamp-1 flex items-center gap-1.5">
                <span class="text-gray-300 text-xs">“</span>
                <span>
                  {{ item.thread.last_message_preview || 'Tap to start chatting' }}
                </span>
              </p>

              <!-- Meta row -->
              <div class="flex items-center justify-between gap-3 pt-1">
                <div class="flex items-center gap-2 text-[11px] text-gray-400">
                  <span v-if="item.location" class="flex items-center gap-1">
                    <span>📍</span>
                    <span class="truncate max-w-[150px] sm:max-w-[200px]">
                      {{ item.location }}
                    </span>
                  </span>
                </div>

                <p class="text-[11px] text-gray-400">
                  {{ formatTime(item.thread.last_message_at || item.thread.created_at) }}
                </p>
              </div>
            </div>

            <!-- CHEVRON -->
            <div class="hidden sm:flex items-center justify-center flex-shrink-0 text-gray-300">
              <span class="text-lg leading-none">›</span>
            </div>
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
  avatar_url: string | null
}

const router = useRouter()
const { $supabase } = useNuxtApp()

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
  const { data: profilesData, error: profilesErr } = await $supabase
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
  const { data: matchesData, error: matchesErr } = await $supabase
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
        t.profile_one_id === currentUserId.value ? t.profile_two_id : t.profile_one_id

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
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

// Actions
const openChat = (otherProfileId: string) => {
  // profile-based chat route; inside that page you call ensureThreadWithProfile(otherProfileId)
  router.push(`/chat/${otherProfileId}`)
}

const goToMatches = () => {
  router.push('/matches')
}

const refresh = async () => {
  await loadData()
}
</script>