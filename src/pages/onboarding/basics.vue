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
          <h1 class="text-2xl font-semibold">
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

        <!-- Main card -->
        <UCard v-else :ui="{ base: 'rounded-2xl border border-gray-200' }">
          <template #header>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-900">Where and when?</p>
              <p class="text-xs text-gray-500">
                You can always update this later if your plans change.
              </p>
            </div>
          </template>

          <form class="space-y-5" @submit.prevent="handleSubmit">
            <!-- Location -->
            <div class="space-y-3">
              <p class="text-xs font-medium tracking-wide text-gray-500">
                LOCATION
              </p>

              <UFormGroup label="City" name="city" required>
                <UInput
                    v-model="form.city"
                    placeholder="e.g. Accra"
                    autocomplete="address-level2"
                />
              </UFormGroup>

              <UFormGroup label="Area / Neighbourhood" name="area">
                <UInput
                    v-model="form.area"
                    placeholder="e.g. East Legon, Osu"
                    autocomplete="address-line1"
                />
              </UFormGroup>
            </div>

            <!-- Budget -->
            <div class="space-y-3 pt-1">
              <div class="flex items-center justify-between">
                <p class="text-xs font-medium tracking-wide text-gray-500">
                  BUDGET (PER MONTH)
                </p>
                <p class="text-[11px] text-gray-400">
                  Optional, but very helpful for matches
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <UFormGroup label="Min" name="budget_min">
                  <UInput
                      v-model.number="form.budget_min"
                      type="number"
                      min="0"
                      placeholder="e.g. 1500"
                  />
                </UFormGroup>

                <UFormGroup label="Max" name="budget_max">
                  <UInput
                      v-model.number="form.budget_max"
                      type="number"
                      min="0"
                      placeholder="e.g. 2500"
                  />
                </UFormGroup>
              </div>
            </div>

            <!-- Timing -->
            <div class="space-y-3 pt-1">
              <div class="flex items-center justify-between">
                <p class="text-xs font-medium tracking-wide text-gray-500">
                  TIMING
                </p>
                <p class="text-[11px] text-gray-400">
                  Approximate dates are okay
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <UFormGroup label="Move-in from" name="move_in_from">
                  <UInput
                      v-model="form.move_in_from"
                      type="date"
                  />
                </UFormGroup>

                <UFormGroup label="Move-in to" name="move_in_to">
                  <UInput
                      v-model="form.move_in_to"
                      type="date"
                  />
                </UFormGroup>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="pt-1">
              <UAlert
                  color="red"
                  variant="soft"
                  icon="i-heroicons-exclamation-circle"
                  class="text-xs"
              >
                {{ error }}
              </UAlert>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <UButton
                  type="submit"
                  color="primary"
                  :loading="submitting"
                  class="sm:flex-1"
              >
                {{ submitting ? 'Saving…' : 'Continue to quiz' }}
              </UButton>

              <UButton
                  type="button"
                  variant="ghost"
                  color="gray"
                  :disabled="submitting"
                  class="sm:w-auto"
                  @click="goBack"
              >
                Back
              </UButton>
            </div>
          </form>
        </UCard>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

import {ref, reactive, onMounted} from 'vue'
import {useRouter} from '#imports'
import {useNuxtApp} from '#app'
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