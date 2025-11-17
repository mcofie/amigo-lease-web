<!-- src/pages/onboarding/role.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="w-full max-w-md space-y-6">
      <h1 class="text-2xl font-semibold text-center">
        Let’s get you started on Amigo Lease
      </h1>
      <p class="text-center text-sm text-gray-500">
        First, what brings you here?
      </p>

      <div class="space-y-4">
        <button
            class="w-full border rounded-xl px-4 py-3 text-left hover:bg-gray-50 transition"
            @click="selectRole('seeker')"
        >
          <div class="font-medium">I need a place / roommate</div>
          <div class="text-xs text-gray-500">
            We’ll help you find a room and a roommate you actually vibe with.
          </div>
        </button>

        <button
            class="w-full border rounded-xl px-4 py-3 text-left hover:bg-gray-50 transition"
            @click="selectRole('host')"
        >
          <div class="font-medium">I have a place, need a roommate</div>
          <div class="text-xs text-gray-500">
            List your place and find someone who matches your lifestyle.
          </div>
        </button>

        <button
            class="w-full border rounded-xl px-4 py-3 text-left hover:bg-gray-50 transition"
            @click="selectRole('both')"
        >
          <div class="font-medium">I’m open to both</div>
          <div class="text-xs text-gray-500">
            You’re flexible – we’ll show you the best of both worlds.
          </div>
        </button>
      </div>

      <p v-if="error" class="text-xs text-red-500 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileRole } from '~/types/amigo'

const router = useRouter()
const { setRole, error } = useProfile()
const loading = ref(false)

const selectRole = async (role: ProfileRole) => {
  if (loading.value) return
  loading.value = true

  await setRole(role)

  loading.value = false

  if (!error.value) {
    router.push('/onboarding/basics')
  }
}
</script>