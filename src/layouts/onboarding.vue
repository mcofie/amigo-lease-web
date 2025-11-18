<!-- src/layouts/onboarding.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Top bar -->
    <header class="border-b bg-white/80 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="h-7 w-7 rounded-xl bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
            AL
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold text-gray-900">
              Amigo Lease
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 uppercase tracking-wide">
              Beta
            </span>
          </div>
        </NuxtLink>

        <!-- Right-side actions -->
        <div class="flex items-center gap-3">
          <button
              type="button"
              class="text-[11px] text-gray-500 hover:text-gray-800"
              @click="skipToMatches"
          >
            Skip for now
          </button>

          <NuxtLink
              to="/auth"
              class="text-[11px] text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-full hidden sm:inline-flex items-center gap-1"
          >
            <span class="text-xs">🔑</span>
            <span>Sign in</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main content (pages handle their own background/gradient) -->
    <main class="flex-1 w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t bg-white/80 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 text-[11px] text-gray-500">
        <p>© {{ year }} Amigo Lease · Built for better roommates</p>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline">Made with ❤️ in your browser</span>
          <NuxtLink to="/privacy" class="hover:text-gray-800">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-gray-800">
            Terms
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()
const year = new Date().getFullYear()

const skipToMatches = () => {
  router.push('/matches')
}
</script>