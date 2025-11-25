<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-5xl space-y-10">

      <!-- Header -->
      <div class="text-center space-y-4 relative z-10">
        <div
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-800">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-xs font-bold text-emerald-700 tracking-wide uppercase dark:text-emerald-400">
            Vibe Analysis Complete
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Here’s your roommate vibe
        </h1>
        <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
          This is how we’ll describe you to the matching engine. You can always tweak this later.
        </p>
      </div>

      <div class="grid md:grid-cols-5 gap-8 items-start">
        <!-- LEFT: Vibe blurb + tags -->
        <div class="md:col-span-3 space-y-6">
          <!-- Main card -->
          <div
              class="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 relative overflow-hidden dark:bg-gray-900 dark:border-slate-800">
            <!-- Decorative blob -->
            <div
                class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none dark:bg-slate-800/50"></div>

            <div class="relative z-10 space-y-6">
              <div class="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>✨ Your Home Profile</span>
                </h2>
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {{ loading ? 'Analyzing...' : 'Generated' }}
                </span>
              </div>

              <!-- If still loading -->
              <div v-if="loading" class="flex flex-col items-center justify-center py-12 gap-4">
                <div
                    class="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"></div>
                <p class="text-sm text-slate-500 font-medium animate-pulse">Synthesizing your answers...</p>
              </div>

              <!-- Summary text -->
              <div v-else class="space-y-6">
                <p class="text-base text-slate-700 leading-relaxed font-medium dark:text-slate-300">
                  {{ summaryParagraph }}
                </p>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2">
                  <span
                      v-for="badge in vibeBadges"
                      :key="badge.label"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                  >
                    <span>{{ badge.emoji }}</span>
                    <span>{{ badge.label }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
                type="button"
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 dark:bg-white dark:text-slate-900"
                @click="goToMatches"
            >
              See My Matches
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>

            <button
                type="button"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
                @click="backToQuiz"
            >
              <span>✏️</span>
              <span>Edit Answers</span>
            </button>
          </div>
        </div>

        <!-- RIGHT: Stat bars -->
        <div class="md:col-span-2 space-y-6">
          <div
              class="rounded-3xl bg-white border border-slate-200 shadow-lg p-6 dark:bg-gray-900 dark:border-slate-800">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">
                Vibe Stats
              </h3>
              <span
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md dark:bg-slate-800">
                0 - 10 Scale
              </span>
            </div>

            <div class="space-y-5">
              <div
                  v-for="stat in stats"
                  :key="stat.key"
                  class="space-y-2"
              >
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                    <span class="text-base">{{ stat.emoji }}</span>
                    {{ stat.label }}
                  </span>
                  <span class="font-mono font-medium text-slate-500 dark:text-slate-400">
                    {{ stat.value }}/10
                  </span>
                </div>

                <div class="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                      class="h-full rounded-full bg-slate-900 dark:bg-white transition-all duration-1000 ease-out"
                      :style="{ width: (stat.value * 10) + '%' }"
                  />
                </div>

                <p class="text-[10px] text-slate-400 leading-snug dark:text-slate-500">
                  {{ stat.caption }}
                </p>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="bg-slate-100 rounded-2xl p-4 flex gap-3 items-start dark:bg-slate-800/50">
            <span class="text-lg">🔒</span>
            <p class="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
              <strong class="text-slate-700 dark:text-slate-300">Private Data:</strong> We don’t show these exact
              numbers to others. We use them to calculate compatibility scores and identify potential friction points.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRouter} from '#imports'
import {useQuiz} from '~/composables/useQuiz'

const router = useRouter()
const {answers, loading, error, loadExistingTraits} = useQuiz()

onMounted(async () => {
  await loadExistingTraits()
})

const safeNumber = (value: unknown, fallback = 5): number => {
  const n = typeof value === 'number' ? value : Number(value)
  if (Number.isFinite(n)) return Math.min(10, Math.max(0, n))
  return fallback
}

const cleanliness = computed(() => safeNumber(answers.value.cleanliness, 5))
const noise = computed(() => safeNumber(answers.value.noise, 5))
const social = computed(() => safeNumber(answers.value.social, 5))
const guests = computed(() => safeNumber(answers.value.guests, 5))
const wfh = computed(() => safeNumber(answers.value.wfh, 5))

const pets = computed(() => {
  const v = answers.value.pets
  return typeof v === 'boolean' ? v : false
})

const smoking = computed(() => {
  const v = answers.value.smoking
  return typeof v === 'boolean' ? v : false
})

const sleep = computed(() => {
  return (answers.value.sleep as string | undefined) ?? 'regular'
})

const vibe = computed(() => {
  return (answers.value.vibe as string | undefined) ?? 'chill'
})

const describeScale = (value: number, low: string, mid: string, high: string): string => {
  if (value <= 3) return low
  if (value >= 8) return high
  return mid
}

