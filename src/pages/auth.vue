<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md space-y-8">

      <!-- Header -->
      <div class="text-center space-y-3 relative z-10">
        <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
          <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
            Welcome to Amigo Lease
          </span>
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in to your vibe
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
          Save your quiz results, matches, and chats so you can pick up where you left off.
        </p>
      </div>

      <!-- Auth Card -->
      <div
          class="bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <!-- Decorative blob -->
        <div
            class="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none dark:bg-slate-800/50"></div>

        <!-- Tabs -->
        <div class="relative z-10 p-1 bg-slate-100 rounded-xl flex text-sm font-semibold dark:bg-slate-800">
          <button
              type="button"
              class="flex-1 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              :class="mode === 'signin' ? 'bg-white text-slate-900 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
              @click="mode = 'signin'"
          >
            Sign in
          </button>
          <button
              type="button"
              class="flex-1 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              :class="mode === 'signup' ? 'bg-white text-slate-900 shadow-sm dark:bg-gray-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
              @click="mode = 'signup'"
          >
            Create account
          </button>
        </div>

        <form class="space-y-5 relative z-10" @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="space-y-1.5">
            <label
                class="block text-xs font-bold text-slate-500 uppercase tracking-wide ml-1 dark:text-slate-400">Email</label>
            <input
                v-model="email"
                type="email"
                required
                class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow"
                placeholder="you@example.com"
            />
          </div>

          <!-- Password -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide ml-1 dark:text-slate-400">Password</label>
              <button type="button" v-if="mode === 'signin'"
                      class="text-[10px] font-semibold text-slate-400 hover:text-slate-900 transition-colors">Forgot?
              </button>
            </div>
            <input
                v-model="password"
                type="password"
                required
                minlength="6"
                class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-shadow"
                placeholder="At least 6 characters"
            />
          </div>

          <!-- Messages -->
          <div v-if="errorMessage || infoMessage" class="rounded-xl p-3 text-xs font-medium text-center transition-all"
               :class="errorMessage ? 'bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400'">
            {{ errorMessage || infoMessage }}
          </div>

          <!-- Submit -->
          <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              :disabled="loading"
          >
            <span v-if="loading"
                  class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>{{ submitLabel }}</span>
          </button>
        </form>

        <div class="relative z-10 text-center">
          <p class="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed dark:text-slate-500">
            By continuing, you agree to keep things respectful and honest on Amigo Lease.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useRouter, useRoute, useNuxtApp} from '#imports'

const router = useRouter()
const route = useRoute()
const {$supabase} = useNuxtApp()

type Mode = 'signin' | 'signup'

const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const infoMessage = ref<string | null>(null)

useSeoMeta({
  title: 'Login or Sign Up - Amigo Lease',
  description: 'Access your Amigo Lease account to find roommates and listings.',
})

const submitLabel = computed(() =>
    mode.value === 'signin' ? 'Sign In' : 'Create Account'
)

const redirectTo = computed(() => {
  const q = route.query.redirect as string | undefined
  return q || '/onboarding/role'
})

const handleSubmit = async () => {
  if (loading.value) return
  loading.value = true
  errorMessage.value = null
  infoMessage.value = null

  try {
    if (mode.value === 'signup') {
      const {data, error} = await $supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      if (error) throw error

      if (data?.user) {
        infoMessage.value = 'Account created. Redirecting…'
        // Small delay for UX feedback
        setTimeout(async () => {
          await router.push('/onboarding/role')
        }, 800)
      } else {
        infoMessage.value = 'Check your email to confirm your account.'
      }
    } else {
      const {data, error} = await $supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (error) throw error

      if (data?.user) {
        infoMessage.value = 'Signed in. Redirecting…'
        
        // Check for profile completeness
        const userId = data.user.id
        
        const { data: traits } = await $supabase
          .schema('amigo')
          .from('roommate_traits')
          .select('profile_id')
          .eq('profile_id', userId)
          .maybeSingle()
          
        const { data: prefs } = await $supabase
          .schema('amigo')
          .from('roommate_preferences')
          .select('profile_id')
          .eq('profile_id', userId)
          .maybeSingle()
          
        const target = (traits && prefs) ? '/matches' : redirectTo.value

        setTimeout(async () => {
          await router.push(target)
        }, 500)
      }
    }
  } catch (err: any) {
    console.error(err)
    errorMessage.value = err?.message ?? 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>