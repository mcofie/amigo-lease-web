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
  filters.minScore = 70
  filters.petFriendlyOnly = false
  filters.nonSmokerOnly = false
  filters.sameCityOnly = false
}

const goToProfile = (id: string) => router.push(`/profile/${id}`)
// const startChat = (id: string) => router.push(`/chat/${id}`)

const startChat = async (otherProfileId: string) => {
  const {data, error: rpcError} = await $supabase.rpc(
      'get_or_create_profile_thread',
      {other_profile_id: otherProfileId} as any
  )

  if (rpcError) {
    // you could show a toast here if you like
    console.error('Failed to start chat', rpcError)
    return
  }

  // data is the chat_threads row
  if (data !== null) {
    router.push(`/chat/${otherProfileId}`)
  }
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-10">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- HEADER -->
      <header class="space-y-3">
        <div
            class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
          <span>Vibe matches</span>
        </div>

        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
          Your matches
        </h1>
        <p class="text-sm text-gray-500 max-w-xl">
          These are the people whose lifestyle quiz results align closest with yours.
        </p>
      </header>

      <!-- FILTERS -->
      <section
          class="rounded-3xl bg-white/90 border border-orange-100 p-4 md:p-6 space-y-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">🎛️</span>
            <div>
              <p class="text-sm font-semibold text-gray-900">Filters</p>
              <p class="text-[11px] text-gray-400">Tune your match suggestions</p>
            </div>
          </div>

          <button
              type="button"
              class="text-[11px] text-gray-500 hover:text-gray-800 underline decoration-dotted"
              @click="resetFilters"
          >
            Reset
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-5 text-xs">
          <!-- MIN SCORE -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-800">Min match score</span>
              <span class="text-[11px] text-gray-500">{{ filters.minScore }}%</span>
            </div>

            <div>
              <input
                  v-model.number="filters.minScore"
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  class="w-full accent-gray-900"
              />
              <div class="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-400">
              Hide matches below this score.
            </p>
          </div>

          <!-- DEALBREAKERS -->
          <div class="space-y-2">
            <p class="font-medium text-gray-800">Dealbreakers</p>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                  v-model="filters.petFriendlyOnly"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-gray-300 text-gray-900"
              />
              <span class="text-[11px] text-gray-700">Must be pet-friendly 🐾</span>
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                  v-model="filters.nonSmokerOnly"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-gray-300 text-gray-900"
              />
              <span class="text-[11px] text-gray-700">Prefer non-smoker 🚭</span>
            </label>
          </div>

          <!-- LOCATION -->
          <div class="space-y-2">
            <p class="font-medium text-gray-800">Location</p>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                  v-model="filters.sameCityOnly"
                  type="checkbox"
                  class="h-3.5 w-3.5 rounded border-gray-300 text-gray-900"
              />
              <span class="text-[11px] text-gray-700">Show people in my city</span>
            </label>

            <p class="text-[11px] text-gray-400 mt-1">
              {{ currentUserCity ? `Using your city: ${currentUserCity}` : 'Using your profile location.' }}
            </p>
          </div>
        </div>
      </section>

      <!-- ERROR -->
      <div
          v-if="error"
          class="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs text-red-700"
      >
        There was a problem loading your matches: {{ error }}
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="h-10 w-10 border-2 border-dashed rounded-full animate-spin border-gray-400"/>
      </div>

      <!-- NO MATCHES -->
      <div
          v-else-if="filteredMatches.length === 0"
          class="rounded-3xl bg-white/90 border border-gray-200 text-center py-16 shadow-[0_18px_40px_rgba(0,0,0,0.03)] space-y-3"
      >
        <p class="text-gray-900 font-medium text-sm">
          No matches fit these filters…
        </p>
        <p class="text-gray-500 text-xs max-w-sm mx-auto">
          Try lowering your minimum score or relaxing a dealbreaker.
        </p>
      </div>

      <!-- MATCH LIST -->
      <section v-else class="grid gap-5">
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