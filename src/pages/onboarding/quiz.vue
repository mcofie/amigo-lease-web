<!-- src/pages/onboarding/quiz.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <div class="w-full max-w-xl space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-semibold">
          Let’s get a feel for your home vibe ✨
        </h1>
        <p class="text-sm text-gray-500">
          Answer a few quick questions so we can find roommates you actually click with.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <!-- Cleanliness -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            How tidy do you like your home to be?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in cleanlinessOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="option.value === answers.cleanliness
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="setAnswer('cleanliness', option.value)"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Noise tolerance -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            What’s your ideal noise level at home?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in noiseOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="option.value === answers.noise
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="setAnswer('noise', option.value)"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Social level -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            How social do you want your home to feel?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in socialOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="option.value === answers.social
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="setAnswer('social', option.value)"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Guests comfort -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            How do you feel about guests coming over?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in guestsOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="option.value === answers.guests
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="setAnswer('guests', option.value)"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Sleep schedule -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            What best describes your sleep schedule?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in sleepOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="option.value === answers.sleep
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="setAnswer('sleep', option.value)"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Home vibe -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            What should your home feel like?
          </p>
          <div class="flex gap-2 text-xs">
            <button
                v-for="option in vibeOptions"
                :key="option.value"
                type="button"
                class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                :class="option.value === answers.vibe
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'"
                @click="setAnswer('vibe', option.value)"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div>{{ option.label }}</div>
            </button>
          </div>
        </div>

        <!-- Pets & smoking -->
        <div class="grid grid-cols-2 gap-4">
          <div class="border rounded-xl p-4 space-y-3">
            <p class="text-sm font-medium">
              Are you okay living with pets?
            </p>
            <div class="flex gap-2 text-xs">
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="answers.pets === true
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="setAnswer('pets', true)"
              >
                🐾 Yes
              </button>
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="answers.pets === false
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="setAnswer('pets', false)"
              >
                🚫 No
              </button>
            </div>
          </div>

          <div class="border rounded-xl p-4 space-y-3">
            <p class="text-sm font-medium">
              Are you okay with smoking at home?
            </p>
            <div class="flex gap-2 text-xs">
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="answers.smoking === true
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="setAnswer('smoking', true)"
              >
                🚬 Yes
              </button>
              <button
                  type="button"
                  class="flex-1 border rounded-lg px-2 py-2 text-center transition"
                  :class="answers.smoking === false
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50'"
                  @click="setAnswer('smoking', false)"
              >
                🚭 No
              </button>
            </div>
          </div>
        </div>

        <!-- Work from home -->
        <div class="border rounded-xl p-4 space-y-3">
          <p class="text-sm font-medium">
            How often do you work or study from home?
          </p>
          <input
              v-model.number="answers.wfh"
              type="range"
              min="0"
              max="10"
              class="w-full"
          />
          <p class="text-xs text-gray-500">
            {{ wfhLabel }}
          </p>
        </div>

        <button
            type="submit"
            class="w-full rounded-lg px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 disabled:opacity-60"
            :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Continue' }}
        </button>

        <p v-if="error" class="text-xs text-red-500 text-center">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import type {SleepSchedule, HomeVibe} from '~/types/amigo'
import {useQuiz} from '~/composables/useQuiz'

const router = useRouter()
const {answers, setAnswer, loadExistingTraits, saveTraits, loading, error} = useQuiz()

const cleanlinessOptions = [
  {value: 3, label: 'Pretty relaxed', icon: '😌'},
  {value: 7, label: 'Mostly tidy', icon: '🧹'},
  {value: 10, label: 'Super spotless', icon: '✨'}
]

const noiseOptions = [
  {value: 2, label: 'Very quiet', icon: '🤫'},
  {value: 5, label: 'Some background', icon: '🎧'},
  {value: 9, label: 'I don’t mind noise', icon: '🎵'}
]

const socialOptions = [
  {value: 3, label: 'Low key', icon: '📚'},
  {value: 6, label: 'Now and then', icon: '🎲'},
  {value: 9, label: 'Very social', icon: '🎉'}
]

const guestsOptions = [
  {value: 2, label: 'Almost never', icon: '🚪'},
  {value: 5, label: 'Sometimes', icon: '👋'},
  {value: 8, label: 'Pretty often', icon: '🧑‍🤝‍🧑'}
]

const sleepOptions: { value: SleepSchedule; label: string; icon: string }[] = [
  {value: 'early_bird', label: 'In bed early', icon: '🌅'},
  {value: 'regular', label: 'Around 11–12', icon: '🌙'},
  {value: 'night_owl', label: 'Late nights', icon: '🌃'}
]

const vibeOptions: { value: HomeVibe; label: string; icon: string }[] = [
  {value: 'sanctuary', label: 'Calm sanctuary', icon: '🧘'},
  {value: 'flexible', label: 'Depends on the day', icon: '🔀'},
  {value: 'social_hub', label: 'Social hub', icon: '🥳'}
]

const wfhLabel = computed(() => {
  const value = (answers.value.wfh as number) ?? 5

  if (value <= 2) return 'You’re hardly ever home during the day.'
  if (value <= 6) return 'You’re home some days, out on others.'
  return 'You’re home a lot (remote work / study).'
})

onMounted(async () => {
  await loadExistingTraits()
})

const handleSubmit = async () => {
  await saveTraits()

  if (!error.value) {
    router.push('/onboarding/preferences')
  }
}
</script>