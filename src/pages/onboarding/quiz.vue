<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-100 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-5xl grid md:grid-cols-5 gap-8">

      <!-- LEFT: Section info / “level” panel -->
      <div class="md:col-span-2 space-y-6">

        <!-- Gamey header -->
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-orange-200 shadow-sm">
            <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] text-white animate-bounce">
              🎯
            </span>
            <span class="text-[11px] font-medium text-orange-800">
              Vibe Quiz · Level {{ currentSectionIndex + 1 }}/{{ totalSections || 1 }}
            </span>
          </div>

          <div class="space-y-1">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 leading-snug flex items-center gap-2">
              <span>
                {{ currentSection?.title || 'Getting to know you' }}
              </span>
              <span class="text-lg" v-if="currentSectionEmoji">
                {{ currentSectionEmoji }}
              </span>
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed min-h-[2.5rem]">
              {{ currentSectionDescription || 'These questions help us understand your home “vibe stat sheet”.' }}
            </p>
          </div>
        </div>

        <!-- XP / progress block -->
        <div v-if="totalSections > 0" class="space-y-3">
          <div class="flex items-center justify-between text-[11px] text-gray-500">
            <span class="font-semibold text-gray-700 flex items-center gap-1.5">
              <span class="text-base">⭐</span> Vibe XP
            </span>
            <span>
              {{ answeredCount }} / {{ totalQuestions }} answered
            </span>
          </div>

          <!-- Progress bar -->
          <div class="h-2 w-full rounded-full bg-white/60 border border-gray-200 overflow-hidden shadow-inner">
            <div
                class="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 transition-all"
                :style="{ width: progressPercent + '%' }"
            />
          </div>

          <!-- Section pills -->
          <div class="flex flex-wrap gap-2 pt-1">
            <button
                v-for="sec in sectionIndicators"
                :key="sec.key"
                type="button"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-transform duration-150"
                :class="sec.current
                ? 'border-gray-900 bg-gray-900 text-white shadow-sm scale-[1.02]'
                : sec.completed
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 bg-white/80 text-gray-600 hover:bg-gray-50'"
                @click="jumpToSection(sec.index)"
            >
              <span
                  class="w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                  :class="sec.current
                  ? 'bg-white text-gray-900'
                  : sec.completed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-500'"
              >
                <span v-if="sec.completed">✓</span>
                <span v-else>{{ sec.index + 1 }}</span>
              </span>
              <span class="truncate max-w-[110px]">
                {{ sec.shortTitle }}
              </span>
            </button>
          </div>
        </div>

      </div>

      <!-- RIGHT: Question card “play area” -->
      <div class="md:col-span-3 flex flex-col">

        <!-- Loading state -->
        <div v-if="loading" class="flex-1 flex flex-col items-center justify-center gap-2">
          <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 animate-spin" />
          <p class="text-xs text-gray-500">Loading your vibe quiz…</p>
        </div>

        <!-- Question card -->
        <div v-else class="flex-1 flex flex-col">
          <Transition name="slide-fade" mode="out-in">
            <div
                v-if="currentQuestion"
                :key="currentSection?.key + '-' + currentQuestionIndex"
                class="rounded-3xl border border-gray-200 bg-white/90 backdrop-blur p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.06)] space-y-6 transform transition-transform duration-200 hover:scale-[1.01]"
            >
              <!-- Question text -->
              <div class="space-y-2">
                <p class="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold flex items-center gap-1.5">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Question {{ currentQuestionIndex + 1 }} of {{ currentSectionQuestions.length }}
                </p>
                <h3 class="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug flex items-start gap-2">
                  <span class="pt-[2px]">💬</span>
                  <span>{{ currentQuestion.question_text }}</span>
                </h3>
                <p v-if="currentQuestion.help_text" class="text-sm text-gray-500">
                  {{ currentQuestion.help_text }}
                </p>
              </div>

              <!-- SCALE -->
              <div v-if="currentQuestion.input_type === 'scale'" class="space-y-4 pt-3">
                <input
                    type="range"
                    :min="currentQuestion.scale_min ?? 1"
                    :max="currentQuestion.scale_max ?? 10"
                    class="w-full accent-gray-900"
                    :value="currentScaleValue(currentQuestion)"
                    @change="onScaleChange(currentQuestion, $event)"
                />
                <div class="flex justify-between text-xs text-gray-500">
                  <span>{{ currentQuestion.scale_min_label }}</span>
                  <span>{{ currentQuestion.scale_max_label }}</span>
                </div>
                <p class="text-[11px] text-gray-400 flex items-center gap-1">
                  <span>➡️</span>
                  <span>Slide to choose your spot. We’ll auto-jump to the next one.</span>
                </p>
              </div>

              <!-- BOOLEAN -->
              <div
                  v-else-if="currentQuestion.input_type === 'boolean'"
                  class="flex flex-col sm:flex-row gap-3 pt-3"
              >
                <button
                    type="button"
                    class="flex-1 px-4 py-3 rounded-2xl text-sm font-medium border transition transform hover:-translate-y-0.5"
                    :class="answers[currentQuestion.answer_key] === true
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                    : 'border-gray-200 text-gray-800 bg-white hover:bg-emerald-50'"
                    @click="answerAndAdvance(currentQuestion.answer_key, true)"
                >
                  ✅ Yes, that’s me
                </button>

                <button
                    type="button"
                    class="flex-1 px-4 py-3 rounded-2xl text-sm font-medium border transition transform hover:-translate-y-0.5"
                    :class="answers[currentQuestion.answer_key] === false
                    ? 'border-rose-500 bg-rose-500 text-white shadow-md'
                    : 'border-gray-200 text-gray-800 bg-white hover:bg-rose-50'"
                    @click="answerAndAdvance(currentQuestion.answer_key, false)"
                >
                  ❌ Nope, not really
                </button>
              </div>

              <!-- CHOICE -->
              <div
                  v-else-if="currentQuestion.input_type === 'choice' && currentQuestion.options && currentQuestion.options.length"
                  class="flex flex-wrap gap-3 pt-3"
              >
                <button
                    v-for="opt in currentQuestion.options"
                    :key="opt"
                    type="button"
                    class="px-4 py-2.5 rounded-full border text-sm transition transform hover:-translate-y-0.5"
                    :class="answers[currentQuestion.answer_key] === opt
                    ? 'border-purple-500 bg-purple-500 text-white shadow-md'
                    : 'border-gray-200 text-gray-800 bg-white hover:bg-purple-50'"
                    @click="answerAndAdvance(currentQuestion.answer_key, opt)"
                >
                  {{ formatOption(opt) }}
                </button>
              </div>

              <!-- Fallback -->
              <div v-else class="text-[11px] text-gray-400">
                This question type is not yet supported. (You unlocked a dev to-do 👀)
              </div>
            </div>
          </Transition>

          <!-- Dot indicator under card (per-section questions) -->
          <div class="mt-4 flex items-center justify-center gap-2">
            <button
                v-for="(q, idx) in currentSectionQuestions"
                :key="q.id"
                type="button"
                class="h-2.5 w-2.5 rounded-full transition transform"
                :class="idx === currentQuestionIndex
                ? 'bg-gray-900 scale-125 animate-pulse'
                : answers[q.answer_key] !== undefined
                  ? 'bg-emerald-400'
                  : 'bg-gray-200 hover:bg-gray-300'"
                @click="jumpToQuestion(idx)"
            />
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between mt-6">
            <button
                type="button"
                class="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-40 flex items-center gap-1"
                :disabled="(currentSectionIndex === 0 && currentQuestionIndex === 0) || submitting"
                @click="goPrev"
            >
              ⬅️ Back
            </button>

            <button
                type="button"
                class="px-6 py-2 rounded-2xl bg-gray-900 text-white text-sm font-medium hover:bg-black disabled:opacity-40 flex items-center gap-2 shadow-sm"
                :disabled="submitting"
                @click="nextStep"
            >
              <span v-if="isLastSection && isLastQuestionInSection">
                {{ submitting ? 'Saving…' : 'See my vibe summary 🎉' }}
              </span>
              <span v-else>
                Next question →
              </span>
              <span class="text-[11px] opacity-80">
                {{ Math.max(progressPercent, 5) }}%
              </span>
            </button>
          </div>
        </div>

        <!-- Error -->
        <p v-if="error" class="mt-3 text-xs text-red-500 text-center">
          {{ error }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from '#imports'
import { useQuiz } from '~/composables/useQuiz'

const router = useRouter()
const {
  questions,
  answers,
  loading,
  error,
  loadQuizQuestions,
  setAnswer,
  saveTraits
} = useQuiz()

const submitting = ref(false)
const currentSectionIndex = ref(0)
const currentQuestionIndex = ref(0)

onMounted(async () => {
  await loadQuizQuestions(24)
})

const categoryMeta: Record<string, { title: string; description?: string; emoji?: string }> = {
  cleanliness: {
    title: 'Cleanliness & shared spaces',
    description: 'How tidy and organised you like the home to feel.',
    emoji: '🧽'
  },
  noise: {
    title: 'Noise & quiet hours',
    description: 'What “peace and quiet” means to you day to day.',
    emoji: '🔇'
  },
  guests: {
    title: 'Guests & social energy',
    description: 'How often you’re comfortable having people over.',
    emoji: '🕺'
  },
  pets: {
    title: 'Pets',
    description: 'Your comfort level with furry roommates.',
    emoji: '🐾'
  },
  smoking: {
    title: 'Smoking',
    description: 'Whether smoking around the home is okay with you.',
    emoji: '🚭'
  },
  sleep: {
    title: 'Sleep schedule',
    description: 'When you’re typically awake or asleep.',
    emoji: '😴'
  },
  wfh: {
    title: 'Work-from-home',
    description: 'How often you or your roommate are at home working.',
    emoji: '💻'
  },
  vibe: {
    title: 'Home vibe & lifestyle',
    description: 'The general energy you want your home to have.',
    emoji: '✨'
  },
  general: {
    title: 'General preferences',
    description: 'A few extra questions to round things out.',
    emoji: '🎲'
  }
}

const sections = computed(() => {
  const byCategory: Record<string, any[]> = {}

  for (const q of questions.value) {
    const key = q.category || 'general'
    if (!byCategory[key]) byCategory[key] = []
    if (byCategory[key].length < 3) {
      byCategory[key].push(q)
    }
  }

  const order = ['cleanliness', 'noise', 'guests', 'pets', 'smoking', 'sleep', 'wfh', 'vibe', 'general']

  return Object.entries(byCategory)
      .map(([key, qs]) => {
        const meta = categoryMeta[key] || { title: key }
        return {
          key,
          title: meta.title,
          description: meta.description,
          emoji: meta.emoji,
          questions: qs
        }
      })
      .sort((a, b) => {
        const aIdx = order.indexOf(a.key)
        const bIdx = order.indexOf(b.key)
        return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx)
      })
})

