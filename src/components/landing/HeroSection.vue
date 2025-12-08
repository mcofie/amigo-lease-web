<template>
  <section class="relative flex items-center overflow-hidden pt-10 pb-20 lg:pt-24">
    <!-- Modern Mesh Gradients (Warmer Tones) -->
    <div
        class="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-orange-500/20 blur-[120px] opacity-60 dark:bg-orange-600/10"
        aria-hidden="true"
    ></div>
    <div
        class="absolute top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-rose-500/20 blur-[120px] opacity-60 dark:bg-rose-600/10"
        aria-hidden="true"
    ></div>

    <div class="relative w-full max-w-6xl mx-auto px-6">
      <div class="grid gap-16 lg:grid-cols-2 items-center">
        <!-- LEFT: TEXT -->
        <div class="space-y-8 fade-in-up max-w-xl">
          <!-- Eyebrow -->
          <div
              class="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-orange-200 px-4 py-2 rounded-full shadow-sm shadow-orange-500/10 dark:bg-white/5 dark:border-white/10"
          >
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            <span class="text-orange-700 text-xs font-bold tracking-wide uppercase dark:text-orange-200">
                Match Habits, Not Just Rooms
              </span>
          </div>

          <!-- Headline -->
          <h1
              class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] dark:text-white"
          >
            Find a roommate<br />
            you <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-600 to-amber-500 dark:from-orange-400 dark:via-rose-400 dark:to-amber-300">actually vibe</span> with.
          </h1>

          <!-- Description -->
          <p class="text-lg md:text-xl text-slate-600 leading-relaxed dark:text-slate-400">
            Amigo Lease turns your routines, boundaries, and budget into a
            <strong class="text-slate-900 dark:text-white">compatibility score</strong>. Connect with people and places
            that feel like home—without the awkward interviews.
          </p>

          <!-- Feature pills -->
          <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                ✨ Quiz-powered matching
              </span>
            <span class="px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                🏡 Verified lifestyles
              </span>
            <span class="px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                🛡️ Dealbreakers upfront
              </span>
          </div>

          <!-- Primary actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button
                type="button"
                @click="goToOnboarding"
                class="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-rose-600 px-8 font-bold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <span class="mr-2 text-lg">Take the Quiz</span>
              <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button
                type="button"
                @click="scrollToHowItWorks"
                class="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              How it works
            </button>
          </div>


        </div>

        <!-- RIGHT: VISUAL AREA -->
        <div class="hidden lg:flex relative justify-center perspective-1000">
          <!-- Decorative blob -->
          <div class="absolute inset-0 bg-gradient-to-tr from-orange-400 to-rose-500 rounded-full blur-[80px] opacity-30 scale-90 animate-pulse-slow dark:opacity-20"></div>

          <!-- Image Container -->
          <div class="relative w-full max-w-[420px] transform transition-transform hover:scale-[1.02] duration-500 group">
            <!-- Glass ring -->
            <div class="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-b from-white/60 to-white/0 border border-white/30 blur-sm"></div>

            <img
                src="/images/handshake.gif"
                alt="Amigo Lease match"
                class="relative rounded-[2rem] shadow-2xl shadow-orange-900/20 border-4 border-white dark:border-slate-800 dark:shadow-black/50 w-full h-auto"
            />

            <!-- Floating Badge: Match Score -->
            <div class="absolute top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float delay-100 dark:bg-slate-800 dark:border-slate-700">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                94%
              </div>
              <div>
                <p class="text-xs text-slate-500 font-semibold uppercase tracking-wide dark:text-slate-400">Compatibility</p>
                <p class="text-sm font-bold text-slate-900 dark:text-white">Perfect Match</p>
              </div>
            </div>

            <!-- Floating Badge: Vibe -->
            <div class="absolute -bottom-6 -left-6 bg-white p-3 pr-5 rounded-full shadow-xl border border-slate-100 flex items-center gap-3 animate-float dark:bg-slate-800 dark:border-slate-700">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg">
                🌿
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-white">Chill & Tidy</p>
                <p class="text-[10px] text-slate-500 font-medium dark:text-slate-400">Verified Vibe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></template>

<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

const goToOnboarding = () => {
  router.push('/onboarding/role')
}

const scrollToHowItWorks = () => {
  const element = document.getElementById('how-it-works')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 0.5; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-glow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.fade-in-up-delayed {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
