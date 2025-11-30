<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-8">

      <!-- Header -->
      <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Roommate Archetypes
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Who are you on Amigo Lease?
          </h1>
          <p class="text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            Based on your quiz answers, we place you into a gentle archetype. It isn’t a box – just a starting point to understand your living style and who you might click with.
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-4 max-w-xs shadow-sm dark:bg-gray-900 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-900 mb-1 dark:text-white">
            How to use this
          </p>
          <p class="text-[11px] text-slate-500 leading-relaxed dark:text-slate-400">
            Think of these as vibes, not labels. You might be mostly one archetype, with a sprinkle of another.
          </p>
        </div>
      </header>

      <!-- Legend / chips -->
      <section
          class="rounded-2xl bg-white border border-slate-200 px-4 py-4 shadow-sm text-xs text-slate-600 flex flex-wrap gap-3 items-center dark:bg-gray-900 dark:border-slate-800 dark:text-slate-300"
      >
        <p class="font-bold text-slate-900 mr-1 dark:text-white">
          What we look at:
        </p>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🧽 Cleanliness
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🔈 Noise & Energy
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🛌 Sleep & Rhythm
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🐾 Pets & Habits
        </span>
      </section>

      <!-- Archetype grid -->
      <section class="grid gap-6 md:grid-cols-2">
        <article
            v-for="type in archetypes"
            :key="type.key"
            class="group relative rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <!-- Accent Stripe -->
          <div class="h-1.5 w-full bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 dark:from-white dark:via-slate-300 dark:to-slate-500"/>

          <div class="p-6 space-y-5 flex-1 flex flex-col">
            <!-- Title row -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div
                    class="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform dark:bg-slate-800 dark:border-slate-700"
                >
                  <span>{{ type.emoji }}</span>
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 dark:text-slate-500">
                    {{ type.shortLabel }}
                  </p>
                  <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                    {{ type.name }}
                  </h2>
                </div>
              </div>

              <div class="text-right">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 dark:text-slate-500">
                  Vibe
                </p>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-white shadow-sm dark:bg-white dark:text-slate-900">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
                  <span>{{ type.vibeTag }}</span>
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
              {{ type.description }}
            </p>

            <!-- Traits -->
            <div class="space-y-2 bg-slate-50 rounded-xl p-4 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800">
              <p class="text-xs font-bold text-slate-900 uppercase tracking-wide dark:text-white">
                You’re probably:
              </p>
              <ul class="space-y-1.5">
                <li
                    v-for="t in type.traits"
                    :key="t"
                    class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <span class="mt-1 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600 flex-shrink-0"></span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>

            <!-- Fit row -->
            <div class="grid grid-cols-1 gap-3 pt-4 border-t border-slate-100 mt-auto dark:border-slate-800">
              <div class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50/50 transition-colors dark:hover:bg-emerald-900/10">
                <span class="text-lg mt-[-2px]">✅</span>
                <div>
                  <p class="text-xs font-bold text-slate-900 dark:text-slate-200">
                    Great fit with:
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {{ type.bestWith }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-50/50 transition-colors dark:hover:bg-rose-900/10">
                <span class="text-lg mt-[-2px]">⚠️</span>
                <div>
                  <p class="text-xs font-bold text-slate-900 dark:text-slate-200">
                    Tricky with:
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {{ type.trickyWith }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- Footer note -->
      <section
          class="mt-4 rounded-3xl bg-white border border-dashed border-slate-300 p-6 text-center dark:bg-gray-900 dark:border-slate-700"
      >
        <p class="text-sm font-bold text-slate-900 mb-1 dark:text-white">
          Not a perfect fit?
        </p>
        <p class="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
          That’s okay. Archetypes are just a shorthand to help you and your future roommate talk
          about expectations. Real life is messier and more interesting – and you’re always more
          than one label.
        </p>
      </section>
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