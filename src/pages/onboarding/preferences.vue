<!-- src/pages/onboarding/preferences.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <div class="w-full max-w-xl space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-semibold">
          What are you looking for in a roommate?
        </h1>
        <p class="text-sm text-gray-500">
          Set your dealbreakers and preferences. We’ll respect the non-negotiables.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <!-- Age range -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">Preferred age range</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Min age</label>
              <input
                  v-model.number="form.preferred_age_min"
                  type="number"
                  min="18"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Max age</label>
              <input
                  v-model.number="form.preferred_age_max"
                  type="number"
                  min="18"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
          <p class="text-xs text-gray-500">
            You can leave this blank if you’re flexible.
          </p>
        </div>

        <!-- Gender preference -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            Who are you comfortable sharing a home with?
          </p>
          <div class="flex flex-wrap gap-2 text-xs">
            <button
                type="button"
                class="px-3 py-2 border rounded-full transition"
                :class="form.allow_male ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="form.allow_male = !form.allow_male"
            >
              Men
            </button>
            <button
                type="button"
                class="px-3 py-2 border rounded-full transition"
                :class="form.allow_female ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="form.allow_female = !form.allow_female"
            >
              Women
            </button>
            <button
                type="button"
                class="px-3 py-2 border rounded-full transition"
                :class="form.allow_other ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="form.allow_other = !form.allow_other"
            >
              Other / non-binary
            </button>
          </div>
          <p class="text-xs text-gray-500">
            We’ll only show you people who match what you choose here.
          </p>
        </div>

        <!-- Pets -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            Pets at home
          </p>
          <div class="space-y-2 text-xs">
            <p class="text-gray-500">Must your roommate be okay with pets?</p>
            <div class="flex gap-2">
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="form.must_be_pet_friendly === true ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="form.must_be_pet_friendly = true"
              >
                Yes, they must be pet-friendly
              </button>
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="form.must_be_pet_friendly === false ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="form.must_be_pet_friendly = false"
              >
                No strong preference
              </button>
            </div>

            <p class="text-gray-500 mt-3">
              Do you only want homes that allow pets?
            </p>
            <div class="flex gap-2">
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="form.must_allow_pets === true ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="form.must_allow_pets = true"
              >
                Yes, must allow pets
              </button>
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="form.must_allow_pets === false ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="form.must_allow_pets = false"
              >
                No, not a must
              </button>
            </div>
          </div>
        </div>

        <!-- Smoking -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            Smoking at home
          </p>
          <div class="space-y-2 text-xs">
            <p class="text-gray-500">
              Would you accept a roommate who smokes?
            </p>
            <div class="flex gap-2">
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="form.allow_smokers ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="toggleAllowSmokers(true)"
              >
                I can live with it
              </button>
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="!form.allow_smokers || form.require_non_smoker ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="toggleAllowSmokers(false)"
              >
                No, non-smokers only
              </button>
            </div>
          </div>
        </div>

        <!-- Cleanliness & noise thresholds -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            Cleanliness & noise preferences
          </p>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block mb-1">Minimum cleanliness level</label>
              <input
                  v-model.number="form.min_cleanliness_level"
                  type="range"
                  min="1"
                  max="10"
                  class="w-full"
              />
              <p class="text-gray-500">
                {{ cleanlinessLabel }}
              </p>
            </div>

            <div>
              <label class="block mb-1">Maximum noise level you’re okay with</label>
              <input
                  v-model.number="form.max_noise_tolerance"
                  type="range"
                  min="1"
                  max="10"
                  class="w-full"
              />
              <p class="text-gray-500">
                {{ noiseLabel }}
              </p>
            </div>
          </div>
        </div>

        <!-- Preferred home vibe -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            Preferred home vibe
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in vibeOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="form.preferred_home_vibe === option.value
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="form.preferred_home_vibe = option.value"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Work from home preference -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            Work / study from home
          </p>
          <p class="text-xs text-gray-500">
            Do you have a preference for how often your roommate is home during the day?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="form.prefers_works_from_home ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="toggleWfhPreference('prefer')"
            >
              Prefer someone who’s home a lot
            </button>
            <button
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="form.avoids_works_from_home ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="toggleWfhPreference('avoid')"
            >
              Prefer someone out most of the day
            </button>
          </div>
          <p class="text-xs text-gray-500">
            You can leave this neutral if you don’t mind either way.
          </p>
        </div>

        <button
            type="submit"
            class="w-full rounded-lg px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 disabled:opacity-60"
            :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Finish setup' }}
        </button>

        <p v-if="error" class="text-xs text-red-500 text-center">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { HomeVibe } from '~/types/amigo'
import { usePreferences } from '~/composables/usePreferences'
import { useProfile } from '~/composables/useProfile'

const router = useRouter()
const { form, loadPreferences, savePreferences, loading, error } = usePreferences()
const { profile, fetchProfile } = useProfile()

const vibeOptions: { value: HomeVibe; label: string; icon: string }[] = [
  { value: 'sanctuary', label: 'Calm sanctuary', icon: '🧘' },
  { value: 'flexible', label: 'Depends on the day', icon: '🔀' },
  { value: 'social_hub', label: 'Social hub', icon: '🥳' }
]

const cleanlinessLabel = computed(() => {
  const value = form.min_cleanliness_level ?? 5
  if (value <= 3) return 'You’re okay with a pretty relaxed space.'
  if (value <= 7) return 'You’d like things reasonably tidy.'
  return 'You really value a very clean home.'
})

const noiseLabel = computed(() => {
  const value = form.max_noise_tolerance ?? 5
  if (value <= 3) return 'You prefer things very quiet at home.'
  if (value <= 7) return 'Some noise is okay, within reason.'
  return 'You’re fine with a fairly lively home.'
})

const toggleAllowSmokers = (allow: boolean) => {
  form.allow_smokers = allow
  form.require_non_smoker = !allow
}

const toggleWfhPreference = (mode: 'prefer' | 'avoid') => {
  if (mode === 'prefer') {
    form.prefers_works_from_home = !form.prefers_works_from_home
    if (form.prefers_works_from_home) {
      form.avoids_works_from_home = false
    }
  } else {
    form.avoids_works_from_home = !form.avoids_works_from_home
    if (form.avoids_works_from_home) {
      form.prefers_works_from_home = false
    }
  }
}

onMounted(async () => {
  await Promise.all([fetchProfile(), loadPreferences()])
})

const handleSubmit = async () => {
  await savePreferences()

  if (!error.value) {
    // If the user has a place, send them to listing creation.
    // Otherwise, they can go straight to matches (or whatever you want as next step).
    if (profile.value?.has_place) {
      router.push('/onboarding/listing')
    } else {
      router.push('/matches')
    }
  }
}
</script>