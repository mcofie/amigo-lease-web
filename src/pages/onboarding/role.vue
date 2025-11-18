<!-- src/pages/onboarding/role.vue -->
<template>
  <div
      class="min-h-screen bg-gradient-to-b from-orange-100 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md">
      <div
          class="bg-white/90 border border-orange-100 shadow-[0_18px_40px_rgba(0,0,0,0.06)] rounded-3xl p-6 md:p-8 space-y-6">

        <!-- Title -->
        <div class="text-center space-y-2">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[11px] text-orange-700 border border-orange-100">
            <span>✨</span>
            <span class="font-medium tracking-wide uppercase">Step 1 · Your role</span>
          </div>
          <h1 class="text-2xl font-semibold mt-1">Let’s get you started</h1>
          <p class="text-sm text-gray-500">
            What best describes your situation right now?
          </p>
        </div>

        <!-- While checking session -->
        <div v-if="checkingSession" class="py-8 text-center text-xs text-gray-500">
          <div class="mx-auto mb-3 h-8 w-8 border-2 border-dashed border-gray-300 rounded-full animate-spin"/>
          Checking your session…
        </div>

        <!-- Selectable Cards -->
        <div v-else class="space-y-4">
          <!-- SEEKER -->
          <UCard
              class="cursor-pointer transition hover:shadow-md hover:-translate-y-0.5"
              :ui="{ base: 'rounded-2xl border border-gray-200 p-4' }"
              :disabled="loading"
              @click="selectRole('seeker')"
          >
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                🧳
              </div>
              <div class="space-y-1">
                <p class="font-medium text-gray-900">I need a place / roommate</p>
                <p class="text-xs text-gray-500">
                  We’ll help you find a room and a roommate you actually vibe with.
                </p>
              </div>
            </div>
          </UCard>

          <!-- HOST -->
          <UCard
              class="cursor-pointer transition hover:shadow-md hover:-translate-y-0.5"
              :ui="{ base: 'rounded-2xl border border-gray-200 p-4' }"
              :disabled="loading"
              @click="selectRole('host')"
          >
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-lg">
                🏡
              </div>
              <div class="space-y-1">
                <p class="font-medium text-gray-900">I have a place, need a roommate</p>
                <p class="text-xs text-gray-500">
                  List your place and find someone who matches your lifestyle.
                </p>
              </div>
            </div>
          </UCard>

          <!-- BOTH -->
          <UCard
              class="cursor-pointer transition hover:shadow-md hover:-translate-y-0.5"
              :ui="{ base: 'rounded-2xl border border-gray-200 p-4' }"
              :disabled="loading"
              @click="selectRole('both')"
          >
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">
                🔀
              </div>
              <div class="space-y-1">
                <p class="font-medium text-gray-900">I’m open to both</p>
                <p class="text-xs text-gray-500">
                  You’re flexible — we’ll show you the best of both worlds.
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Status / Error -->
        <div v-if="error" class="text-center text-xs text-red-500">
          {{ error }}
        </div>

        <!-- Back / Optional -->
        <div v-if="!checkingSession" class="flex justify-between items-center pt-2 text-[11px]">
          <UButton
              variant="link"
              color="gray"
              size="xs"
              :disabled="loading"
              @click="goBack"
          >
            ← Back
          </UButton>

          <p class="text-gray-400">
            Next: basics & budget
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

import type {ProfileRole} from '~/types/amigo'
import {useRouter, useNuxtApp} from '#imports'
import {useProfile} from '~/composables/useProfile'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {setRole, error} = useProfile()

const loading = ref(false)
const checkingSession = ref(true)

// Ensure we have an auth session before letting user continue
onMounted(async () => {
  const {
    data: {user}
  } = await $supabase.auth.getUser()

  if (!user) {
    // No session: send to auth page
    router.push('/auth')
    return
  }

  checkingSession.value = false
})

const selectRole = async (role: ProfileRole) => {
  if (loading.value || checkingSession.value) return

  loading.value = true
  await setRole(role)
  loading.value = false

  if (!error.value) {
    router.push('/onboarding/basics')
  }
}

const goBack = () => {
  router.push('/')
}
</script>