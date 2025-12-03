<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 dark:bg-gray-950 dark:text-white">
    <!-- Background Accents -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl dark:bg-emerald-500/10"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl dark:bg-blue-500/10"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20">

      <!-- Hero Section -->
      <header class="text-center space-y-8 max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm dark:bg-white/5 dark:border-white/10">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span class="text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-300">
            Roommate Archetypes
          </span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Who are you on <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Amigo Lease?</span>
        </h1>
        
        <p class="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Based on your quiz answers, we place you into a gentle archetype. It isn’t a box – just a starting point to understand your living style and who you might click with.
        </p>

        <!-- Legend -->
        <div class="flex flex-wrap justify-center gap-3 pt-4">
          <span class="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 dark:bg-gray-900 dark:border-slate-800 dark:text-slate-400">
            🧽 Cleanliness
          </span>
          <span class="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 dark:bg-gray-900 dark:border-slate-800 dark:text-slate-400">
            🔈 Noise & Energy
          </span>
          <span class="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 dark:bg-gray-900 dark:border-slate-800 dark:text-slate-400">
            🛌 Sleep & Rhythm
          </span>
          <span class="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 dark:bg-gray-900 dark:border-slate-800 dark:text-slate-400">
            🐾 Pets & Habits
          </span>
        </div>
      </header>

      <!-- Archetype Grid -->
      <section class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
            v-for="type in archetypesWithColors"
            :key="type.key"
            class="group relative flex flex-col h-full bg-white rounded-[2.5rem] border-2 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900"
            :class="[type.colors.border, type.colors.shadow]"
        >
          <!-- Card Header Gradient -->
          <div :class="['absolute top-0 left-0 w-full h-40 bg-gradient-to-b opacity-20 pointer-events-none', type.colors.gradientFrom, 'to-transparent']"></div>

          <div class="relative p-8 flex-1 flex flex-col space-y-8">
            
            <!-- Icon & Title -->
            <div class="flex flex-col items-center text-center space-y-5">
              <div class="relative">
                <div :class="['absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500', type.colors.glow]"></div>
                <div class="relative h-24 w-24 rounded-3xl bg-white border shadow-md flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 dark:bg-gray-800 dark:border-gray-700" :class="type.colors.iconBorder">
                  {{ type.emoji }}
                </div>
              </div>
              
              <div>
                <div :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3', type.colors.badge]">
                  {{ type.shortLabel }}
                </div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                  {{ type.name }}
                </h2>
              </div>
            </div>

            <!-- Description -->
            <p class="text-base text-slate-600 text-center leading-relaxed dark:text-slate-300">
              {{ type.description }}
            </p>

            <!-- Traits -->
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 dark:bg-gray-800/50 dark:border-gray-700/50">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Key Traits
              </p>
              <ul class="space-y-3">
                <li
                    v-for="t in type.traits"
                    :key="t"
                    class="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <span :class="['mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0', type.colors.dot]"></span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>

            <!-- Compatibility -->
            <div class="mt-auto pt-4 space-y-4">
              <div class="flex gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 dark:bg-emerald-900/10 dark:border-emerald-900/20">
                <div class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm flex-shrink-0 dark:bg-emerald-900/30">✅</div>
                <div>
                  <p class="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">Best Match</p>
                  <p class="text-sm text-emerald-900/80 dark:text-emerald-300/80 leading-snug mt-1">
                    {{ type.bestWith }}
                  </p>
                </div>
              </div>

              <div class="flex gap-4 p-4 rounded-2xl bg-rose-50/50 border border-rose-100/50 dark:bg-rose-900/10 dark:border-rose-900/20">
                <div class="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-sm flex-shrink-0 dark:bg-rose-900/30">⚠️</div>
                <div>
                  <p class="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wide">Tricky Match</p>
                  <p class="text-sm text-rose-900/80 dark:text-rose-300/80 leading-snug mt-1">
                    {{ type.trickyWith }}
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          <!-- Bottom Accent -->
          <div :class="['h-2 w-full bg-gradient-to-r', type.colors.bottomGradient]"></div>
        </article>
      </section>

      <!-- Footer -->
      <footer class="text-center pb-12">
        <div class="inline-block max-w-3xl mx-auto p-8 rounded-[2rem] bg-white border border-slate-200 shadow-lg dark:bg-gray-900 dark:border-slate-800">
          <p class="text-lg font-bold text-slate-900 mb-3 dark:text-white">
            Not a perfect fit?
          </p>
          <p class="text-sm text-slate-500 leading-relaxed dark:text-slate-400">
            That’s okay. Archetypes are just a shorthand to help you and your future roommate talk
            about expectations. Real life is messier and more interesting – and you’re always more
            than one label.
          </p>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ARCHETYPES } from '~/types/archetypes'

