<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-10"
  >
    <div class="w-full max-w-2xl mx-auto">
      <div
          class="bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-8 space-y-8 relative overflow-hidden"
      >
        <!-- Decorative blob -->
        <div
            class="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none dark:bg-orange-900/10"
        ></div>

        <!-- Header -->
        <div class="space-y-2 relative z-10">
          <div class="flex items-center justify-between">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[11px] font-bold text-orange-700 border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
            >
              <span>🎛️</span>
              <span class="tracking-wide uppercase">Step 3 · Preferences</span>
            </div>
            <span class="text-xs font-medium text-slate-400 dark:text-slate-500">3 of 4</span>
          </div>

          <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Tell us your dealbreakers
          </h1>
          <p class="text-slate-500 dark:text-slate-400">
            These settings help us avoid mismatches and highlight people who fit your vibe.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-12 flex flex-col items-center justify-center text-slate-500 space-y-4">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"></div>
          <p class="text-sm font-medium animate-pulse">Loading preferences...</p>
        </div>

        <!-- Main Form -->
        <form v-else class="space-y-8 relative z-10" @submit.prevent="handleSubmit">

          <!-- SECTION 1: WHO TO LIVE WITH -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">1</span>
              <h3>Who would you live with?</h3>
            </div>

            <div class="grid sm:grid-cols-3 gap-3 pl-8">
              <label
                  class="relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
                  :class="form.allow_male
                  ? 'border-slate-900 bg-slate-50 dark:border-white dark:bg-white/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:bg-gray-800 dark:border-slate-700'"
              >
                <input v-model="form.allow_male" type="checkbox" class="peer sr-only" />
                <div class="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center peer-checked:bg-slate-900 peer-checked:border-slate-900 transition-colors dark:border-slate-500 dark:peer-checked:bg-white dark:peer-checked:border-white">
                  <svg v-if="form.allow_male" class="w-3 h-3 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span class="font-semibold text-sm text-slate-700 dark:text-slate-200">Men</span>
              </label>

              <label
                  class="relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
                  :class="form.allow_female
                  ? 'border-slate-900 bg-slate-50 dark:border-white dark:bg-white/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:bg-gray-800 dark:border-slate-700'"
              >
                <input v-model="form.allow_female" type="checkbox" class="peer sr-only" />
                <div class="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center peer-checked:bg-slate-900 peer-checked:border-slate-900 transition-colors dark:border-slate-500 dark:peer-checked:bg-white dark:peer-checked:border-white">
                  <svg v-if="form.allow_female" class="w-3 h-3 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span class="font-semibold text-sm text-slate-700 dark:text-slate-200">Women</span>
              </label>

              <label
                  class="relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
                  :class="form.allow_other
                  ? 'border-slate-900 bg-slate-50 dark:border-white dark:bg-white/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:bg-gray-800 dark:border-slate-700'"
              >
                <input v-model="form.allow_other" type="checkbox" class="peer sr-only" />
                <div class="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center peer-checked:bg-slate-900 peer-checked:border-slate-900 transition-colors dark:border-slate-500 dark:peer-checked:bg-white dark:peer-checked:border-white">
                  <svg v-if="form.allow_other" class="w-3 h-3 text-white dark:text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span class="font-semibold text-sm text-slate-700 dark:text-slate-200">Other</span>
              </label>
            </div>
          </div>

          <!-- SECTION 2: PETS & SMOKING -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">2</span>
              <h3>Important Rules</h3>
            </div>

            <div class="grid md:grid-cols-2 gap-4 pl-8">
              <!-- Pets Column -->
              <div class="space-y-3">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pets</span>

                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
                  <input v-model="form.must_allow_pets" :true-value="true" :false-value="null" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  <div>
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Must allow pets</p>
                    <p class="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Only show pet-friendly homes</p>
                  </div>
                </label>

                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
                  <input v-model="form.must_be_pet_friendly" :true-value="true" :false-value="null" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  <div>
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Must like pets</p>
                    <p class="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Roommate is pet-friendly</p>
                  </div>
                </label>
              </div>

              <!-- Smoking Column -->
              <div class="space-y-3">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Smoking</span>

                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
                  <input v-model="form.allow_smokers" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  <div>
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Okay with smokers</p>
                    <p class="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Living with a smoker is fine</p>
                  </div>
                </label>

                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
                  <input v-model="form.require_non_smoker" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  <div>
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Must be non-smoker</p>
                    <p class="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Avoid matches who smoke</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- SECTION 3: VIBE & WFH -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">3</span>
              <h3>Home Vibe & Work</h3>
            </div>

            <div class="pl-8 space-y-4">
              <!-- Home Vibe Chips -->
              <div class="flex flex-wrap gap-2">
                <button
                    v-for="option in homeVibeOptions"
                    :key="option.value"
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200"
                    :class="(form.preferred_home_vibe as any) === option.value
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md dark:border-white dark:bg-white dark:text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750'"
                    @click="setHomeVibe(option.value)"
                >
                  <span class="text-base">{{ option.emoji }}</span>
                  <span>{{ option.label }}</span>
                </button>

                <button
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-slate-300 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors dark:border-slate-700 dark:text-slate-500 dark:hover:bg-gray-800 dark:hover:text-slate-300"
                    @click="setHomeVibe(null)"
                >
                  No strong preference
                </button>
              </div>

              <!-- WFH Toggles -->
              <div class="grid sm:grid-cols-2 gap-3 pt-2">
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
                  <input v-model="form.prefers_works_from_home" :true-value="true" :false-value="null" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  <div>
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Prefers WFH roommate</p>
                    <p class="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Good for shared routines</p>
                  </div>
                </label>

                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-gray-750">
                  <input v-model="form.avoids_works_from_home" :true-value="true" :false-value="null" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  <div>
                    <p class="text-sm font-bold text-slate-800 dark:text-slate-200">Prefers out-of-house</p>
                    <p class="text-xs text-slate-500 mt-0.5 dark:text-slate-400">Enjoys quiet days alone</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium text-center dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400">
            ⚠️ {{ error }}
          </div>

          <!-- Navigation -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
                type="submit"
                class="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed sm:flex-1 sm:order-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                :disabled="saving"
            >
               <span v-if="saving" class="flex items-center gap-2">
                  <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Saving...
                </span>
              <span v-else>Save & Continue →</span>
            </button>

            <button
                type="button"
                class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 sm:w-auto sm:order-1 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
                :disabled="saving"
                @click="goBack"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

