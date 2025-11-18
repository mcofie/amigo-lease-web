<!-- src/pages/auth.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md space-y-6">
      <!-- Title -->
      <div class="text-center space-y-1">
        <h1 class="text-2xl font-semibold">
          Welcome to Amigo Lease
        </h1>
        <p class="text-sm text-gray-500">
          Sign in or create an account to save your quiz, matches, and chats.
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
        <!-- Tabs -->
        <div class="flex rounded-lg bg-gray-100 p-1 text-xs">
          <button
              type="button"
              class="flex-1 px-3 py-1.5 rounded-md"
              :class="mode === 'signin'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-500'"
              @click="mode = 'signin'"
          >
            Sign in
          </button>
          <button
              type="button"
              class="flex-1 px-3 py-1.5 rounded-md"
              :class="mode === 'signup'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-500'"
              @click="mode = 'signup'"
          >
            Create account
          </button>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
                v-model="email"
                type="email"
                required
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <input
                v-model="password"
                type="password"
                required
                minlength="6"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="At least 6 characters"
            />
            <p class="mt-1 text-[11px] text-gray-400">
              For now we’re keeping it simple with email + password.
            </p>
          </div>

          <p v-if="errorMessage" class="text-xs text-red-500">
            {{ errorMessage }}
          </p>

          <p v-if="infoMessage" class="text-xs text-emerald-600">
            {{ infoMessage }}
          </p>

          <button
              type="submit"
              class="w-full text-sm px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
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
        Having trouble? You can always reset your password from the sign-in form later.
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
      const {data, error} = await $supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      if (error) throw error

      // If email confirmation is enabled, Supabase may require verification
      if (data?.user) {
        infoMessage.value = 'Account created. Redirecting…'
        await router.push('/onboarding/role')
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