const totalSections = computed(() => sections.value.length)
const currentSection = computed(() => {
  if (!sections.value.length) return null
  return sections.value[currentSectionIndex.value] ?? null
})
const currentSectionQuestions = computed(() => currentSection.value?.questions ?? [])
const currentQuestion = computed(() => currentSectionQuestions.value[currentQuestionIndex.value])
const currentSectionDescription = computed(() => currentSection.value?.description ?? '')
const currentSectionEmoji = computed(() => currentSection.value?.emoji ?? '')

const isLastSection = computed(
    () => currentSectionIndex.value === totalSections.value - 1
)
const isLastQuestionInSection = computed(
    () => currentQuestionIndex.value === currentSectionQuestions.value.length - 1
)

const allSectionQuestions = computed(() => sections.value.flatMap((s) => s.questions))
const totalQuestions = computed(() => allSectionQuestions.value.length)

const answeredCount = computed(() => {
  const ans = answers.value || {}
  return allSectionQuestions.value.filter((q) => ans[q.answer_key] !== undefined).length
})

const progressPercent = computed(() => {
  if (!totalQuestions.value) return 0
  return Math.round((answeredCount.value / totalQuestions.value) * 100)
})

const sectionIndicators = computed(() => {
  const ans = answers.value || {}
  return sections.value.map((s, index) => {
    const total = s.questions.length
    const answered = s.questions.filter((q: any) => ans[q.answer_key] !== undefined).length
    const completed = total > 0 && answered === total
    const shortTitle = s.title.replace(/ &.*/, '')

    return {
      index,
      key: s.key,
      title: s.title,
      shortTitle,
      completed,
      current: index === currentSectionIndex.value
    }
  })
})

