<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Top bar -->
      <div class="flex items-center justify-between mb-2">
        <button
            class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900"
            type="button"
            @click="router.back()"
        >
          <span class="text-lg leading-none">←</span>
          <span>Back</span>
        </button>

        <div class="hidden sm:flex items-center gap-2 text-[11px] text-gray-400">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Amigo Lease · Roommate profile</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="flex flex-col items-center gap-3">
          <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 animate-spin" />
          <p class="text-xs text-gray-500">Loading profile…</p>
        </div>
      </div>

      <!-- Error -->
      <div
          v-else-if="error"
          class="rounded-3xl bg-white border border-red-100 py-12 px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
      >
        <p class="text-sm font-medium text-red-600 mb-1">
          We couldn’t load this profile.
        </p>
        <p class="text-xs text-red-500">
          {{ error }}
        </p>
      </div>

      <!-- Content -->
      <div
          v-else-if="profile"
          class="rounded-3xl bg-white/95 border border-orange-100 shadow-[0_18px_40px_rgba(15,23,42,0.12)] p-5 sm:p-7 space-y-8"
      >
        <!-- Header / overview -->
        <section class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="flex items-center gap-4">
            <!-- Avatar / initials -->
            <div
                class="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-sm font-semibold text-white shadow-md"
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

            <div class="space-y-1">
              <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">
                {{ profile.full_name || 'Roommate' }}
              </h1>

              <p class="text-sm text-gray-500 flex flex-wrap items-center gap-1.5">
                <span v-if="ageLabel" class="inline-flex items-center gap-1">
                  <span>🎂</span>
                  <span>{{ ageLabel }}</span>
                </span>
                <span v-if="locationLabel" class="inline-flex items-center gap-1">
                  <span>📍</span>
                  <span>{{ locationLabel }}</span>
                </span>
              </p>

              <div class="flex flex-wrap gap-2 mt-2 text-[11px]">
                <span
                    v-if="profile.has_place"
                    class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 inline-flex items-center gap-1"
                >
                  <span>🏡</span>
                  <span>Has a place</span>
                </span>
                <span
                    v-if="profile.looking_for_place"
                    class="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 inline-flex items-center gap-1"
                >
                  <span>🔍</span>
                  <span>Looking for a place</span>
                </span>
                <span
                    v-if="roleLabel"
                    class="px-2.5 py-1 rounded-full bg-gray-900 text-white inline-flex items-center gap-1"
                >
                  <span>🧑‍🤝‍🧑</span>
                  <span>{{ roleLabel }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Budget + move-in -->
          <div class="flex flex-col gap-3 text-sm w-full md:w-auto md:max-w-xs">
            <div
                v-if="profile.budget_min || profile.budget_max"
                class="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm"
            >
              <p class="text-[11px] text-gray-500 mb-1">
                Preferred budget
              </p>
              <p class="font-medium text-gray-900">
                {{ budgetLabel }}
              </p>
              <p class="text-[11px] text-gray-400 mt-1">
                Monthly rent they’re comfortable with.
              </p>
            </div>

            <div
                v-if="moveWindowLabel"
                class="rounded-2xl bg-orange-50/60 border border-orange-100 px-4 py-3 text-sm text-gray-800"
            >
              <p class="text-[11px] text-orange-600 font-medium mb-1">
                Move-in timing
              </p>
              <p class="text-xs text-gray-700">
                {{ moveWindowLabel }}
              </p>
            </div>
          </div>
        </section>

        <!-- About + vibe -->
        <section class="grid md:grid-cols-3 gap-6">
          <!-- Bio -->
          <div class="md:col-span-2 rounded-2xl bg-gray-50/80 border border-gray-200 p-5 space-y-3">
            <h2 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>About {{ firstName || 'this roommate' }}</span>
              <span class="text-base">💬</span>
            </h2>
            <p
                v-if="profile.bio"
                class="text-sm text-gray-800 leading-relaxed"
            >
              {{ profile.bio }}
            </p>
            <p
                v-else
                class="text-sm text-gray-400 italic"
            >
              They haven’t written a bio yet, but their quiz answers still tell you a lot about how it feels to live
              with them.
            </p>
          </div>

          <!-- Quick vibe -->
          <div class="rounded-2xl bg-white border border-gray-200 p-5 space-y-3">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>Quick vibe</span>
              <span>✨</span>
            </h3>

            <div
                v-if="vibeBadges.length"
                class="flex flex-wrap gap-2 text-[11px]"
            >
              <span
                  v-for="badge in vibeBadges"
                  :key="badge.label"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-900 text-white"
              >
                <span>{{ badge.emoji }}</span>
                <span>{{ badge.label }}</span>
              </span>
            </div>

            <p
                v-else
                class="text-[11px] text-gray-400"
            >
              Once they complete the lifestyle quiz, you’ll see quick tags here like “Very tidy”, “Chill vibe”, or
              “Pet-friendly”.
            </p>
          </div>
        </section>

        <!-- Roommate stats -->
        <section
            v-if="stats.length"
            class="rounded-2xl bg-white border border-gray-200 p-5 space-y-4"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>Roommate stats</span>
              <span>📊</span>
            </h3>
            <span class="text-[11px] text-gray-400">
              0 = low, 10 = high
            </span>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div
                v-for="stat in stats"
                :key="stat.key"
                class="space-y-1.5"
            >
              <div class="flex items-center justify-between text-[11px] text-gray-500">
                <span class="flex items-center gap-1.5">
                  <span>{{ stat.emoji }}</span>
                  <span class="font-medium text-gray-700">{{ stat.label }}</span>
                </span>
                <span class="tabular-nums text-gray-700">
                  {{ stat.value }}/10
                </span>
              </div>

              <div class="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                    class="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
                    :style="{ width: (stat.value * 10) + '%' }"
                />
              </div>

              <p class="text-[11px] text-gray-400 italic">
                {{ stat.caption }}
              </p>
            </div>
          </div>
        </section>

        <!-- Logistics / preferences -->
        <section
            v-if="profile"
            class="grid md:grid-cols-3 gap-6"
        >
          <div class="rounded-2xl bg-white border border-gray-200 p-4 space-y-2 text-xs text-gray-700">
            <p class="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <span>Home vibe</span>
              <span>🏠</span>
            </p>
            <p v-if="homeVibeLabel">
              {{ homeVibeLabel }}
            </p>
            <p v-else class="text-gray-400">
              No specific home vibe set yet.
            </p>
          </div>

          <div class="rounded-2xl bg-white border border-gray-200 p-4 space-y-2 text-xs text-gray-700">
            <p class="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <span>Pets & smoking</span>
              <span>🐾</span>
            </p>
            <ul class="space-y-1">
              <li>
                <strong>Pets:</strong>
                <span class="text-gray-600">
                  {{ petsLabel }}
                </span>
              </li>
              <li>
                <strong>Smoking:</strong>
                <span class="text-gray-600">
                  {{ smokingLabel }}
                </span>
              </li>
            </ul>
          </div>

          <div class="rounded-2xl bg-white border border-gray-200 p-4 space-y-2 text-xs text-gray-700">
            <p class="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <span>Rhythm</span>
              <span>⏰</span>
            </p>
            <ul class="space-y-1">
              <li v-if="sleepLabel">
                <strong>Sleep:</strong>
                <span class="text-gray-600">{{ sleepLabel }}</span>
              </li>
              <li v-if="wfhLabel">
                <strong>Time at home:</strong>
                <span class="text-gray-600">{{ wfhLabel }}</span>
              </li>
              <li v-if="!sleepLabel && !wfhLabel" class="text-gray-400">
                No schedule preferences shared yet.
              </li>
            </ul>
          </div>
        </section>

        <!-- Listings -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>Places they’re offering</span>
              <span>🏠</span>
            </h3>
            <span class="text-[11px] text-gray-400">
              {{ listings.length }} active
            </span>
          </div>

          <div
              v-if="listings.length === 0"
              class="rounded-2xl bg-gray-50 border border-dashed border-gray-200 p-6 text-center text-xs text-gray-500"
          >
            This person doesn’t have any active listings yet.
          </div>

          <div
              v-else
              class="grid gap-4 md:grid-cols-2"
          >
            <article
                v-for="listing in listings"
                :key="listing.id"
                class="rounded-2xl bg-white border border-gray-200 p-4 space-y-2 text-sm hover:shadow-md transition-shadow"
            >
              <p class="font-medium text-gray-900">
                {{ listing.title }}
              </p>
              <p class="text-xs text-gray-500">
                <span v-if="listing.area">{{ listing.area }}, </span>{{ listing.city }}
              </p>
              <p class="text-sm font-semibold text-gray-900">
                ₵{{ listing.rent_amount ?? '—' }}
                <span class="text-xs text-gray-500">/ month</span>
              </p>
              <p class="text-[11px] text-gray-400">
                Available from: {{ listing.available_from || 'TBD' }}
              </p>
            </article>
          </div>
        </section>

        <!-- Sticky CTA -->
        <section class="pt-2 flex justify-between items-center gap-3 border-t border-gray-100 mt-2">
          <p class="text-[11px] text-gray-500">
            If the vibe feels right, start a friendly chat. No pressure – you’re just getting to know each other.
          </p>
          <button
              type="button"
              class="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black flex items-center gap-2"
              @click="goToChat"
          >
            <span>Say hi</span>
            <span>👋</span>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'
import { usePublicProfile } from '~/composables/usePublicProfile'
import { getArchetypeMeta } from '~/types/archetypes'

const props = defineProps<{
  archetype: string | null
}>()

const meta = computed(() => getArchetypeMeta(props.archetype))

const route = useRoute()
const router = useRouter()
const { profile, traits, listings, loading, error, loadPublicProfile } = usePublicProfile()

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

  if (from && to) return `Looking to move between ${from} and ${to}.`
  if (from && !to) return `Earliest move-in from ${from}.`
  if (!from && to) return `Hoping to move by ${to}.`
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
  return `${age} years old`
})