useSeoMeta({
  title: 'Roommate Archetypes - Amigo Lease',
  description: 'Discover the different roommate personalities on Amigo Lease. Which one are you?',
})

const getColors = (key: string) => {
  switch (key) {
    case 'quiet_nest_builder':
      return {
        border: 'border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700',
        shadow: 'hover:shadow-emerald-500/10',
        gradientFrom: 'from-emerald-500',
        glow: 'bg-emerald-400',
        iconBorder: 'border-emerald-100 dark:border-emerald-900',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        dot: 'bg-emerald-500',
        bottomGradient: 'from-emerald-300 via-emerald-500 to-emerald-300'
      }
    case 'social_sunbeam':
      return {
        border: 'border-amber-100 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700',
        shadow: 'hover:shadow-amber-500/10',
        gradientFrom: 'from-amber-500',
        glow: 'bg-amber-400',
        iconBorder: 'border-amber-100 dark:border-amber-900',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        dot: 'bg-amber-500',
        bottomGradient: 'from-amber-300 via-amber-500 to-amber-300'
      }
    case 'structured_planner':
      return {
        border: 'border-blue-100 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700',
        shadow: 'hover:shadow-blue-500/10',
        gradientFrom: 'from-blue-500',
        glow: 'bg-blue-400',
        iconBorder: 'border-blue-100 dark:border-blue-900',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        dot: 'bg-blue-500',
        bottomGradient: 'from-blue-300 via-blue-500 to-blue-300'
      }
    case 'easygoing_chameleon':
      return {
        border: 'border-teal-100 dark:border-teal-900/30 hover:border-teal-300 dark:hover:border-teal-700',
        shadow: 'hover:shadow-teal-500/10',
        gradientFrom: 'from-teal-500',
        glow: 'bg-teal-400',
        iconBorder: 'border-teal-100 dark:border-teal-900',
        badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
        dot: 'bg-teal-500',
        bottomGradient: 'from-teal-300 via-teal-500 to-teal-300'
      }
    case 'party_pulse':
      return {
        border: 'border-rose-100 dark:border-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700',
        shadow: 'hover:shadow-rose-500/10',
        gradientFrom: 'from-rose-500',
        glow: 'bg-rose-400',
        iconBorder: 'border-rose-100 dark:border-rose-900',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
        dot: 'bg-rose-500',
        bottomGradient: 'from-rose-300 via-rose-500 to-rose-300'
      }
    case 'cozy_homebody':
      return {
        border: 'border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700',
        shadow: 'hover:shadow-indigo-500/10',
        gradientFrom: 'from-indigo-500',
        glow: 'bg-indigo-400',
        iconBorder: 'border-indigo-100 dark:border-indigo-900',
        badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
        dot: 'bg-indigo-500',
        bottomGradient: 'from-indigo-300 via-indigo-500 to-indigo-300'
      }
    default:
      return {
        border: 'border-slate-200 dark:border-slate-800',
        shadow: 'hover:shadow-slate-500/10',
        gradientFrom: 'from-slate-500',
        glow: 'bg-slate-400',
        iconBorder: 'border-slate-100 dark:border-slate-800',
        badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
        dot: 'bg-slate-500',
        bottomGradient: 'from-slate-300 via-slate-500 to-slate-300'
      }
  }
}

const archetypesWithColors = computed(() => {
  return ARCHETYPES.map(a => ({
    ...a,
    colors: getColors(a.key)
  }))
})
</script>