<template>
  <div class="min-h-screen bg-gray-50 px-4 py-10">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Back -->
      <button
          class="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-800"
          @click="router.back()"
      >
        ← Back
      </button>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-400 animate-spin"/>
      </div>

      <!-- Error -->
      <div
          v-else-if="error"
          class="rounded-2xl bg-white border border-red-100 text-center py-12 px-4"
      >
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else-if="profile" class="space-y-8">
        <!-- Top: avatar + basic info -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="flex items-center gap-4">
            <img
                :src="profile.avatar_url || '/default-avatar.png'"
                class="h-16 w-16 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">
                {{ profile.full_name || 'Roommate' }}
              </h1>
              <p class="text-sm text-gray-500">
                <span v-if="profile.area">{{ profile.area }}, </span>{{ profile.city }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2 text-xs">
                <span
                    v-if="profile.has_place"
                    class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
                >
                  🏡 Has a place
                </span>
                <span
                    v-if="profile.looking_for_place"
                    class="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100"
                >
                  🔍 Looking for a place
                </span>
              </div>
            </div>
          </div>

          <!-- Budget -->
          <div
              v-if="profile.budget_min || profile.budget_max"
              class="rounded-2xl bg-white border border-gray-200 px-4 py-3 text-sm text-gray-700 shadow-sm"
          >
            <p class="text-xs text-gray-500 mb-1">Preferred budget</p>
            <p class="font-medium">
              ₵{{ profile.budget_min || '—' }} – ₵{{ profile.budget_max || '—' }} / month
            </p>
          </div>
        </div>

        <!-- Bio + vibe -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Bio -->
          <div class="md:col-span-2 rounded-2xl bg-white border border-gray-200 p-5 space-y-3">
            <h2 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>About {{ profile.full_name?.split(' ')[0] || 'this roommate' }}</span>
              <span class="text-base">💬</span>
            </h2>
            <p class="text-sm text-gray-700 leading-relaxed" v-if="profile.bio">
              {{ profile.bio }}
            </p>
            <p class="text-sm text-gray-400 italic" v-else>
              They haven’t written a bio yet, but their quiz answers still tell us a lot.
            </p>
          </div>

          <!-- Quick vibe -->
          <div class="rounded-2xl bg-white border border-gray-200 p-5 space-y-3">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>Quick vibe</span>
              <span>✨</span>
            </h3>
            <div class="flex flex-wrap gap-2 text-xs">
              <span
                  v-for="badge in vibeBadges"
                  :key="badge.label"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-900 text-white"
              >
                <span>{{ badge.emoji }}</span>
                <span>{{ badge.label }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Traits -->
        <div v-if="traits" class="rounded-2xl bg-white border border-gray-200 p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>Roommate stats</span>
              <span>📊</span>
            </h3>
            <span class="text-[11px] text-gray-400">0 = low, 10 = high</span>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="stat in stats" :key="stat.key" class="space-y-1.5">
              <div class="flex items-center justify-between text-[11px] text-gray-500">
                <span class="flex items-center gap-1.5">
                  <span>{{ stat.emoji }}</span>
                  <span class="font-medium text-gray-700">{{ stat.label }}</span>
                </span>
                <span class="tabular-nums">{{ stat.value }}/10</span>
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
        </div>

        <!-- Listings -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>Places they’re offering</span>
              <span>🏠</span>
            </h3>
            <span class="text-[11px] text-gray-400">
              {{ listings.length }} active
            </span>
          </div>

          <div v-if="listings.length === 0"
               class="rounded-2xl bg-white border border-dashed border-gray-200 p-6 text-center text-xs text-gray-500">
            No active listings for this person yet.
          </div>

          <div v-else class="grid gap-4 md:grid-cols-2">
            <div
                v-for="listing in listings"
                :key="listing.id"
                class="rounded-2xl bg-white border border-gray-200 p-4 space-y-2 text-sm"
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
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="pt-2 flex gap-3">
          <button
              type="button"
              class="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black flex items-center gap-2"
              @click="goToChat"
          >
            Say hi 👋
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRoute, useRouter} from '#imports'
import {usePublicProfile} from '~/composables/usePublicProfile'

const route = useRoute()
const router = useRouter()
const {profile, traits, listings, loading, error, loadPublicProfile} = usePublicProfile()

onMounted(async () => {
  const id = route.params.id as string
  await loadPublicProfile(id)
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

  const t = traits.value as any || {}

  const cleanliness = safe(t.cleanliness_level, 5)
  const noise = safe(t.noise_tolerance, 5)
  const social = safe(t.social_level, 5)
  const pets = t.pet_friendly === true
  const smokingOk = t.smoking_ok === true
  const sleep = t.sleep_schedule as string | undefined
  const homeVibe = t.home_vibe as string | undefined

  if (cleanliness >= 8) badges.push({emoji: '🧽', label: 'Very tidy'})
  else if (cleanliness <= 3) badges.push({emoji: '😌', label: 'Laid-back about mess'})

  if (noise >= 8) badges.push({emoji: '🔇', label: 'Loves quiet evenings'})
  else if (noise <= 3) badges.push({emoji: '🔊', label: 'Okay with noise'})

  if (social >= 7) badges.push({emoji: '🕺', label: 'Social roommate'})
  else if (social <= 3) badges.push({emoji: '📚', label: 'Low-key homebody'})

  if (pets) badges.push({emoji: '🐾', label: 'Pet-friendly'})
  if (!smokingOk) badges.push({emoji: '🚭', label: 'Non-smoker preferred'})

  if (sleep === 'early_bird') badges.push({emoji: '🌅', label: 'Early bird'})
  else if (sleep === 'night_owl') badges.push({emoji: '🌙', label: 'Night owl'})

  if (homeVibe === 'chill') badges.push({emoji: '😌', label: 'Chill vibe'})
  else if (homeVibe === 'lively') badges.push({emoji: '🎉', label: 'Lively home'})
  else if (homeVibe === 'cozy') badges.push({emoji: '🕯️', label: 'Cozy home'})
  else if (homeVibe === 'minimal') badges.push({emoji: '📦', label: 'Minimalist'})

  return badges.slice(0, 6)
})

const goToChat = () => {
  const id = route.params.id as string
  // assuming you route chat by profileId and inside you create/lookup a thread
  router.push(`/chat/${id}`)
}
</script>