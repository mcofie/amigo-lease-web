<template>
  <div
      class="min-h-screen w-full bg-gradient-to-b from-orange-100 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-3xl">
      <div
          class="bg-white/90 border border-orange-100 shadow-[0_18px_40px_rgba(0,0,0,0.06)] rounded-3xl p-6 md:p-8 space-y-6">
        <!-- Step header -->
        <div class="flex items-center justify-between text-[11px] text-gray-500">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
            <span>🎛️</span>
            <span class="font-medium tracking-wide uppercase">Step 3 · Preferences</span>
          </div>
          <span>3 of 4</span>
        </div>

        <!-- Title -->
        <div class="space-y-1">
          <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
            Tell us your dealbreakers
          </h1>
          <p class="text-sm text-gray-500">
            These settings help us avoid obvious mismatches and highlight people who fit your vibe better.
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="py-10 text-center text-xs text-gray-500">
          <div class="mx-auto mb-3 h-8 w-8 border-2 border-dashed border-gray-300 rounded-full animate-spin"/>
          Loading your preferences…
        </div>

        <!-- Form -->
        <form
            v-else
            class="space-y-6"
            @submit.prevent="handleSubmit"
        >
          <!-- Who you'd live with -->
          <section class="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <span>Who would you be happy living with?</span>
                  <span>🧑‍🤝‍🧑</span>
                </p>
                <p class="text-xs text-gray-500">
                  You can select more than one option.
                </p>
              </div>
            </div>

            <div class="grid sm:grid-cols-3 gap-3 text-xs">
              <label
                  class="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                <input
                    v-model="form.allow_male"
                    type="checkbox"
                    class="h-3.5 w-3.5"
                />
                <span class="font-medium text-gray-800">Men</span>
              </label>

              <label
                  class="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                <input
                    v-model="form.allow_female"
                    type="checkbox"
                    class="h-3.5 w-3.5"
                />
                <span class="font-medium text-gray-800">Women</span>
              </label>

              <label
                  class="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                <input
                    v-model="form.allow_other"
                    type="checkbox"
                    class="h-3.5 w-3.5"
                />
                <span class="font-medium text-gray-800">Non-binary / other</span>
              </label>
            </div>
          </section>

          <!-- Pets & smoking -->
          <section class="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <span>Pets & smoking</span>
                  <span>🐾🚭</span>
                </p>
                <p class="text-xs text-gray-500">
                  Mark the ones that really matter to you.
                </p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 text-xs">
              <!-- Pets -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-wide text-gray-500">
                  PETS
                </p>

                <label
                    class="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                      v-model="form.must_allow_pets"
                      :true-value="true"
                      :false-value="null"
                      type="checkbox"
                      class="mt-0.5 h-3.5 w-3.5"
                  />
                  <div>
                    <p class="font-medium text-gray-800">Place must allow pets</p>
                    <p class="text-[11px] text-gray-500">
                      We won’t show you homes that don’t allow pets.
                    </p>
                  </div>
                </label>

                <label
                    class="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                      v-model="form.must_be_pet_friendly"
                      :true-value="true"
                      :false-value="null"
                      type="checkbox"
                      class="mt-0.5 h-3.5 w-3.5"
                  />
                  <div>
                    <p class="font-medium text-gray-800">Roommate must be pet-friendly</p>
                    <p class="text-[11px] text-gray-500">
                      Helpful if you already have or plan to get a pet.
                    </p>
                  </div>
                </label>
              </div>

              <!-- Smoking -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-wide text-gray-500">
                  SMOKING
                </p>

                <label
                    class="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                      v-model="form.allow_smokers"
                      type="checkbox"
                      class="mt-0.5 h-3.5 w-3.5"
                  />
                  <div>
                    <p class="font-medium text-gray-800">I’m okay living with a smoker</p>
                    <p class="text-[11px] text-gray-500">
                      We’ll still try to pair you with compatible habits.
                    </p>
                  </div>
                </label>

                <label
                    class="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                      v-model="form.require_non_smoker"
                      type="checkbox"
                      class="mt-0.5 h-3.5 w-3.5"
                  />
                  <div>
                    <p class="font-medium text-gray-800">I strongly prefer non-smokers</p>
                    <p class="text-[11px] text-gray-500">
                      We’ll avoid matching you with smokers when possible.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </section>

          <!-- Home vibe & WFH -->
          <section class="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <span>Home vibe & work style</span>
                  <span>✨🏡</span>
                </p>
                <p class="text-xs text-gray-500">
                  This helps us prioritise people whose routines feel natural next to yours.
                </p>
              </div>
            </div>

            <!-- Home vibe chips -->
            <div class="space-y-2">
              <p class="text-[11px] font-semibold tracking-wide text-gray-500">
                PREFERRED HOME VIBE
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <button
                    v-for="option in homeVibeOptions"
                    :key="option.value"
                    type="button"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs"
                    :class="(form.preferred_home_vibe as any) === option.value
  ? 'border-gray-900 bg-gray-900 text-white'
  : 'border-gray-200 text-gray-700 hover:bg-gray-50'"
                    @click="setHomeVibe(option.value)"
                >
                  <span>{{ option.emoji }}</span>
                  <span>{{ option.label }}</span>
                </button>

                <button
                    type="button"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed text-xs text-gray-500 hover:bg-gray-50"
                    @click="setHomeVibe(null)"
                >
                  <span>❔</span>
                  <span>No strong preference</span>
                </button>
              </div>
            </div>

            <!-- WFH preferences -->
            <div class="grid md:grid-cols-2 gap-3 text-xs pt-2">
              <label
                  class="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                <input
                    v-model="form.prefers_works_from_home"
                    :true-value="true"
                    :false-value="null"
                    type="checkbox"
                    class="mt-0.5 h-3.5 w-3.5"
                />
                <div>
                  <p class="font-medium text-gray-800">Prefer someone who works from home</p>
                  <p class="text-[11px] text-gray-500">
                    If you’re often at home too, this can help with similar routines.
                  </p>
                </div>
              </label>

              <label
                  class="flex items-start gap-2 rounded-xl border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50">
                <input
                    v-model="form.avoids_works_from_home"
                    :true-value="true"
                    :false-value="null"
                    type="checkbox"
                    class="mt-0.5 h-3.5 w-3.5"
                />
                <div>
                  <p class="font-medium text-gray-800">Prefer someone who’s out most of the day</p>
                  <p class="text-[11px] text-gray-500">
                    Helpful if you like having the place quiet to yourself.
                  </p>
                </div>
              </label>
            </div>
          </section>

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
                :disabled="saving"
            >
              {{ saving ? 'Saving…' : 'Save & continue' }}
            </button>

            <button
                type="button"
                class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
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

import {onMounted, ref, computed} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import {usePreferences} from '~/composables/usePreferences'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {form, loading, error, loadPreferences, savePreferences} = usePreferences()
const saving = ref(false)

const homeVibeOptions = [
  {value: 'chill', label: 'Chill & calm', emoji: '😌'},
  {value: 'lively', label: 'Lively & social', emoji: '🎉'},
  {value: 'cozy', label: 'Cozy & warm', emoji: '🕯️'},
  {value: 'minimal', label: 'Minimal & tidy', emoji: '📦'}
] as const

type HomeVibeValue = (typeof homeVibeOptions)[number]['value'] | null

const setHomeVibe = (v: HomeVibeValue) => {
  // form.preferred_home_vibe comes from usePreferences and can be null | 'chill' | ...
  // just assign directly
  // @ts-expect-error narrow type
  form.preferred_home_vibe = v
}

onMounted(async () => {
  const {
    data: {user}
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
    // next step after preferences – e.g. summary
    router.push('/onboarding/summary')
  }
}

const goBack = () => {
  router.push('/onboarding/quiz')
}
</script>