const summaryParagraph = computed(() => {
  if (error.value) {
    return 'We had a bit of trouble loading your answers, but you can still adjust your preferences later.'
  }

  const cleanlinessText = describeScale(
      cleanliness.value,
      'pretty relaxed about mess, as long as things don’t get out of hand',
      'fairly tidy and like shared spaces to feel put-together most of the time',
      'very tidy and really appreciate clean, organised shared spaces'
  )

  const noiseText = describeScale(
      noise.value,
      'okay with a bit of background noise and activity at home',
      'happy with a balanced home where it’s not too quiet, not too loud',
      'someone who really values a quiet, calm home — especially on weeknights'
  )

  const socialText = describeScale(
      social.value,
      'more low-key and enjoy lots of solo recharge time',
      'social when it feels right but also enjoy personal space',
      'very social and enjoy a lively home energy'
  )

  const guestsText = describeScale(
      guests.value,
      'prefer guests to be occasional and low-key',
      'comfortable with friends coming over sometimes',
      'very comfortable with frequent hangouts, game nights, or movie evenings at home'
  )

  const petsText = pets.value
      ? 'You’re open to (or even excited about) living with pets 🐾.'
      : 'You’d probably prefer a home without pets or with very limited pet presence.'

  const smokingText = smoking.value
      ? 'You’re okay with a roommate who smokes, as long as it fits some ground rules.'
      : 'You’d strongly prefer a non-smoking environment.'

  let sleepText = ''
  if (sleep.value === 'early_bird') {
    sleepText = 'You lean more early-bird, so a roommate with similar sleep hours will feel really natural.'
  } else if (sleep.value === 'night_owl') {
    sleepText = 'You’re more of a night owl, so someone who doesn’t mind later bedtimes is ideal.'
  } else if (sleep.value === 'flexible') {
    sleepText = 'Your sleep schedule is pretty flexible — you can adapt as long as there’s mutual respect.'
  } else {
    sleepText = 'Your sleep schedule is fairly regular, so consistency at home will feel good.'
  }

  let vibeText = ''
  if (vibe.value === 'chill') {
    vibeText = 'Overall, your home vibe leans chill and relaxed.'
  } else if (vibe.value === 'lively') {
    vibeText = 'Overall, your home vibe leans lively and energetic.'
  } else if (vibe.value === 'minimal') {
    vibeText = 'You lean towards a cleaner, more minimal feel at home.'
  } else if (vibe.value === 'cozy') {
    vibeText = 'You lean towards a warm, cozy, lived-in feel at home.'
  } else {
    vibeText = 'You’re pretty flexible with the exact vibe, as long as there’s respect and good energy.'
  }

  return [
    `You come across as someone who is ${cleanlinessText}`,
    `You’re ${noiseText}`,
    `Socially, you’re ${socialText}`,
    `When it comes to guests, you’re ${guestsText}`,
    petsText,
    smokingText,
    sleepText,
    vibeText
  ].join(' ')
})

const vibeBadges = computed(() => {
  const badges: { emoji: string; label: string }[] = []

  if (cleanliness.value >= 8) {
    badges.push({emoji: '🧽', label: 'Very tidy'})
  } else if (cleanliness.value <= 3) {
    badges.push({emoji: '😌', label: 'Laid-back about mess'})
  } else {
    badges.push({emoji: '🧺', label: 'Reasonably tidy'})
  }

  if (noise.value >= 8) {
    badges.push({emoji: '🔇', label: 'Loves quiet evenings'})
  } else if (noise.value <= 3) {
    badges.push({emoji: '🔊', label: 'Okay with noise'})
  } else {
    badges.push({emoji: '🎧', label: 'Balanced noise level'})
  }

  if (social.value >= 7) {
    badges.push({emoji: '🕺', label: 'Social roommate'})
  } else if (social.value <= 3) {
    badges.push({emoji: '📚', label: 'Low-key homebody'})
  } else {
    badges.push({emoji: '☕', label: 'Chill social'})
  }

  if (pets.value) {
    badges.push({emoji: '🐾', label: 'Pet-friendly'})
  }

  if (!smoking.value) {
    badges.push({emoji: '🚭', label: 'Non-smoker preferred'})
  }

  if (sleep.value === 'early_bird') {
    badges.push({emoji: '🌅', label: 'Early bird'})
  } else if (sleep.value === 'night_owl') {
    badges.push({emoji: '🌙', label: 'Night owl'})
  }

  return badges
})

const stats = computed(() => {
  return [
    {
      key: 'cleanliness',
      label: 'Cleanliness',
      emoji: '🧽',
      value: cleanliness.value,
      caption: describeScale(
          cleanliness.value,
          'You’re pretty relaxed about shared mess.',
          'You like things reasonably neat.',
          'You really appreciate a clean, organised home.'
      )
    },
    {
      key: 'noise',
      label: 'Quiet vs. noise',
      emoji: '🔈',
      value: noise.value,
      caption: describeScale(
          noise.value,
          'You’re okay with some background noise.',
          'You prefer a balanced noise level.',
          'You really value a quiet, calm home.'
      )
    },
    {
      key: 'social',
      label: 'Social energy',
      emoji: '🧑‍🤝‍🧑',
      value: social.value,
      caption: describeScale(
          social.value,
          'You lean more introverted at home.',
          'You’re sociable when it feels right.',
          'You enjoy a lively, social home environment.'
      )
    },
    {
      key: 'guests',
      label: 'Guests & hosting',
      emoji: '🎉',
      value: guests.value,
      caption: describeScale(
          guests.value,
          'You prefer guests to be rare and low-key.',
          'You’re fine with friends over now and then.',
          'You’re comfortable with frequent hangouts at home.'
      )
    },
    {
      key: 'wfh',
      label: 'Time spent at home',
      emoji: '🏡',
      value: wfh.value,
      caption: describeScale(
          wfh.value,
          'You’re out of the house a lot.',
          'You’re home a fair bit, depending on the day.',
          'You’re home most of the time (WFH / study).'
      )
    }
  ]
})

const goToMatches = () => {
  router.push('/matches')
}

const backToQuiz = () => {
  router.push('/onboarding/quiz')
}
</script>