const roleLabel = computed(() => {
  const role = (profile.value as any)?.role as string | undefined
  if (!role) return ''
  if (role === 'seeker') return 'Looking for a place'
  if (role === 'host') return 'Has a place / Host'
  if (role === 'both') return 'Open to both'
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
          'Relaxed about mess in shared spaces.',
          'Likes things reasonably neat.',
          'Really values a clean, organised home.'
      )
    },
    {
      key: 'noise',
      label: 'Quiet vs. noise',
      emoji: '🔈',
      value: noise,
      caption: describe(
          noise,
          'Okay with some background noise.',
          'Prefers a balanced noise level.',
          'Really values a quiet, calm home.'
      )
    },
    {
      key: 'social',
      label: 'Social energy',
      emoji: '🧑‍🤝‍🧑',
      value: social,
      caption: describe(
          social,
          'More on the low-key, introverted side at home.',
          'Balanced – social sometimes, solo sometimes.',
          'Enjoys a lively, social home environment.'
      )
    },
    {
      key: 'guests',
      label: 'Guests & hosting',
      emoji: '🎉',
      value: guests,
      caption: describe(
          guests,
          'Prefers guests to be rare and low-key.',
          'Okay with friends over now and then.',
          'Comfortable with frequent hangouts at home.'
      )
    },
    {
      key: 'wfh',
      label: 'Time spent at home',
      emoji: '🏡',
      value: wfh,
      caption: describe(
          wfh,
          'Out of the house a lot.',
          'At home a fair bit depending on the day.',
          'Home most of the time (WFH/study).'
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

  if (cleanliness >= 8) badges.push({ emoji: '🧽', label: 'Very tidy' })
  else if (cleanliness <= 3) badges.push({ emoji: '😌', label: 'Laid-back about mess' })

  if (noise >= 8) badges.push({ emoji: '🔇', label: 'Loves quiet evenings' })
  else if (noise <= 3) badges.push({ emoji: '🔊', label: 'Okay with noise' })

  if (social >= 7) badges.push({ emoji: '🕺', label: 'Social roommate' })
  else if (social <= 3) badges.push({ emoji: '📚', label: 'Low-key homebody' })

  if (pets) badges.push({ emoji: '🐾', label: 'Pet-friendly' })
  if (!smokingOk) badges.push({ emoji: '🚭', label: 'Non-smoker preferred' })

  if (sleep === 'early_bird') badges.push({ emoji: '🌅', label: 'Early bird' })
  else if (sleep === 'night_owl') badges.push({ emoji: '🌙', label: 'Night owl' })

  if (homeVibe === 'chill') badges.push({ emoji: '😌', label: 'Chill vibe' })
  else if (homeVibe === 'lively') badges.push({ emoji: '🎉', label: 'Lively home' })
  else if (homeVibe === 'cozy') badges.push({ emoji: '🕯️', label: 'Cozy home' })
  else if (homeVibe === 'minimal') badges.push({ emoji: '📦', label: 'Minimalist' })

  return badges.slice(0, 6)
})

