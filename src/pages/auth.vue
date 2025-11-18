<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center px-4 py-10">
      <UContainer class="max-w-sm w-full">
        <UCard>
          <template #header>
            <div class="space-y-1">
              <h1 class="text-lg font-semibold">Sign in to Amigo Lease</h1>
              <p class="text-xs text-gray-500">
                Use your email to continue and we’ll keep you signed in.
              </p>
            </div>
          </template>

          <form class="space-y-4" @submit.prevent="handleSignIn">
            <UFormGroup label="Email" name="email">
              <UInput
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  required
              />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required
              />
            </UFormGroup>

            <UButton
                type="submit"
                color="primary"
                :loading="loading"
                block
            >
              Continue
            </UButton>

            <p v-if="error" class="text-xs text-red-500 text-center mt-2">
              {{ error }}
            </p>
          </form>
        </UCard>
      </UContainer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
const router = useRouter()
const {$supabase} = useNuxtApp()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const handleSignIn = async () => {
  if (loading.value) return
  loading.value = true
  error.value = null

  // Simple: try sign-in, if user doesn’t exist, sign them up
  const {data, error: signInError} = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (signInError) {
    // Try sign-up then sign-in
    const {error: signUpError} = await $supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (signUpError) {
      error.value = signUpError.message
      loading.value = false
      return
    }

    // sign in again after signup
    const {error: secondSignInError} = await $supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (secondSignInError) {
      error.value = secondSignInError.message
      loading.value = false
      return
    }
  }

  loading.value = false
  router.push('/onboarding/role')
}
</script>