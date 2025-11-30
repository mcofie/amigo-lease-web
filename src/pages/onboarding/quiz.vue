<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-8"
  >
    <div class="w-full max-w-3xl mx-auto flex flex-col gap-8">

      <!-- HEADER: Progress & Section Info -->
      <section class="space-y-6 w-full max-w-2xl mx-auto">
        <!-- Navigation / Progress Header -->
        <div class="flex items-center justify-between">
          <div
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10"
          >
            <span class="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Level {{ currentSectionIndex + 1 }}/{{ totalSections || 1 }}
            </span>
          </div>

          <div class="text-xs font-medium text-slate-500 dark:text-slate-400">
            {{ Math.round(progressPercent) }}% Complete
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
              class="h-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-500 ease-out"
              :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <!-- Section Title -->
        <div class="text-center space-y-2">
          <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <span>{{ currentSection?.title || 'Getting Started' }}</span>
            <span v-if="currentSectionEmoji" class="text-2xl">{{ currentSectionEmoji }}</span>
          </h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            {{ currentSectionDescription || 'Help us build your compatibility profile.' }}
          </p>
        </div>
      </section>

      <!-- MAIN CONTENT: Question Card -->
      <section class="w-full max-w-2xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"></div>
          <p class="text-sm text-slate-500 font-medium animate-pulse">Loading questions...</p>
        </div>

        <!-- Question Card -->
        <div v-else class="relative">
          <Transition name="slide-up" mode="out-in">
            <div
                v-if="currentQuestion"
                :key="currentQuestion.id"
                class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 space-y-8"
            >
              <!-- Question Text -->
              <div class="space-y-3">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question {{ currentQuestionIndex + 1 }} of {{ currentSectionQuestions.length }}
                </span>
                <h3 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {{ currentQuestion.question_text }}
                </h3>
                <p v-if="currentQuestion.help_text" class="text-sm text-slate-500 dark:text-slate-400">
                  {{ currentQuestion.help_text }}
                </p>
              </div>

              <!-- INPUTS -->
              <div class="pt-2">

                <!-- SCALE INPUT -->
                <div v-if="currentQuestion.input_type === 'scale'" class="space-y-6">
                  <div class="relative pt-6 pb-2">
                    <input
                        type="range"
                        :min="currentQuestion.scale_min ?? 1"
                        :max="currentQuestion.scale_max ?? 10"
                        class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:bg-slate-700 dark:accent-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        :value="currentScaleValue(currentQuestion)"
                        @change="onScaleChange(currentQuestion, $event)"
                    />
                    <!-- Custom thumb styling often needs CSS, native accent-color handles basics well -->
                  </div>
                  <div class="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    <span>{{ currentQuestion.scale_min_label || 'Low' }}</span>
                    <span>{{ currentQuestion.scale_max_label || 'High' }}</span>
                  </div>
                </div>

                <!-- BOOLEAN INPUT -->
                <div v-else-if="currentQuestion.input_type === 'boolean'" class="grid sm:grid-cols-2 gap-4">
                  <button
                      type="button"
                      class="relative group flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-200"
                      :class="answers[currentQuestion.answer_key] === true
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750'"
                      @click="answerAndAdvance(currentQuestion.answer_key, true)"
                  >
                    <span class="text-xl">👍</span>
                    <span class="font-semibold">Yes</span>
                  </button>

                  <button
                      type="button"
                      class="relative group flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-200"
                      :class="answers[currentQuestion.answer_key] === false
                      ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750'"
                      @click="answerAndAdvance(currentQuestion.answer_key, false)"
                  >
                    <span class="text-xl">👎</span>
                    <span class="font-semibold">No</span>
                  </button>
                </div>

                <!-- CHOICE INPUT -->
                <div
                    v-else-if="currentQuestion.input_type === 'choice' && currentQuestion.options?.length"
                    class="grid gap-3"
                >
                  <button
                      v-for="opt in currentQuestion.options"
                      :key="opt"
                      type="button"
                      class="w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group"
                      :class="answers[currentQuestion.answer_key] === opt
                      ? 'border-slate-900 bg-slate-50 text-slate-900 dark:border-white dark:bg-white/10 dark:text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600'"
                      @click="answerAndAdvance(currentQuestion.answer_key, opt)"
                  >
                    <span class="font-medium">{{ formatOption(opt) }}</span>
                    <span v-if="answers[currentQuestion.answer_key] === opt" class="text-lg">✓</span>
                  </button>
                </div>

                <!-- Fallback -->
                <div v-else class="p-4 rounded-lg bg-slate-100 text-slate-500 text-sm text-center dark:bg-slate-800">
                  Unsupported question type.
                </div>
              </div>

              <!-- Card Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    type="button"
                    class="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 disabled:opacity-50"
                    :disabled="(currentSectionIndex === 0 && currentQuestionIndex === 0) || submitting"
                    @click="goPrev"
                >
                  ← Back
                </button>

                <button
                    type="button"
                    class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    :disabled="submitting"
                    @click="nextStep"
                >
                    <span v-if="submitting" class="flex items-center gap-2">
                      <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Saving...
                    </span>
                  <span v-else-if="isLastSection && isLastQuestionInSection">
                      Finish Quiz 🎉
                    </span>
                  <span v-else>
                      Next →
                    </span>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Dots Indicator -->
          <div class="flex justify-center gap-2 mt-8">
            <div
                v-for="(q, idx) in currentSectionQuestions"
                :key="q.id"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="idx === currentQuestionIndex ? 'w-6 bg-slate-900 dark:bg-white' : (answers[q.answer_key] !== undefined ? 'w-1.5 bg-slate-400 dark:bg-slate-600' : 'w-1.5 bg-slate-200 dark:bg-slate-800')"
            ></div>
          </div>

          <p v-if="error" class="mt-6 text-center text-sm text-rose-600 font-medium">
            {{ error }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useSeoMeta } from '#imports'
