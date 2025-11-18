<template>
  <div class="min-h-screen bg-gray-50 px-4 py-10">
    <div class="max-w-4xl mx-auto space-y-6">

      <!-- Header -->
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-900">
          Your matches
        </h1>
        <p class="text-sm text-gray-500">
          These are people whose lifestyle quiz is closest to yours. You can fine-tune what you see below.
        </p>
      </header>

      <!-- Filters -->
      <section class="rounded-2xl bg-white border border-gray-200 p-4 md:p-5 space-y-4 text-xs">
        <div class="flex items-center justify-between gap-2">
          <p class="font-semibold text-gray-800 flex items-center gap-2">
            <span>🎛️ Filters</span>
          </p>
          <button
              class="text-[11px] text-gray-500 hover:text-gray-800"
              @click="resetFilters"
          >
            Reset
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <!-- Min score -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-700">Min match score</span>
              <span class="text-[11px] text-gray-500">{{ filters.minScore }}%</span>
            </div>
            <input
                v-model.number="filters.minScore"
                type="range"
                min="50"
                max="100"
                step="5"
                class="w-full"
            />
            <p class="text-[11px] text-gray-400">
              Hide matches below this score.
            </p>
          </div>

          <!-- Pets / smoking -->
          <div class="space-y-2">
            <p class="font-medium text-gray-700">Dealbreakers</p>
            <label class="flex items-center gap-2">
              <input
                  v-model="filters.petFriendlyOnly"
                  type="checkbox"
                  class="h-3.5 w-3.5"
              />
              <span>Must be pet-friendly 🐾</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                  v-model="filters.nonSmokerOnly"
                  type="checkbox"
                  class="h-3.5 w-3.5"
              />
              <span>Prefer non-smoker 🚭</span>
            </label>
          </div>

          <!-- City filter -->
          <div class="space-y-2">
            <p class="font-medium text-gray-700">Location</p>
            <label class="flex items-center gap-2">
              <input
                  v-model="filters.sameCityOnly"
                  type="checkbox"
                  class="h-3.5 w-3.5"
              />
              <span>Show people in my city</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="h-10 w-10 border-2 border-dashed rounded-full animate-spin border-gray-400"/>
      </div>

      <!-- No matches -->
      <div
          v-else-if="filteredMatches.length === 0"
          class="rounded-2xl bg-white border text-center py-16 shadow-sm space-y-2"
      >
        <p class="text-gray-800 font-medium text-sm">
          No matches fit these filters… yet.
        </p>
        <p class="text-gray-500 text-xs">
          Try lowering your minimum score or relaxing a dealbreaker.
        </p>
      </div>

      <!-- Matches -->
      <section v-else class="grid gap-6">
        <MatchCard
            v-for="m in filteredMatches"
            :key="m.id"
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
import {useMatches} from '~/composables/useMatches'

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
  // load user city for sameCityOnly
  const {data: auth, error: authError} = await $supabase.auth.getUser()
  if (!authError && auth.user) {
    const {data: profileData} = await $supabase
        .from('amigo.profiles')
        .select('city')
        .eq('id', auth.user.id)
        .maybeSingle()

    currentUserCity.value = (profileData as any)?.city ?? null
  }

  await loadMatches()
})

const filteredMatches = computed(() => {
  return matches.value.filter((m: any) => {
    if (m.score < filters.minScore) return false

    const summary = m.compatibility_summary || {}

    if (filters.petFriendlyOnly && summary.pets === 'conflict') return false
    if (filters.nonSmokerOnly && summary.smoking === 'conflict') return false

    if (filters.sameCityOnly && currentUserCity.value) {
      const city = m.matched_profile?.city
      if (!city || city !== currentUserCity.value) return false
    }

    return true
  })
})

const resetFilters = () => {
  filters.minScore = 70
  filters.petFriendlyOnly = false
  filters.nonSmokerOnly = false
  filters.sameCityOnly = false
}

const goToProfile = (id: string) => {
  router.push(`/profile/${id}`)
}

const startChat = (id: string) => {
  router.push(`/chat/${id}`)
}
</script>