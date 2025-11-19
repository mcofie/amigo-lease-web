<!-- src/layouts/onboarding.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Top nav (match main layout look & feel) -->
    <header
        class="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-400 text-white shadow-sm"
    >
      <div
          class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4"
      >
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
              class="h-7 w-7 rounded-xl bg-white/10 flex items-center justify-center text-[11px] font-semibold text-white shadow-sm"
          >
            AL
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-sm font-semibold tracking-tight text-white">
              Amigo Lease
            </span>
            <span class="text-[10px] text-orange-100/90">
              Find the friend in your roommate
            </span>
          </div>
        </NuxtLink>

        <!-- Right-side actions (onboarding-specific) -->
        <div class="flex items-center gap-3">
          <button
              type="button"
              class="text-[11px] text-orange-50/95 hover:text-white"
              @click="skipToMatches"
          >
            Skip for now
          </button>

          <NuxtLink
              to="/auth"
              class="text-[11px] text-orange-50/95 hover:text-white border border-white/40 px-3 py-1.5 rounded-full hidden sm:inline-flex items-center gap-1"
          >
            <span class="text-xs">🔑</span>
            <span>Sign in</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 w-full">
      <slot />
    </main>

    <!-- Footer (match main layout’s darker style) -->
    <footer class="bg-gray-950 text-gray-300">
      <div
          class="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px]"
      >
        <!-- Left: brand + tagline -->
        <div class="flex items-start gap-2">
          <div
              class="h-7 w-7 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-[10px] font-semibold text-white shadow-sm"
          >
            AL
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-gray-100">
              © {{ year }} Amigo Lease
            </span>
            <span class="text-[10px] text-gray-400">
              Built for roommates who actually vibe — not just share rent.
            </span>
          </div>
        </div>

        <!-- Right: links -->
        <div
            class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] md:justify-end"
        >
          <NuxtLink to="/privacy" class="hover:text-white">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white">
            Terms
          </NuxtLink>

          <span class="hidden sm:inline text-gray-600">|</span>

          <span class="text-gray-500">
            Made with Nuxt &amp; Supabase
          </span>
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