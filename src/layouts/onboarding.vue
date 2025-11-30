<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-slate-200 text-slate-900 dark:bg-gray-950 dark:text-white">
    <!-- Top nav -->
    <header
        class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-gray-900/80 dark:border-slate-800"
    >
      <div
          class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4"
      >
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <!-- Logo Icon -->
          <div
              class="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform"
          >
            AL
          </div>
          <!-- Logo Text -->
          <div class="flex flex-col leading-none">
            <span class="text-sm font-bold text-slate-900 tracking-tight dark:text-white">
              Amigo Lease
            </span>
            <span class="text-[10px] font-medium text-slate-500 mt-0.5 dark:text-slate-400">
              Find the friend in your roommate
            </span>
          </div>
        </NuxtLink>

        <!-- Right-side actions -->
        <div class="flex items-center gap-4">
          <ThemeSwitcher />
          
          <button
              type="button"
              class="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-white"
              @click="skipToMatches"
          >
            Skip for now
          </button>

          <button
              v-if="isAuthenticated"
              type="button"
              class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold hover:bg-rose-100 hover:border-rose-200 transition-all dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30"
              @click="logout"
          >
            <span>🚪</span>
            <span>Log out</span>
          </button>

          <NuxtLink
              v-else
              to="/auth"
              class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold hover:bg-slate-200 hover:border-slate-300 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
          >
            <span class="text-xs">🔑</span>
            <span>Sign in</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 w-full flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 dark:bg-gray-900 dark:border-slate-800">
      <div
          class="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <!-- Left: brand + tagline -->
        <div class="flex items-start gap-3">
          <div
              class="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-900 dark:bg-slate-800 dark:text-white"
          >
            AL
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-900 dark:text-white">
              © {{ year }} Amigo Lease
            </span>
            <span class="text-[11px] text-slate-500 max-w-[240px] leading-relaxed dark:text-slate-400">
              Built for roommates who actually vibe — not just share rent.
            </span>
          </div>
        </div>

        <!-- Right: links -->
        <div
            class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          <NuxtLink to="/privacy" class="hover:text-slate-900 transition-colors dark:hover:text-white">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-slate-900 transition-colors dark:hover:text-white">
            Terms
          </NuxtLink>

          <span class="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

          <span class="text-slate-400 font-normal dark:text-slate-500">
            Made with Nuxt &amp; Supabase
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useNuxtApp } from '#imports'

const router = useRouter()
const { $supabase } = useNuxtApp()
const year = new Date().getFullYear()
const isAuthenticated = ref(false)

const skipToMatches = () => {
  router.push('/matches')
}

const logout = async () => {
  await $supabase.auth.signOut()
  isAuthenticated.value = false
  router.push('/')
}

onMounted(async () => {
  const { data: { user } } = await $supabase.auth.getUser()
  isAuthenticated.value = !!user

  $supabase.auth.onAuthStateChange((event, session) => {
    isAuthenticated.value = !!session
    if (event === 'SIGNED_OUT') {
      router.push('/')
    }
  })
})
</script>