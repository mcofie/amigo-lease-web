<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-10"
  >
    <div class="w-full max-w-lg mx-auto">
      <div
          class="bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-8 space-y-8 relative overflow-hidden"
      >
        <!-- Decorative background blob -->
        <div
            class="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none dark:bg-orange-900/10"
        ></div>

        <!-- Header -->
        <div class="space-y-2 relative z-10">
          <div class="flex items-center justify-between">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[11px] font-bold text-orange-700 border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
            >
              <span>📍</span>
              <span class="tracking-wide uppercase">Step 2 · Basics</span>
            </div>
            <span class="text-xs font-medium text-slate-400 dark:text-slate-500">2 of 4</span>
          </div>

          <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Tell us about your plans
          </h1>
          <p class="text-slate-500 dark:text-slate-400">
            This helps us match you with people and places that fit your life.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-12 flex flex-col items-center justify-center text-slate-500 space-y-4">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"></div>
          <p class="text-sm font-medium animate-pulse">Loading your details…</p>
        </div>

        <!-- Main Form -->
        <div v-else class="relative z-10">
          <form class="space-y-8" @submit.prevent="handleSubmit">

            <!-- SECTION 1: LOCATION -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">1</span>
                <h3>Where are you looking?</h3>
              </div>

              <div class="space-y-4 pl-8">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                    City <span class="text-orange-500">*</span>
                  </label>
                  <input
                      v-model="form.city"
                      type="text"
                      required
                      autocomplete="address-level2"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="e.g. Accra"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                    Area / Neighbourhood
                  </label>
                  <input
                      v-model="form.area"
                      type="text"
                      autocomplete="address-line1"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="e.g. East Legon, Osu"
                  />
                </div>
              </div>
            </div>

            <!-- SECTION 2: BUDGET -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">2</span>
                  <h3>Monthly Budget</h3>
                </div>
                <span class="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 dark:bg-slate-800 dark:border-slate-700">Optional</span>
              </div>

              <div class="grid grid-cols-2 gap-4 pl-8">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">Min</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₵</span>
                    <input
                        v-model.number="form.budget_min"
                        type="number"
                        min="0"
                        class="w-full rounded-xl bg-slate-50 border-0 pl-7 pr-3 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow"
                        placeholder="0"
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">Max</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₵</span>
                    <input
                        v-model.number="form.budget_max"
                        type="number"
                        min="0"
                        class="w-full rounded-xl bg-slate-50 border-0 pl-7 pr-3 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow"
                        placeholder="2000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 3: TIMING -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300">3</span>
                  <h3>Move-in Window</h3>
                </div>
                <span class="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 dark:bg-slate-800 dark:border-slate-700">Approximate</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">From</label>
                  <input
                      v-model="form.move_in_from"
                      type="date"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow cursor-pointer"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">To</label>
                  <input
                      v-model="form.move_in_to"
                      type="date"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow cursor-pointer"
                  />
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
                  :disabled="submitting"
              >
                <span v-if="submitting" class="flex items-center gap-2">
                  <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Saving...
                </span>
                <span v-else>Continue to Quiz →</span>
              </button>

              <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 sm:w-auto sm:order-1 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
                  :disabled="submitting"
                  @click="goBack"
              >
                Back
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

import { ref, reactive, onMounted } from 'vue'
import { useRouter, useNuxtApp } from '#imports'
import { useProfile } from '~/composables/useProfile'

useSeoMeta({
  title: 'Basic Details - Amigo Lease Onboarding',
  description: 'Tell us a bit about yourself.',
})

const router = useRouter()
const { $supabase } = useNuxtApp()
const { profile, upsertProfile, fetchProfile, error } = useProfile()

const loading = ref(true)
const submitting = ref(false)

const form = reactive({
  city: '',
  area: '',
  budget_min: null as number | null,
  budget_max: null as number | null,
  move_in_from: '',
  move_in_to: ''
})

onMounted(async () => {
  // Ensure user is authenticated, otherwise send to auth
  const {
    data: { user }
  } = await $supabase.auth.getUser()

  if (!user) {
    router.push('/auth')
    return
  }

  await fetchProfile()

  if (profile.value) {
    form.city = profile.value.city ?? ''
    form.area = profile.value.area ?? ''
    form.budget_min = profile.value.budget_min
    form.budget_max = profile.value.budget_max
    form.move_in_from = profile.value.move_in_from ?? ''
    form.move_in_to = profile.value.move_in_to ?? ''
  }

  loading.value = false
})

const handleSubmit = async () => {
  if (submitting.value || loading.value) return
  submitting.value = true

  await upsertProfile({
    city: form.city || null,
    area: form.area || null,
    budget_min: form.budget_min,
    budget_max: form.budget_max,
    move_in_from: form.move_in_from || null,
    move_in_to: form.move_in_to || null
  })

  submitting.value = false

  if (!error.value) {
    router.push('/onboarding/quiz')
  }
}

const goBack = () => {
  router.push('/onboarding/role')
}
</script>