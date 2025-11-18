<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-100 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-5xl space-y-8">

      <!-- Header -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-emerald-200 shadow-sm">
          <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] text-white">
            🎉
          </span>
          <span class="text-[11px] font-semibold text-emerald-700 tracking-wide uppercase">
            Your roommate vibe is ready
          </span>
        </div>

        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
          Here’s your Amigo Lease vibe summary
        </h1>
        <p class="text-sm text-gray-600 max-w-xl mx-auto">
          This is how we’ll describe you (quietly, to the matching engine 👀). You can tweak your answers any time.
        </p>
      </div>

      <div class="grid md:grid-cols-5 gap-6 items-start">
        <!-- LEFT: Vibe blurb + tags -->
        <div class="md:col-span-3 space-y-4">
          <!-- Main card -->
          <div class="rounded-3xl bg-white/95 border border-gray-200 shadow-[0_18px_40px_rgba(0,0,0,0.06)] p-6 md:p-7">
            <div class="flex items-center justify-between gap-3 mb-3">
              <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span>✨ Your home vibe</span>
              </h2>
              <span class="text-sm text-gray-400">
                {{ loading ? 'Calculating…' : 'Based on your quiz' }}
              </span>
            </div>

            <!-- If still loading -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-8 gap-2">
              <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 animate-spin" />
              <p class="text-xs text-gray-500">Pulling in your answers…</p>
            </div>

            <!-- Summary text -->
            <div v-else class="space-y-3">
              <p class="text-sm md:text-base text-gray-800 leading-relaxed">
                {{ summaryParagraph }}
              </p>

              <!-- Badges -->
              <div class="flex flex-wrap gap-2 pt-2 text-xs">
                <span
                    v-for="badge in vibeBadges"
                    :key="badge.label"
                    class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-900 text-white"
                >
                  <span>{{ badge.emoji }}</span>
                  <span>{{ badge.label }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-3">
            <button
                type="button"
                class="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black flex items-center gap-2"
                @click="goToMatches"
            >
              See my matches
              <span>➡️</span>
            </button>

            <button
                type="button"
                class="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                @click="backToQuiz"
            >
              <span>📝</span>
              <span>Adjust my answers</span>
            </button>
          </div>
        </div>

        <!-- RIGHT: Stat bars -->
        <div class="md:col-span-2 space-y-4">
          <div class="rounded-2xl bg-white/90 border border-gray-200 p-5 space-y-4">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span>📊 Your roommate stats</span>
              </h3>
              <span class="text-[11px] text-gray-400">
                0 = low · 10 = high
              </span>
            </div>

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
                <span class="tabular-nums text-gray-500">
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

          <!-- Tiny note -->
          <p class="text-[11px] text-gray-400">
            We don’t show this exact text to other people. We use it behind the scenes to calculate match scores and highlight potential friction points.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from '#imports'
import { useQuiz } from '~/composables/useQuiz'

const router = useRouter()
const { answers, loading, error, loadExistingTraits } = useQuiz()

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
    badges.push({ emoji: '🧽', label: 'Very tidy' })
  } else if (cleanliness.value <= 3) {
    badges.push({ emoji: '😌', label: 'Laid-back about mess' })
  } else {
    badges.push({ emoji: '🧺', label: 'Reasonably tidy' })
  }

  if (noise.value >= 8) {
    badges.push({ emoji: '🔇', label: 'Loves quiet evenings' })
  } else if (noise.value <= 3) {
    badges.push({ emoji: '🔊', label: 'Okay with noise' })
  } else {
    badges.push({ emoji: '🎧', label: 'Balanced noise level' })
  }

  if (social.value >= 7) {
    badges.push({ emoji: '🕺', label: 'Social roommate' })
  } else if (social.value <= 3) {
    badges.push({ emoji: '📚', label: 'Low-key homebody' })
  } else {
    badges.push({ emoji: '☕', label: 'Chill social' })
  }

  if (pets.value) {
    badges.push({ emoji: '🐾', label: 'Pet-friendly' })
  }

  if (!smoking.value) {
    badges.push({ emoji: '🚭', label: 'Non-smoker preferred' })
  }

  if (sleep.value === 'early_bird') {
    badges.push({ emoji: '🌅', label: 'Early bird' })
  } else if (sleep.value === 'night_owl') {
    badges.push({ emoji: '🌙', label: 'Night owl' })
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