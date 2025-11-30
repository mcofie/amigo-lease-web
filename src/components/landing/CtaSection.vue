<template>
  <section class="py-24 bg-white dark:bg-gray-950">
    <div class="max-w-4xl mx-auto px-6 text-center space-y-8">
      <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
        Ready to find your <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">roommate soulmate?</span>
      </h2>
      <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Join thousands of roommates who found their perfect match. No awkward interviews, just good vibes.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
            @click="goToOnboarding"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white text-base font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-200 dark:bg-white dark:text-slate-900"
        >
          Start Compatibility Quiz
        </button>
        <button
            @click="goToOnboarding"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 text-slate-900 text-base font-bold hover:bg-slate-200 transition-all duration-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          List Your Room
        </button>
      </div>

      <p class="text-xs text-slate-400 dark:text-slate-500">
        Free to join · No credit card required
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

const goToOnboarding = () => {
  router.push('/onboarding/role')
}
</script>