const petsLabel = computed(() => {
  const t = (traits.value as any) || {}
  if (t.pet_friendly === true) return 'Comfortable living with pets.'
  if (t.pet_friendly === false) return 'Prefers not to live with pets.'
  return 'No pet preference shared yet.'
})

const smokingLabel = computed(() => {
  const t = (traits.value as any) || {}
  if (t.smoking_ok === true) return 'Okay with smokers.'
  if (t.smoking_ok === false) return 'Prefers a non-smoking home.'
  return 'No smoking preference shared yet.'
})

const sleepLabel = computed(() => {
  const t = (traits.value as any) || {}
  const sleep = t.sleep_schedule as string | undefined
  if (sleep === 'early_bird') return 'Early bird – up early, sleeps early.'
  if (sleep === 'night_owl') return 'Night owl – active later in the day.'
  if (sleep === 'flexible') return 'Flexible sleep schedule.'
  return ''
})

const homeVibeLabel = computed(() => {
  const t = (traits.value as any) || {}
  const hv = t.home_vibe as string | undefined
  if (hv === 'chill') return 'Prefers a relaxed, low-pressure home vibe.'
  if (hv === 'lively') return 'Enjoys a lively, social home atmosphere.'
  if (hv === 'cozy') return 'Likes a warm, cozy, homey space.'
  if (hv === 'minimal') return 'Prefers a minimal, clutter-free home.'
  return ''
})

const wfhLabel = computed(() => {
  const t = (traits.value as any) || {}
  const wfh = safe(t.works_from_home, 0)
  if (!traits.value) return ''
  if (wfh >= 8) return 'Home most of the time (WFH/study).'
  if (wfh <= 3) return 'Out of the house a lot.'
  return 'At home a fair bit depending on the day.'
})

const goToChat = () => {
  const id = route.params.id as string
  router.push(`/chat/${id}`)
}
</script>