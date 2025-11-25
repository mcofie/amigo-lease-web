<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Top bar -->
      <div class="flex items-center justify-between mb-2">
        <button
            class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-white"
            type="button"
            @click="router.back()"
        >
          <span class="text-lg leading-none">←</span>
          <span>Back</span>
        </button>

        <div class="hidden sm:flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
          <span>Amigo Lease · Roommate profile</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div
              class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"/>
          <p class="text-xs font-medium text-slate-500 animate-pulse">Loading profile...</p>
        </div>
      </div>

      <!-- Error -->
      <div
          v-else-if="error"
          class="rounded-3xl bg-white border border-rose-100 py-12 px-6 text-center shadow-sm dark:bg-gray-900 dark:border-rose-900"
      >
        <p class="text-sm font-bold text-rose-600 mb-1">
          Profile unavailable
        </p>
        <p class="text-xs text-rose-500/80">
          {{ error }}
        </p>
      </div>

      <!-- Content -->
      <div
          v-else-if="profile"
          class="space-y-6"
      >
        <!-- Header Card -->
        <div
            class="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 dark:bg-gray-900 dark:border-slate-800">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

            <!-- Identity -->
            <div class="flex items-center gap-5">
              <!-- Avatar -->
              <div
                  class="h-20 w-20 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-900 shadow-inner border border-slate-200 overflow-hidden dark:bg-slate-800 dark:text-white dark:border-slate-700"
              >
                <template v-if="profile.avatar_url">
                  <img
                      :src="profile.avatar_url"
                      class="h-full w-full object-cover"
                      alt="Avatar"
                  />
                </template>
                <template v-else>
                  {{ initials }}
                </template>
              </div>

              <div class="space-y-1.5">
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {{ profile.full_name || 'Roommate' }}
                </h1>

                <div class="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span v-if="ageLabel"
                        class="inline-flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                    <span>🎂</span>
                    <span>{{ ageLabel }}</span>
                  </span>
                  <span v-if="locationLabel"
                        class="inline-flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                    <span>📍</span>
                    <span>{{ locationLabel }}</span>
                  </span>
                </div>

                <div class="flex flex-wrap gap-2 mt-3">
                  <span
                      v-if="profile.has_place"
                      class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                  >
                    <span>🏡</span>
                    <span>Has Place</span>
                  </span>
                  <span
                      v-if="profile.looking_for_place"
                      class="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
                  >
                    <span>🔍</span>
                    <span>Looking</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Logistics Badges -->
            <div class="flex flex-col gap-3 w-full md:w-auto md:min-w-[200px]">
              <div
                  v-if="profile.budget_min || profile.budget_max"
                  class="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 dark:bg-slate-800/50 dark:border-slate-700"
              >
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Monthly Budget
                </p>
                <p class="font-bold text-slate-900 dark:text-white">
                  {{ budgetLabel }}
                </p>
              </div>

              <div
                  v-if="moveWindowLabel"
                  class="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 dark:bg-slate-800/50 dark:border-slate-700"
              >
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Move-in
                </p>
                <p class="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                  {{ moveWindowLabel }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- About + Vibe Grid -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Bio -->
          <div
              class="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm dark:bg-gray-900 dark:border-slate-800">
            <h2 class="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 dark:text-white">
              <span class="text-lg">💬</span>
              <span>About {{ firstName || 'this roommate' }}</span>
            </h2>
            <p
                v-if="profile.bio"
                class="text-sm text-slate-600 leading-relaxed dark:text-slate-300"
            >
              {{ profile.bio }}
            </p>
            <div
                v-else
                class="rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500 italic text-center dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
            >
              No bio yet, but their vibe stats below tell a story!
            </div>
          </div>

          <!-- Quick Vibe -->
          <div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl dark:bg-white dark:text-slate-900">
            <h3 class="text-sm font-bold flex items-center gap-2 mb-4">
              <span class="text-lg">✨</span>
              <span>Quick Vibe</span>
            </h3>

            <div
                v-if="vibeBadges.length"
                class="flex flex-wrap gap-2"
            >
              <span
                  v-for="badge in vibeBadges"
                  :key="badge.label"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-medium backdrop-blur-sm dark:bg-slate-900/10 dark:border-slate-900/10"
              >
                <span>{{ badge.emoji }}</span>
                <span>{{ badge.label }}</span>
              </span>
            </div>

            <p
                v-else
                class="text-xs text-white/50 dark:text-slate-900/50"
            >
              Vibe tags will appear here once they take the quiz.
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div
            v-if="stats.length"
            class="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm dark:bg-gray-900 dark:border-slate-800"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2 dark:text-white">
              <span class="text-lg">📊</span>
              <span>Compatibility Stats</span>
            </h3>
            <span class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded dark:bg-slate-800">
              0 - 10 Scale
            </span>
          </div>

          <div class="grid md:grid-cols-2 gap-x-12 gap-y-6">
            <div
                v-for="stat in stats"
                :key="stat.key"
                class="space-y-2"
            >
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                  <span>{{ stat.emoji }}</span>
                  {{ stat.label }}
                </span>
                <span class="font-mono font-bold text-slate-400 dark:text-slate-500">
                  {{ stat.value }}/10
                </span>
              </div>

              <div class="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                    class="h-full rounded-full bg-slate-900 dark:bg-white"
                    :style="{ width: (stat.value * 10) + '%' }"
                />
              </div>

              <p class="text-[10px] text-slate-400 leading-snug dark:text-slate-500">
                {{ stat.caption }}
              </p>
            </div>
          </div>
        </div>

        <!-- Logistics Grid -->
        <div v-if="profile" class="grid md:grid-cols-3 gap-4">
          <!-- Home Vibe -->
          <div
              class="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 dark:bg-gray-900 dark:border-slate-800">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wide">Home Energy</p>
            <div class="flex items-start gap-2">
              <span class="text-xl">🏠</span>
              <p class="text-sm font-medium text-slate-900 dark:text-white">
                {{ homeVibeLabel || 'Not specified' }}
              </p>
            </div>
          </div>

          <!-- Habits -->
          <div
              class="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 dark:bg-gray-900 dark:border-slate-800">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wide">Habits</p>
            <div class="space-y-2">
              <div class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span class="text-base">🐾</span>
                <span>{{ petsLabel }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span class="text-base">🚬</span>
                <span>{{ smokingLabel }}</span>
              </div>
            </div>
          </div>

          <!-- Rhythm -->
          <div
              class="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 dark:bg-gray-900 dark:border-slate-800">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wide">Rhythm</p>
            <div class="space-y-2">
              <div v-if="sleepLabel" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span class="text-base">😴</span>
                <span>{{ sleepLabel }}</span>
              </div>
              <div v-if="wfhLabel" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span class="text-base">💻</span>
                <span>{{ wfhLabel }}</span>
              </div>
              <p v-if="!sleepLabel && !wfhLabel" class="text-xs text-slate-400 italic">
                No schedule info yet.
              </p>
            </div>
          </div>
        </div>

        <!-- Listings -->
        <div class="space-y-4 pt-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2 dark:text-white">
              <span class="text-lg">🏘️</span>
              <span>Listings by {{ firstName }}</span>
            </h3>
            <span class="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800">
              {{ listings.length }}
            </span>
          </div>

          <div
              v-if="listings.length === 0"
              class="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center dark:border-slate-800"
          >
            <p class="text-sm text-slate-500 font-medium">No active listings at the moment.</p>
          </div>

          <div
              v-else
              class="grid gap-4 md:grid-cols-2"
          >
            <article
                v-for="listing in listings"
                :key="listing.id"
                class="group rounded-2xl bg-white border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
                  {{ listing.title }}
                </h4>
                <span
                    class="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  ₵{{ listing.rent_amount ?? '—' }}<span class="text-[10px] font-normal text-slate-400">/mo</span>
                </span>
              </div>

              <p class="text-xs text-slate-500 mb-3 flex items-center gap-1 dark:text-slate-400">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span v-if="listing.area">{{ listing.area }}, </span>{{ listing.city }}
              </p>

              <div
                  class="flex items-center gap-2 text-[10px] font-medium text-slate-400 border-t border-slate-50 pt-3 dark:border-slate-800">
                <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-400">Available</span>
                <span>From: {{ listing.available_from || 'Now' }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Bar -->
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
          class="bg-slate-900/90 backdrop-blur-md text-white p-2 pl-5 rounded-full shadow-2xl flex items-center justify-between border border-slate-700/50 dark:bg-white/90 dark:text-slate-900 dark:border-white/20">
        <span class="text-xs font-medium opacity-90">
          Interested? Start a chat.
        </span>
        <button
            type="button"
            class="bg-white text-slate-900 px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            @click="goToChat"
        >
          Say Hi 👋
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRoute, useRouter} from '#imports'
import {usePublicProfile} from '~/composables/usePublicProfile'
import {getArchetypeMeta} from '~/types/archetypes'

const props = defineProps<{
  archetype: string | null
}>()

const meta = computed(() => getArchetypeMeta(props.archetype))

const route = useRoute()
const router = useRouter()
const {profile, traits, listings, loading, error, loadPublicProfile} = usePublicProfile()

onMounted(async () => {
  const id = route.params.id as string
  await loadPublicProfile(id)
})

const firstName = computed(() => {
  const full = profile.value?.full_name || ''
  return full.split(' ').filter(Boolean)[0] || ''
})

const initials = computed(() => {
  const fullRaw = profile.value?.full_name || 'AL'
  const full = fullRaw.trim()
  if (!full) return 'AL'

  const parts = full.split(/\s+/).filter(Boolean)

  if (parts.length === 0) return 'AL'
  if (parts.length === 1) {
    return (parts[0] ?? '').slice(0, 2).toUpperCase()
  }

  const [first = '', second = ''] = parts
  const firstInitial = first[0] ?? ''
  const secondInitial = second[0] ?? ''
  const combined = (firstInitial + secondInitial).toUpperCase()

  return combined || 'AL'
})

const locationLabel = computed(() => {
  if (!profile.value) return ''
  const area = profile.value.area
  const city = profile.value.city
  if (area && city) return `${area}, ${city}`
  return city || area || ''
})

const budgetLabel = computed(() => {
  if (!profile.value) return ''
  const min = profile.value.budget_min
  const max = profile.value.budget_max
  if (min && max) return `₵${min} – ₵${max} / month`
  if (min && !max) return `From ₵${min} / month`
  if (!min && max) return `Up to ₵${max} / month`
  return ''
})

const moveWindowLabel = computed(() => {
  if (!profile.value) return ''
  const p = profile.value as any
  const from = p.move_in_from as string | null | undefined
  const to = p.move_in_to as string | null | undefined

  if (from && to) return `Flexible: ${from} to ${to}`
  if (from && !to) return `From ${from}`
  if (!from && to) return `By ${to}`
  return ''
})

const ageLabel = computed(() => {
  const dob = (profile.value as any)?.date_of_birth as string | null | undefined
  if (!dob) return ''
  const birth = new Date(dob)
  if (Number.isNaN(birth.getTime())) return ''

  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  if (!Number.isFinite(age) || age <= 0) return ''
  return `${age} yrs`
})

const roleLabel = computed(() => {
  const role = (profile.value as any)?.role as string | undefined
  if (!role) return ''
  if (role === 'seeker') return 'Seeker'
  if (role === 'host') return 'Host'
  if (role === 'both') return 'Host & Seeker'
  return role
})

const safe = (val: unknown, fallback = 5) => {
  const n = typeof val === 'number' ? val : Number(val)
  if (Number.isFinite(n)) return Math.min(10, Math.max(0, n))
  return fallback
}

const stats = computed(() => {
  if (!traits.value) return []

  const t = traits.value as any

  const describe = (value: number, low: string, mid: string, high: string) => {
    if (value <= 3) return low
    if (value >= 8) return high
    return mid
  }

  const cleanliness = safe(t.cleanliness_level, 5)
  const noise = safe(t.noise_tolerance, 5)
  const social = safe(t.social_level, 5)
  const guests = safe(t.guest_comfort, 5)
  const wfh = safe(t.works_from_home, 5)

  return [
    {
      key: 'cleanliness',
      label: 'Cleanliness',
      emoji: '🧽',
      value: cleanliness,
      caption: describe(
          cleanliness,
          'Relaxed',
          'Balanced',
          'Very Tidy'
      )
    },
    {
      key: 'noise',
      label: 'Noise Tolerance',
      emoji: '🔈',
      value: noise,
      caption: describe(
          noise,
          'Easygoing',
          'Moderate',
          'Quiet Preferred'
      )
    },
    {
      key: 'social',
      label: 'Social Energy',
      emoji: '🧑‍🤝‍🧑',
      value: social,
      caption: describe(
          social,
          'Low-key',
          'Balanced',
          'High Energy'
      )
    },
    {
      key: 'guests',
      label: 'Guest Frequency',
      emoji: '🎉',
      value: guests,
      caption: describe(
          guests,
          'Rarely',
          'Occasionally',
          'Often'
      )
    },
    {
      key: 'wfh',
      label: 'Time at Home',
      emoji: '🏡',
      value: wfh,
      caption: describe(
          wfh,
          'Out Often',
          'Half & Half',
          'Always Home'
      )
    }
  ]
})

const vibeBadges = computed(() => {
  const badges: { emoji: string; label: string }[] = []
  const t = (traits.value as any) || {}

  const cleanliness = safe(t.cleanliness_level, 5)
  const noise = safe(t.noise_tolerance, 5)
  const social = safe(t.social_level, 5)
  const pets = t.pet_friendly === true
  const smokingOk = t.smoking_ok === true
  const sleep = t.sleep_schedule as string | undefined
  const homeVibe = t.home_vibe as string | undefined

  if (cleanliness >= 8) badges.push({emoji: '🧽', label: 'Tidy'})
  else if (cleanliness <= 3) badges.push({emoji: '😌', label: 'Relaxed'})

  if (noise >= 8) badges.push({emoji: '🔇', label: 'Quiet'})
  else if (noise <= 3) badges.push({emoji: '🔊', label: 'Loud OK'})

  if (social >= 7) badges.push({emoji: '🕺', label: 'Social'})
  else if (social <= 3) badges.push({emoji: '📚', label: 'Homebody'})

  if (pets) badges.push({emoji: '🐾', label: 'Pet-friendly'})
  if (!smokingOk) badges.push({emoji: '🚭', label: 'No Smoking'})

  if (sleep === 'early_bird') badges.push({emoji: '🌅', label: 'Early Bird'})
  else if (sleep === 'night_owl') badges.push({emoji: '🌙', label: 'Night Owl'})

  if (homeVibe === 'chill') badges.push({emoji: '😌', label: 'Chill'})
  else if (homeVibe === 'lively') badges.push({emoji: '🎉', label: 'Lively'})
  else if (homeVibe === 'cozy') badges.push({emoji: '🕯️', label: 'Cozy'})
  else if (homeVibe === 'minimal') badges.push({emoji: '📦', label: 'Minimal'})

  return badges.slice(0, 6)
})

const petsLabel = computed(() => {
  const t = (traits.value as any) || {}
  if (t.pet_friendly === true) return 'Ok with pets'
  if (t.pet_friendly === false) return 'No pets'
  return '—'
})

const smokingLabel = computed(() => {
  const t = (traits.value as any) || {}
  if (t.smoking_ok === true) return 'Smoker ok'
  if (t.smoking_ok === false) return 'Non-smoking'
  return '—'
})

const sleepLabel = computed(() => {
  const t = (traits.value as any) || {}
  const sleep = t.sleep_schedule as string | undefined
  if (sleep === 'early_bird') return 'Early bird'
  if (sleep === 'night_owl') return 'Night owl'
  if (sleep === 'flexible') return 'Flexible'
  return ''
})

const homeVibeLabel = computed(() => {
  const t = (traits.value as any) || {}
  const hv = t.home_vibe as string | undefined
  if (hv === 'chill') return 'Chill & Calm'
  if (hv === 'lively') return 'Lively'
  if (hv === 'cozy') return 'Cozy'
  if (hv === 'minimal') return 'Minimal'
  return ''
})

const wfhLabel = computed(() => {
  const t = (traits.value as any) || {}
  const wfh = safe(t.works_from_home, 0)
  if (!traits.value) return ''
  if (wfh >= 8) return 'Always home'
  if (wfh <= 3) return 'Rarely home'
  return 'Mixed schedule'
})

const goToChat = () => {
  const id = route.params.id as string
  router.push(`/chat/${id}`)
}
</script>