const currentScaleValue = (q: any): number => {
  const existing = answers.value[q.answer_key] as number | undefined
  if (existing != null) return existing
  const min = q.scale_min ?? 1
  const max = q.scale_max ?? 10
  return Math.round((min + max) / 2)
}

const onScaleChange = (q: any, event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)
  setAnswer(q.answer_key, value)
  nextStep()
}

const formatOption = (opt: string) => {
  return opt
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1))
}

const answerAndAdvance = (key: string, value: unknown) => {
  setAnswer(key, value)
  nextStep()
}

const goPrev = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    return
  }
  if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--
    const prevQuestions = sections.value[currentSectionIndex.value].questions
    currentQuestionIndex.value = prevQuestions.length - 1
  }
}

const jumpToSection = (index: number) => {
  if (index < 0 || index >= totalSections.value) return
  currentSectionIndex.value = index
  currentQuestionIndex.value = 0
}

const jumpToQuestion = (idx: number) => {
  if (idx < 0 || idx >= currentSectionQuestions.value.length) return
  currentQuestionIndex.value = idx
}

const nextStep = () => {
  if (!currentSection.value) return

  if (!isLastQuestionInSection.value) {
    currentQuestionIndex.value++
    return
  }

  if (!isLastSection.value) {
    currentSectionIndex.value++
    currentQuestionIndex.value = 0
    return
  }

  handleSubmit()
}

const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true

  await saveTraits()

  submitting.value = false

  if (!error.value) {
    router.push('/onboarding/summary')
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(14px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-14px);
}
</style>