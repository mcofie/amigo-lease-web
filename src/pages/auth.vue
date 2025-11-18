<!-- src/pages/auth.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md space-y-6">
      <!-- Logo / title -->
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Welcome to Amigo Lease</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
          Sign in to your vibe
        </h1>
        <p class="text-sm text-gray-500">
          Save your quiz, matches, and chats so you can pick up where you left off.
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white/95 border border-orange-100 rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.06)] p-5 md:p-7 space-y-5">
        <!-- Tabs -->
        <div class="flex rounded-full bg-gray-100 p-1 text-xs">
          <button
              type="button"
              class="flex-1 px-3 py-1.5 rounded-full transition"
              :class="mode === 'signin'
              ? 'bg-gray-900 text-white shadow'
              : 'text-gray-500 hover:text-gray-800'"
              @click="mode = 'signin'"
          >
            Sign in
          </button>
          <button
              type="button"
              class="flex-1 px-3 py-1.5 rounded-full transition"
              :class="mode === 'signup'
              ? 'bg-gray-900 text-white shadow'
              : 'text-gray-500 hover:text-gray-800'"
              @click="mode = 'signup'"
          >
            Create account
          </button>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-gray-800">Email</label>
            <input
                v-model="email"
                type="email"
                required
                class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                placeholder="you@example.com"
            />
          </div>

          <!-- Password -->
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-gray-800">Password</label>
            <input
                v-model="password"
                type="password"
                required
                minlength="6"
                class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                placeholder="At least 6 characters"
            />
            <p class="text-[11px] text-gray-400">
              For now we’re keeping it simple with email + password.
            </p>
          </div>

          <!-- Messages -->
          <div class="min-h-[1.25rem] space-y-1">
            <p v-if="errorMessage" class="text-xs text-red-500">
              {{ errorMessage }}
            </p>
            <p v-if="infoMessage" class="text-xs text-emerald-600">
              {{ infoMessage }}
            </p>
          </div>

          <!-- Submit -->
          <button
              type="submit"
              class="w-full inline-flex items-center justify-center text-sm px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black disabled:opacity-60 shadow-sm"
              :disabled="loading"
          >
            {{ loading ? (mode === 'signin' ? 'Signing in…' : 'Creating account…') : submitLabel }}
          </button>
        </form>

        <p class="text-[11px] text-gray-400 text-center">
          By continuing you agree to keep things respectful and honest on Amigo Lease.
        </p>
      </div>

      <div class="text-center text-[11px] text-gray-400">
        Having trouble? You’ll be able to reset your password from the sign-in form later.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute, useNuxtApp } from '#imports'

const router = useRouter()
const route = useRoute()
const { $supabase } = useNuxtApp()

type Mode = 'signin' | 'signup'

const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const infoMessage = ref<string | null>(null)

const submitLabel = computed(() =>
    mode.value === 'signin' ? 'Sign in' : 'Create account'
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
      const { data, error } = await $supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      if (error) throw error

      if (data?.user) {
        infoMessage.value = 'Account created. Redirecting…'
        await router.push('/onboarding/role')
      } else {
        infoMessage.value = 'Check your email to confirm your account.'
      }
    } else {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (error) throw error

      if (data?.user) {
        infoMessage.value = 'Signed in. Redirecting…'
        await router.push(redirectTo.value)
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