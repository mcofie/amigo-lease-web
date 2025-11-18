<!-- src/pages/matches.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <!-- Header -->
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold">Your matches</h1>
          <p class="text-sm text-gray-500">
            Based on your quiz and preferences, here are people and places that might fit you.
          </p>
        </div>

        <div class="flex gap-2 justify-end">
          <button
              type="button"
              class="text-xs px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              @click="goBackToOnboarding"
          >
            Adjust preferences
          </button>
          <button
              type="button"
              class="text-xs px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
              :disabled="loading"
              @click="refreshMatches"
          >
            {{ loading ? 'Refreshing…' : 'Refresh' }}
          </button>
        </div>
      </header>

      <!-- Error -->
      <div v-if="errorMessage" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
        {{ errorMessage }}
      </div>

      <!-- Filters -->
      <section class="space-y-3" v-if="!loading">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <!-- Role filter -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">Show:</span>
            <div class="flex gap-1 bg-gray-100 rounded-full p-1">
              <button
                  v-for="option in roleOptions"
                  :key="option.value"
                  type="button"
                  class="text-xs px-3 py-1 rounded-full transition"
                  :class="activeRole === option.value
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-white'"
                  @click="activeRole = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <!-- Score filter -->
          <div class="flex flex-col gap-1 items-start sm:items-end">
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span>Min match score:</span>
              <span class="font-medium text-gray-700">{{ minScore }}%</span>
            </div>
            <input
                v-model.number="minScore"
                type="range"
                min="50"
                max="100"
                step="5"
                class="w-44 accent-orange-500"
            />
          </div>
        </div>
      </section>

      <!-- Loading state -->
      <section v-if="loading" class="space-y-3">
        <div class="py-10 text-center">
          <p class="text-sm text-gray-500">Finding your matches…</p>
          <p class="text-xs text-gray-400">We’re checking your quiz and preferences.</p>
        </div>
      </section>

      <!-- Matches list -->
      <section v-else class="space-y-3">
        <div v-if="visibleMatches.length === 0" class="py-10 text-center">
          <p class="text-sm text-gray-500">
            No matches yet for these filters.
          </p>
          <p class="text-xs text-gray-400">
            Try lowering the minimum score or adjusting your preferences.
          </p>
        </div>

        <div
            v-else
            class="grid gap-4 md:grid-cols-2"
        >
          <div
              v-for="match in visibleMatches"
              :key="match.id"
              class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer transition hover:shadow-md"
              @click="openDetails(match)"
          >
            <div class="flex items-start gap-3">
              <!-- Avatar / Score bubble -->
              <div class="flex flex-col items-center gap-2">
                <div
                    class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xs font-semibold text-orange-700"
                >
                  {{ initials(match.name) }}
                </div>
                <div class="text-center">
                  <p class="text-[10px] text-gray-500 leading-tight">Match</p>
                  <p class="text-sm font-semibold text-orange-600">
                    {{ match.score }}%
                  </p>
                </div>
              </div>

              <!-- Main content -->
              <div class="flex-1 space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <p class="text-sm font-medium">
                      {{ match.name }}
                      <span v-if="match.age" class="text-xs text-gray-500">
                        · {{ match.age }}
                      </span>
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ match.location }}
                    </p>
                  </div>

                  <span
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                      :class="roleBadgeClass(match.role)"
                  >
                    {{ roleLabel(match.role) }}
                  </span>
                </div>

                <p class="text-xs text-gray-500">
                  {{ match.budgetText }}
                </p>

                <!-- Compatibility tags -->
                <div class="flex flex-wrap gap-1">
                  <span
                      v-for="tag in match.compatibility"
                      :key="tag"
                      class="inline-flex items-center px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-[11px] text-gray-600"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex justify-between items-center pt-2">
                  <button
                      type="button"
                      class="text-xs text-gray-600 hover:text-gray-900"
                      @click.stop="openDetails(match)"
                  >
                    View details
                  </button>
                  <button
                      type="button"
                      class="text-xs px-3 py-1 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100"
                      @click.stop="startChat(match)"
                  >
                    Start chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Details modal -->
    <div
        v-if="showDetails && selectedMatch"
        class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
    >
      <div
          class="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-5 relative"
      >
        <!-- Close button -->
        <button
            type="button"
            class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            @click="showDetails = false"
        >
          ✕
        </button>

        <!-- Header -->
        <div class="flex items-start justify-between gap-2 mb-4">
          <div>
            <p class="text-base font-semibold">
              {{ selectedMatch.name }}
              <span
                  v-if="selectedMatch.age"
                  class="text-sm text-gray-500"
              >
                · {{ selectedMatch.age }}
              </span>
            </p>
            <p class="text-xs text-gray-500">
              {{ selectedMatch.location }}
            </p>
          </div>
          <div class="text-right space-y-1">
            <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                :class="roleBadgeClass(selectedMatch.role)"
            >
              {{ roleLabel(selectedMatch.role) }}
            </span>
            <div>
              <p class="text-[11px] text-gray-500 leading-tight">
                Match score
              </p>
              <p class="text-lg font-semibold text-orange-600">
                {{ selectedMatch.score }}%
              </p>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="space-y-4 text-sm">
          <div v-if="selectedMatch.bio" class="text-gray-700">
            {{ selectedMatch.bio }}
          </div>

          <div class="space-y-2">
            <p class="text-xs font-semibold tracking-wide text-gray-500">
              COMPATIBILITY HIGHLIGHTS
            </p>
            <ul class="text-xs text-gray-600 space-y-1 list-disc ml-4">
              <li
                  v-for="item in selectedMatch.compatibility"
                  :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="space-y-2">
            <p class="text-xs font-semibold tracking-wide text-gray-500">
              LIFESTYLE SNAPSHOT
            </p>
            <div class="flex flex-wrap gap-1">
              <span
                  v-for="trait in selectedMatch.traits"
                  :key="trait"
                  class="inline-flex items-center px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-[11px] text-gray-600"
              >
                {{ trait }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-between gap-2 mt-5">
          <button
              type="button"
              class="text-xs px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              @click="showDetails = false"
          >
            Close
          </button>
          <button
              type="button"
              class="text-xs px-4 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
              @click="startChat(selectedMatch)"
          >
            Start chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {useRouter, useNuxtApp} from '#imports'

type MatchRole = 'seeker' | 'host' | 'both'

interface Match {
  id: string
  name: string
  age?: number
  role: MatchRole
  location: string
  budgetText: string
  score: number
  compatibility: string[]
  traits: string[]
  bio?: string
}

// router + supabase
const router = useRouter()
const {$supabase} = useNuxtApp()

// state
const matches = ref<Match[]>([])
const loading = ref(true)
const errorMessage = ref<string | null>(null)

const roleOptions = [
  {label: 'All', value: 'all' as const},
  {label: 'Roommates', value: 'seeker' as const},
  {label: 'Rooms', value: 'host' as const},
  {label: 'Flexible', value: 'both' as const}
]

const activeRole = ref<'all' | MatchRole>('all')
const minScore = ref(70)

const showDetails = ref(false)
const selectedMatch = ref<Match | null>(null)

// load matches from Supabase
const loadMatches = async () => {
  loading.value = true
  errorMessage.value = null

  // ensure auth
  const {
    data: {user},
    error: authError
  } = await $supabase.auth.getUser()

  if (authError || !user) {
    loading.value = false
    router.push('/auth')
    return
  }

  // NOTE: you need a view/table like amigo.matches or amigo.matches_view
  // with columns matching the mapping below.
  const {data, error} = await $supabase
      .schema('amigo')
      .from('matches') // or 'amigo.matches_view' etc.
      .select('*')
      .eq('profile_id', user.id)

  if (error) {
    errorMessage.value = error.message
    loading.value = false
    return
  }

  // Map raw rows to Match type
  matches.value = (data || []).map((row: any) => ({
    id: row.id,
    name: row.other_name ?? 'Roommate',
    age: row.other_age ?? undefined,
    role: (row.other_role as MatchRole) ?? 'both',
    location: row.location_text ?? `${row.city ?? ''}${row.area ? ' · ' + row.area : ''}`,
    budgetText: row.budget_text ?? 'Budget not specified',
    score: row.score ?? 0,
    compatibility: row.compatibility_highlights ?? [],
    traits: row.traits ?? [],
    bio: row.other_bio ?? undefined
  }))
  loading.value = false
}

onMounted(async () => {
  await loadMatches()
})

// computed filtered matches
const visibleMatches = computed(() => {
  return matches.value.filter((m) => {
    const passesScore = m.score >= minScore.value
    const passesRole =
        activeRole.value === 'all' ? true : m.role === activeRole.value
    return passesScore && passesRole
  })
})

// helpers
const roleLabel = (role: MatchRole): string => {
  if (role === 'seeker') return 'Looking for a room'
  if (role === 'host') return 'Has a room'
  return 'Flexible'
}

const roleBadgeClass = (role: MatchRole): string => {
  if (role === 'seeker') {
    return 'bg-indigo-50 text-indigo-700 border border-indigo-100'
  }
  if (role === 'host') {
    return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
  }
  return 'bg-orange-50 text-orange-700 border border-orange-100'
}

const initials = (name: string): string => {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
}

// actions
const openDetails = (match: Match) => {
  selectedMatch.value = match
  showDetails.value = true
}

const startChat = (match: Match | null) => {
  if (!match) return
  // Later: route to /chat/:threadId or open chat drawer.
  // Example:
  // router.push(`/chat/${match.thread_id}`)
  console.log('Start chat with', match.name)
}

const goBackToOnboarding = () => {
  router.push('/onboarding/quiz')
}

const refreshMatches = async () => {
  await loadMatches()
}
</script>