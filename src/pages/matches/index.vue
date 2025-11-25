<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-8">

      <!-- HEADER -->
      <header class="space-y-4">
        <div class="flex items-center justify-between">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-800">
            <span class="relative flex h-2 w-2">
              <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold text-emerald-700 tracking-wide uppercase dark:text-emerald-400">
              Live Matches
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your Match Queue
          </h1>
          <p class="text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            These people align with your lifestyle quiz results. High scores mean better compatibility on habits like
            cleanliness, noise, and schedule.
          </p>
        </div>
      </header>

      <!-- FILTERS -->
      <section
          class="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 dark:bg-gray-900 dark:border-slate-800">
        <div class="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div class="flex items-center gap-3">
            <div
                class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <span class="text-lg">🎛️</span>
            </div>
            <div>
              <h2 class="text-sm font-bold text-slate-900 dark:text-white">Refine Results</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Tune your feed preferences</p>
            </div>
          </div>

          <button
              type="button"
              class="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              @click="resetFilters"
          >
            Reset Filters
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- MIN SCORE -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span
                  class="text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Min Match Score</span>
              <span
                  class="text-sm font-mono font-bold text-slate-900 dark:text-white bg-slate-100 px-2 py-0.5 rounded dark:bg-slate-800">{{
                  filters.minScore
                }}%</span>
            </div>

            <div class="pt-2">
              <input
                  v-model.number="filters.minScore"
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:bg-slate-700 dark:accent-white"
              />
              <div class="flex justify-between text-[10px] font-medium text-slate-400 mt-2 uppercase tracking-wider">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <!-- DEALBREAKERS -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Must Haves</span>

            <div class="space-y-2">
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="relative flex items-center">
                  <input
                      v-model="filters.petFriendlyOnly"
                      type="checkbox"
                      class="peer h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-600 dark:bg-gray-800 dark:checked:bg-white dark:checked:border-white transition-all"
                  />
                </div>
                <span
                    class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors dark:text-slate-400 dark:group-hover:text-slate-200">Must be pet-friendly 🐾</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="relative flex items-center">
                  <input
                      v-model="filters.nonSmokerOnly"
                      type="checkbox"
                      class="peer h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-600 dark:bg-gray-800 dark:checked:bg-white dark:checked:border-white transition-all"
                  />
                </div>
                <span
                    class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors dark:text-slate-400 dark:group-hover:text-slate-200">Prefer non-smoker 🚭</span>
              </label>
            </div>
          </div>

          <!-- LOCATION -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Location</span>

            <label
                class="flex items-center gap-3 cursor-pointer group p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white transition-all dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
              <input
                  v-model="filters.sameCityOnly"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-500"
              />
              <div>
                <span class="block text-xs font-bold text-slate-900 dark:text-white">Only my city</span>
                <span class="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {{ currentUserCity ? `Current: ${currentUserCity}` : 'Matches profile city' }}
                </span>
              </div>
            </label>
          </div>
        </div>
      </section>

      <!-- ERROR -->
      <div
          v-if="error"
          class="rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-sm font-medium text-rose-700 flex items-center gap-3 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400"
      >
        <span class="text-lg">⚠️</span>
        <span>Unable to load matches: {{ error }}</span>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
        <div
            class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"></div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider animate-pulse">Finding your people...</p>
      </div>

      <!-- NO MATCHES -->
      <div
          v-else-if="filteredMatches.length === 0"
          class="rounded-3xl bg-white border-2 border-dashed border-slate-200 text-center py-20 px-6 dark:bg-gray-900 dark:border-slate-800"
      >
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-slate-800">
          <span class="text-2xl">🔍</span>
        </div>
        <h3 class="text-slate-900 font-bold text-lg mb-2 dark:text-white">
          No matches found
        </h3>
        <p class="text-slate-500 text-sm max-w-xs mx-auto mb-6 dark:text-slate-400">
          Try lowering the minimum score or unchecking some dealbreakers to see more people.
        </p>
        <button
            @click="resetFilters"
            class="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900"
        >
          Clear All Filters
        </button>
      </div>

      <!-- MATCH LIST -->
      <section v-else class="grid gap-6">
        <MatchCard
            v-for="m in uiMatches"
            :key="m.match_id"
            :match="m"
            @view-profile="goToProfile(m.matched_profile_id)"
            @start-chat="startChat(m.matched_profile_id)"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, onMounted, ref} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import MatchCard from '~/components/MatchCard.vue'
import {useMatches, type MatchRow} from '~/composables/useMatches'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {matches, loading, error, loadMatches} = useMatches()
const currentUserCity = ref<string | null>(null)

const filters = reactive({
  minScore: 70,
  petFriendlyOnly: false,
  nonSmokerOnly: false,
  sameCityOnly: false
})

onMounted(async () => {
  // Load user profile city
  const {data: auth, error: authError} = await $supabase.auth.getUser()

  if (!authError && auth.user) {
    const {data: profileData} = await $supabase
        .schema('amigo')
        .from('profiles')
        .select('city')
        .eq('id', auth.user.id)
        .maybeSingle<{ city: string | null }>()

    currentUserCity.value = profileData?.city ?? null
  }

  await loadMatches()
})


/* ---------------- FILTER LOGIC ---------------- */

const filteredMatches = computed(() => {
  return matches.value.filter((m: MatchRow) => {
    if (m.score < filters.minScore) return false

    const summary = m.compatibility_summary || {}

    if (filters.petFriendlyOnly && summary.pets === 'conflict') return false
    if (filters.nonSmokerOnly && summary.smoking === 'conflict') return false

    if (filters.sameCityOnly && currentUserCity.value) {
      const city = m.city
      if (!city || city !== currentUserCity.value) return false
    }

    return true
  })
})

/* ---------------- UI MAPPING ---------------- */

const uiMatches = computed(() =>
    filteredMatches.value.map((m) => ({
      ...m,
      matched_profile: {
        id: m.matched_profile_id,
        full_name: m.full_name,
        city: m.city,
        area: m.area,
        avatar_url: m.avatar_url
      }
    }))
)


/* ---------------- ACTIONS ---------------- */

const resetFilters = () => {
  filters.minScore = 50
  filters.petFriendlyOnly = false
  filters.nonSmokerOnly = false
  filters.sameCityOnly = false
}

const goToProfile = (id: string) => router.push(`/profile/${id}`)

const startChat = async (otherProfileId: string) => {
  const {data, error: rpcError} = await $supabase.rpc(
      'get_or_create_profile_thread',
      {other_profile_id: otherProfileId} as any
  )

  if (rpcError) {
    console.error('Failed to start chat', rpcError)
    return
  }

  if (data !== null) {
    router.push(`/chat/${otherProfileId}`)
  }
}
</script>