<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 dark:bg-gray-950 dark:text-white">
    <!-- Background Accents -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl dark:bg-emerald-500/10"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl dark:bg-blue-500/10"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">

      <!-- Hero Section -->
      <header class="text-center space-y-6 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm dark:bg-white/5 dark:border-white/10">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span class="text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-300">
            Roommate Archetypes
          </span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Who are you on <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Amigo Lease?</span>
        </h1>
        
        <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Based on your quiz answers, we place you into a gentle archetype. It isn’t a box – just a starting point to understand your living style and who you might click with.
        </p>

        <!-- Legend -->
        <div class="flex flex-wrap justify-center gap-3 pt-4">
          <span class="px-3 py-1.5 rounded-lg bg-white/60 border border-slate-200/60 text-xs font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
            🧽 Cleanliness
          </span>
          <span class="px-3 py-1.5 rounded-lg bg-white/60 border border-slate-200/60 text-xs font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
            🔈 Noise & Energy
          </span>
          <span class="px-3 py-1.5 rounded-lg bg-white/60 border border-slate-200/60 text-xs font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
            🛌 Sleep & Rhythm
          </span>
          <span class="px-3 py-1.5 rounded-lg bg-white/60 border border-slate-200/60 text-xs font-medium text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-400">
            🐾 Pets & Habits
          </span>
        </div>
      </header>

      <!-- Archetype Grid -->
      <section class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
            v-for="type in archetypes"
            :key="type.key"
            class="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden dark:bg-gray-900 dark:border-slate-800"
        >
          <!-- Card Header Gradient -->
          <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/50 dark:to-gray-900 pointer-events-none"></div>

          <div class="relative p-8 flex-1 flex flex-col space-y-6">
            
            <!-- Icon & Title -->
            <div class="flex flex-col items-center text-center space-y-4">
              <div class="relative">
                <div class="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:bg-emerald-900/30"></div>
                <div class="relative h-20 w-20 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 dark:bg-slate-800 dark:border-slate-700">
                  {{ type.emoji }}
                </div>
              </div>
              
              <div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 dark:bg-slate-800 dark:text-slate-400">
                  {{ type.shortLabel }}
                </div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                  {{ type.name }}
                </h2>
              </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-slate-600 text-center leading-relaxed dark:text-slate-300">
              {{ type.description }}
            </p>

            <!-- Traits -->
            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-700/50">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Key Traits
              </p>
              <ul class="space-y-2.5">
                <li
                    v-for="t in type.traits"
                    :key="t"
                    class="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <span class="mt-1.5 h-1 w-1 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>

            <!-- Compatibility -->
            <div class="mt-auto pt-2 space-y-3">
              <div class="flex gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50 dark:bg-emerald-900/10 dark:border-emerald-900/20">
                <span class="text-lg">✅</span>
                <div>
                  <p class="text-xs font-bold text-emerald-900 dark:text-emerald-200">Best Match</p>
                  <p class="text-[11px] text-emerald-800/80 dark:text-emerald-300/70 leading-snug mt-0.5">
                    {{ type.bestWith }}
                  </p>
                </div>
              </div>

              <div class="flex gap-3 p-3 rounded-xl bg-rose-50/50 border border-rose-100/50 dark:bg-rose-900/10 dark:border-rose-900/20">
                <span class="text-lg">⚠️</span>
                <div>
                  <p class="text-xs font-bold text-rose-900 dark:text-rose-200">Tricky Match</p>
                  <p class="text-[11px] text-rose-800/80 dark:text-rose-300/70 leading-snug mt-0.5">
                    {{ type.trickyWith }}
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          <!-- Bottom Accent -->
          <div class="h-1.5 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 group-hover:from-emerald-400 group-hover:via-teal-400 group-hover:to-emerald-400 transition-all duration-500"></div>
        </article>
      </section>

      <!-- Footer -->
      <footer class="text-center pb-12">
        <div class="inline-block max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 shadow-sm dark:bg-gray-900 dark:border-slate-800">
          <p class="text-sm font-bold text-slate-900 mb-2 dark:text-white">
            Not a perfect fit?
          </p>
          <p class="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
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
import { ARCHETYPES } from '~/types/archetypes'

useSeoMeta({
  title: 'Roommate Archetypes - Amigo Lease',
  description: 'Discover the different roommate personalities on Amigo Lease. Which one are you?',
})

const archetypes = ARCHETYPES
</script>