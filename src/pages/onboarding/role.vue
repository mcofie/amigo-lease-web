<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-10"
  >
    <div class="w-full max-w-lg mx-auto">
      <div
          class="bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-8 space-y-8 relative overflow-hidden"
      >
        <!-- Subtle decorative blob -->
        <div
            class="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none dark:bg-orange-900/10"
        ></div>

        <!-- Title -->
        <div class="text-center space-y-3 relative z-10">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[11px] font-bold text-orange-700 border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
          >
            <span>✨</span>
            <span class="tracking-wide uppercase">Step 1 · Your role</span>
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let’s get you started
          </h1>
          <p class="text-slate-500 dark:text-slate-400">
            What best describes your situation right now?
          </p>
        </div>

        <!-- While checking session -->
        <div v-if="checkingSession" class="py-12 flex flex-col items-center justify-center text-slate-500 space-y-4">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"></div>
          <p class="text-sm font-medium animate-pulse">Checking your session…</p>
        </div>

        <!-- Selectable Cards -->
        <div v-else class="space-y-4 relative z-10">
          <!-- SEEKER -->
          <button
              type="button"
              class="w-full group relative flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-orange-200 hover:shadow-lg transition-all duration-200 text-left dark:bg-gray-800 dark:border-slate-700 dark:hover:border-orange-500/50 dark:hover:bg-gray-800"
              :disabled="loading"
              @click="selectRole('seeker')"
          >
            <div class="shrink-0 h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 dark:bg-orange-900/20">
              🧳
            </div>
            <div class="space-y-1">
              <p class="font-bold text-slate-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                I need a place / roommate
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We’ll help you find a room and a roommate you actually vibe with.
              </p>
            </div>
            <!-- Arrow icon visible on hover -->
            <div class="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orange-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <!-- HOST -->
          <button
              type="button"
              class="w-full group relative flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-emerald-200 hover:shadow-lg transition-all duration-200 text-left dark:bg-gray-800 dark:border-slate-700 dark:hover:border-emerald-500/50 dark:hover:bg-gray-800"
              :disabled="loading"
              @click="selectRole('host')"
          >
            <div class="shrink-0 h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 dark:bg-emerald-900/20">
              🏡
            </div>
            <div class="space-y-1">
              <p class="font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                I have a place, need a roommate
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                List your place and find someone who matches your lifestyle.
              </p>
            </div>
            <div class="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <!-- BOTH -->
          <button
              type="button"
              class="w-full group relative flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-purple-200 hover:shadow-lg transition-all duration-200 text-left dark:bg-gray-800 dark:border-slate-700 dark:hover:border-purple-500/50 dark:hover:bg-gray-800"
              :disabled="loading"
              @click="selectRole('both')"
          >
            <div class="shrink-0 h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 dark:bg-purple-900/20">
              🔀
            </div>
            <div class="space-y-1">
              <p class="font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                I’m open to both
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                You’re flexible — we’ll show you the best of both worlds.
              </p>
            </div>
            <div class="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-purple-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <!-- Status / Error -->
        <div v-if="error" class="text-center text-sm font-medium text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400">
          {{ error }}
        </div>

        <!-- Back / Optional -->
        <div v-if="!checkingSession" class="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
              type="button"
              class="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              :disabled="loading"
              @click="goBack"
          >
            ← Back
          </button>

          <p class="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
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
import { ref, onMounted } from 'vue'
import type { ProfileRole } from '~/types/amigo'
import { useRouter, useNuxtApp } from '#imports'
import { useProfile } from '~/composables/useProfile'

const router = useRouter()
const { $supabase } = useNuxtApp()
const { setRole, error } = useProfile()

const loading = ref(false)
const checkingSession = ref(true)

// Ensure we have an auth session before letting user continue
onMounted(async () => {
  const {
    data: { user }
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