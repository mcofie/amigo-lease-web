<!-- src/layouts/onboarding.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Simple top bar -->
    <header class="h-12 flex items-center px-4 border-b bg-white/80 backdrop-blur-sm">
      <div class="max-w-3xl mx-auto flex items-center justify-between w-full">
        <NuxtLink to="/" class="text-sm font-semibold">
          Amigo Lease
        </NuxtLink>
        <button
            type="button"
            class="text-[11px] text-gray-500 hover:text-gray-800"
            @click="skipToMatches"
        >
          Skip for now
        </button>
      </div>
    </header>

    <main class="min-h-screen w-full">
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from '#imports'

const router = useRouter()

const skipToMatches = () => {
  router.push('/matches')
}
</script>