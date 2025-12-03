<template>
  <section
      class="py-24 bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-slate-800"
  >
    <div class="max-w-6xl mx-auto px-6 space-y-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-2xl space-y-4">
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            See your matches at a glance.
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            No hidden surprises. See compatibility scores, dealbreakers, and vibe checks upfront.
          </p>
        </div>
        <button
            @click="goToMatches"
            class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
        >
          View Live Demo
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="grid gap-6 md:grid-cols-3 cards-reveal">
        <!-- CARD 1 -->
        <article class="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden dark:bg-gray-950 dark:border-slate-800">
          <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-500 bg-orange-500"></div>
          
          <div class="relative p-6 flex flex-col h-full">
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="relative group-hover:scale-105 transition-transform duration-300">
                   <div class="relative h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md border bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
                     YN
                   </div>
                   <div class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-950"></div>
                </div>
                <div>
                  <h3 class="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white">
                    You & Nana
                  </h3>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                    <span class="uppercase tracking-wider">Osu</span>
                    <span class="text-slate-300 dark:text-slate-600">•</span>
                    <span>2 bed</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-center justify-center w-14 h-14 rounded-2xl shadow-sm border backdrop-blur-sm bg-orange-50/80 border-orange-100 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-400">
                <span class="text-lg font-black">89</span>
                <span class="text-[9px] font-bold uppercase opacity-60">%</span>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between items-end mb-2">
                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compatibility</span>
                <span class="text-xs font-bold text-orange-600 dark:text-orange-400">Great Match</span>
              </div>
              <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                <div class="h-full rounded-full shadow-sm transition-all duration-1000 ease-out bg-gradient-to-r from-orange-500 to-amber-400" style="width: 89%"></div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-auto">
              <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">Early risers</span>
              <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">Quiet nights</span>
            </div>
          </div>
        </article>

        <!-- CARD 2 -->
        <article class="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden dark:bg-gray-950 dark:border-slate-800">
          <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-500 bg-emerald-500"></div>
          
          <div class="relative p-6 flex flex-col h-full">
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="relative group-hover:scale-105 transition-transform duration-300">
                   <div class="relative h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md border bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                     SH
                   </div>
                   <div class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-950"></div>
                </div>
                <div>
                  <h3 class="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white">
                    Shared Home
                  </h3>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                    <span class="uppercase tracking-wider">East Legon</span>
                    <span class="text-slate-300 dark:text-slate-600">•</span>
                    <span>₵2,400</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-center justify-center w-14 h-14 rounded-2xl shadow-sm border backdrop-blur-sm bg-emerald-50/80 border-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400">
                <span class="text-lg font-black">92</span>
                <span class="text-[9px] font-bold uppercase opacity-60">%</span>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between items-end mb-2">
                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compatibility</span>
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Perfect Match</span>
              </div>
              <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                <div class="h-full rounded-full shadow-sm transition-all duration-1000 ease-out bg-gradient-to-r from-emerald-500 to-teal-400" style="width: 92%"></div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-auto">
              <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">Pet-friendly</span>
              <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">No smoking</span>
            </div>
          </div>
        </article>

        <!-- CARD 3 -->
        <article class="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden dark:bg-gray-900 dark:border-slate-800">
          <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-500 bg-indigo-500"></div>
          
          <div class="relative p-6 flex flex-col h-full">
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="relative group-hover:scale-105 transition-transform duration-300">
                   <div class="relative h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md border bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800">
                     YK
                   </div>
                   <div class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-950"></div>
                </div>
                <div>
                  <h3 class="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white">
                    You & Kojo
                  </h3>
                  <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                    <span class="uppercase tracking-wider">Haatso</span>
                    <span class="text-slate-300 dark:text-slate-600">•</span>
                    <span>3 bed</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-center justify-center w-14 h-14 rounded-2xl shadow-sm border backdrop-blur-sm bg-indigo-50/80 border-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400">
                <span class="text-lg font-black">78</span>
                <span class="text-[9px] font-bold uppercase opacity-60">%</span>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex justify-between items-end mb-2">
                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compatibility</span>
                <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">Good Match</span>
              </div>
              <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                <div class="h-full rounded-full shadow-sm transition-all duration-1000 ease-out bg-gradient-to-r from-indigo-500 to-purple-400" style="width: 78%"></div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-auto">
              <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">Social</span>
              <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">1 Flag</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

const goToMatches = () => {
  router.push('/matches')
}
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.cards-reveal > article {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.cards-reveal > article:nth-child(1) { animation-delay: 0.1s; }
.cards-reveal > article:nth-child(2) { animation-delay: 0.2s; }
.cards-reveal > article:nth-child(3) { animation-delay: 0.3s; }
</style>
