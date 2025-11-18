<!-- src/pages/onboarding/role.vue -->
<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center px-4 py-10">
      <UContainer class="max-w-md space-y-6">

        <!-- Title -->
        <div class="text-center space-y-2">
          <h1 class="text-2xl font-semibold">Let’s get you started</h1>
          <p class="text-sm text-gray-500">
            What best describes your situation?
          </p>
        </div>

        <!-- While checking session -->
        <div v-if="checkingSession" class="py-8 text-center text-xs text-gray-500">
          Checking your session...
        </div>

        <!-- Selectable Cards -->
        <div v-else class="space-y-4">
          <!-- SEEKER -->
          <UCard
              class="cursor-pointer transition hover:shadow-md"
              :ui="{ base: 'rounded-xl border border-gray-200 p-4' }"
              :disabled="loading"
              @click="selectRole('seeker')"
          >
            <div class="space-y-1">
              <p class="font-medium">I need a place / roommate</p>
              <p class="text-xs text-gray-500">
                We’ll help you find a room and a roommate you actually vibe with.
              </p>
            </div>
          </UCard>

          <!-- HOST -->
          <UCard
              class="cursor-pointer transition hover:shadow-md"
              :ui="{ base: 'rounded-xl border border-gray-200 p-4' }"
              :disabled="loading"
              @click="selectRole('host')"
          >
            <div class="space-y-1">
              <p class="font-medium">I have a place, need a roommate</p>
              <p class="text-xs text-gray-500">
                List your place and find someone who matches your lifestyle.
              </p>
            </div>
          </UCard>

          <!-- BOTH -->
          <UCard
              class="cursor-pointer transition hover:shadow-md"
              :ui="{ base: 'rounded-xl border border-gray-200 p-4' }"
              :disabled="loading"
              @click="selectRole('both')"
          >
            <div class="space-y-1">
              <p class="font-medium">I’m open to both</p>
              <p class="text-xs text-gray-500">
                You’re flexible — we’ll show you the best of both worlds.
              </p>
            </div>
          </UCard>
        </div>

        <!-- Status / Error -->
        <div v-if="error" class="text-center text-xs text-red-500">
          {{ error }}
        </div>

        <!-- Back / Optional -->
        <div v-if="!checkingSession" class="flex justify-center pt-2">
          <UButton
              variant="link"
              color="gray"
              size="xs"
              :disabled="loading"
              @click="goBack"
          >
            Go back
          </UButton>
        </div>

      </UContainer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import type {ProfileRole} from '~/types/amigo'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {setRole, error} = useProfile()

const loading = ref(false)
const checkingSession = ref(true)

// Ensure we have an auth session before letting user continue
onMounted(async () => {
  const {
    data: {user},
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