import { useQuiz } from '~/composables/useQuiz'

useSeoMeta({
  title: 'Lifestyle Quiz - Amigo Lease Onboarding',
  description: 'Take our lifestyle quiz to find your perfect match.',
})

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
  // Load ample questions
  await loadQuizQuestions(50)
})

// Metadata for grouping questions
const categoryMeta: Record<string, { title: string; description?: string; emoji?: string }> = {
  cleanliness: { title: 'Cleanliness', description: 'How tidy do you keep shared spaces?', emoji: '🧽' },
  noise: { title: 'Noise Levels', description: 'Your tolerance for sound at home.', emoji: '🔇' },
  guests: { title: 'Social & Guests', description: 'How often do you host people?', emoji: '🕺' },
  pets: { title: 'Pets', description: 'Living with furry friends.', emoji: '🐾' },
  smoking: { title: 'Habits', description: 'Smoking and other lifestyle choices.', emoji: '🚬' },
  sleep: { title: 'Sleep Schedule', description: 'Are you an early bird or night owl?', emoji: '😴' },
  wfh: { title: 'Work from Home', description: 'Your daily working routine.', emoji: '💻' },
  vibe: { title: 'Home Vibe', description: 'The energy you bring to the home.', emoji: '✨' },
  general: { title: 'General', description: 'A few final details.', emoji: '📝' }
}

const sections = computed(() => {
  const byCategory: Record<string, any[]> = {}

  // Group questions
  for (const q of questions.value) {
    const key = q.category || 'general'
    if (!byCategory[key]) byCategory[key] = []
    // Optional: Limit questions per section if needed
    byCategory[key].push(q)
  }

  const order = ['cleanliness', 'noise', 'guests', 'pets', 'smoking', 'sleep', 'wfh', 'vibe', 'general']

  return Object.entries(byCategory)
      .map(([key, qs]) => {
        const meta = categoryMeta[key] || { title: key, description: '', emoji: '' }
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

// Computed properties for current state
const totalSections = computed(() => sections.value.length)
const currentSection = computed(() => sections.value[currentSectionIndex.value] ?? null)
const currentSectionQuestions = computed(() => currentSection.value?.questions ?? [])
const currentQuestion = computed(() => currentSectionQuestions.value[currentQuestionIndex.value])
const currentSectionDescription = computed(() => currentSection.value?.description ?? '')
const currentSectionEmoji = computed(() => currentSection.value?.emoji ?? '')

const isLastSection = computed(() => currentSectionIndex.value === totalSections.value - 1)
const isLastQuestionInSection = computed(() => currentQuestionIndex.value === currentSectionQuestions.value.length - 1)

const allSectionQuestions = computed(() => sections.value.flatMap((s) => s.questions))
const totalQuestions = computed(() => allSectionQuestions.value.length)
const answeredCount = computed(() => {
  const ans = answers.value || {}
  return allSectionQuestions.value.filter((q) => ans[q.answer_key] !== undefined).length
})

const progressPercent = computed(() => {
  if (!totalQuestions.value) return 0
  return Math.min(100, Math.round((answeredCount.value / totalQuestions.value) * 100))
})

// Helper methods
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
}

const formatOption = (opt: string) => {
  return opt.replace(/_/g, ' ').replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1))
}

const answerAndAdvance = (key: string, value: unknown) => {
  setAnswer(key, value)
  nextStep()
}

// Navigation Logic
const goPrev = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  } else if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--
    const prevSection = sections.value[currentSectionIndex.value]
    if (prevSection?.questions?.length) {
      currentQuestionIndex.value = prevSection.questions.length - 1
    }
  }
}

const nextStep = () => {
  if (!currentSection.value) return

  // If user manually clicks Next on a scale/choice without changing value, ensure it saves default?
  // (Optional logic: if answer undefined, set default)

  if (!isLastQuestionInSection.value) {
    currentQuestionIndex.value++
  } else if (!isLastSection.value) {
    currentSectionIndex.value++
    currentQuestionIndex.value = 0
  } else {
    handleSubmit()
  }
}

const jumpToSection = (index: number) => {
  if (index >= 0 && index < totalSections.value) {
    currentSectionIndex.value = index
    currentQuestionIndex.value = 0
  }
}

const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true

  await saveTraits()

  submitting.value = false

  if (!error.value) {
    router.push('/onboarding/preferences')
  }
}
</script>

<style scoped>
/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>