import { onMounted, ref } from 'vue'
import { useRouter, useNuxtApp } from '#imports'
import { usePreferences } from '~/composables/usePreferences'

useSeoMeta({
  title: 'Preferences - Amigo Lease Onboarding',
  description: 'Set your preferences for your ideal roommate or place.',
})

const router = useRouter()
const { $supabase } = useNuxtApp()
const { form, loading, error, loadPreferences, savePreferences } = usePreferences()
const saving = ref(false)

const homeVibeOptions = [
  { value: 'chill', label: 'Chill & Calm', emoji: '😌' },
  { value: 'lively', label: 'Lively & Social', emoji: '🎉' },
  { value: 'cozy', label: 'Cozy & Warm', emoji: '🕯️' },
  { value: 'minimal', label: 'Minimal & Tidy', emoji: '📦' }
] as const

type HomeVibeValue = (typeof homeVibeOptions)[number]['value'] | null

const setHomeVibe = (v: HomeVibeValue) => {
  // @ts-expect-error narrow type
  form.preferred_home_vibe = v
}

onMounted(async () => {
  const {
    data: { user }
  } = await $supabase.auth.getUser()

  if (!user) {
    router.push('/auth')
    return
  }

  await loadPreferences()
})

const handleSubmit = async () => {
  if (saving.value) return
  saving.value = true

  await savePreferences()

  saving.value = false

  if (!error.value) {
    router.push('/onboarding/summary')
  }
}

const goBack = () => {
  router.push('/onboarding/quiz')
}
</script>