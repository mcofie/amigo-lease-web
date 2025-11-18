<!-- src/pages/onboarding/basics.vue -->
<template>
  <div
      class="min-h-screen w-full bg-gradient-to-b from-orange-100 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-lg">
      <div
          class="bg-white/90 border border-orange-100 shadow-[0_18px_40px_rgba(0,0,0,0.06)] rounded-3xl p-6 md:p-8 space-y-6">

        <!-- Step header -->
        <div class="flex items-center justify-between text-[11px] text-gray-500">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
            <span>📍</span>
            <span class="font-medium tracking-wide uppercase">Step 2 · Basics</span>
          </div>
          <span>2 of 4</span>
        </div>

        <!-- Title -->
        <div class="text-center space-y-2">
          <h1 class="text-2xl font-semibold text-gray-900">
            Tell us about your plans
          </h1>
          <p class="text-sm text-gray-500">
            This helps us match you with people and places that fit your life.
          </p>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="py-8 text-center text-xs text-gray-500">
          <div class="mx-auto mb-3 h-8 w-8 border-2 border-dashed border-gray-300 rounded-full animate-spin"/>
          Loading your details…
        </div>

        <!-- Form card -->
        <div v-else class="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 space-y-6">
          <div class="space-y-1">
            <p class="text-sm font-medium text-gray-900">Where and when?</p>
            <p class="text-xs text-gray-500">
              You can always update this later if your plans change.
            </p>
          </div>

          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- LOCATION -->
            <div class="space-y-3">
              <p class="text-xs font-semibold tracking-wide text-gray-500">
                LOCATION
              </p>

              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-700">
                  City <span class="text-red-500">*</span>
                </label>
                <input
                    v-model="form.city"
                    type="text"
                    required
                    autocomplete="address-level2"
                    class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="e.g. Accra"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-700">
                  Area / Neighbourhood
                </label>
                <input
                    v-model="form.area"
                    type="text"
                    autocomplete="address-line1"
                    class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="e.g. East Legon, Osu"
                />
              </div>
            </div>

            <!-- BUDGET -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold tracking-wide text-gray-500">
                  BUDGET (PER MONTH)
                </p>
                <p class="text-[11px] text-gray-400">
                  Optional, but very helpful for matches
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="block text-xs font-medium text-gray-700">
                    Min
                  </label>
                  <input
                      v-model.number="form.budget_min"
                      type="number"
                      min="0"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="e.g. 1500"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-medium text-gray-700">
                    Max
                  </label>
                  <input
                      v-model.number="form.budget_max"
                      type="number"
                      min="0"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="e.g. 2500"
                  />
                </div>
              </div>
            </div>

            <!-- TIMING -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold tracking-wide text-gray-500">
                  TIMING
                </p>
                <p class="text-[11px] text-gray-400">
                  Approximate dates are okay
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="block text-xs font-medium text-gray-700">
                    Move-in from
                  </label>
                  <input
                      v-model="form.move_in_from"
                      type="date"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-medium text-gray-700">
                    Move-in to
                  </label>
                  <input
                      v-model="form.move_in_to"
                      type="date"
                      class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="pt-1">
              <div class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                <span class="text-red-500 text-sm">⚠️</span>
                <p class="text-xs text-red-700">
                  {{ error }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                  type="submit"
                  class="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50 sm:flex-1"
                  :disabled="submitting"
              >
                {{ submitting ? 'Saving…' : 'Continue to quiz' }}
              </button>

              <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
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

import {ref, reactive, onMounted} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import {useProfile} from '~/composables/useProfile'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {profile, upsertProfile, fetchProfile, error} = useProfile()

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
    data: {user}
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