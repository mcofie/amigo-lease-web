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
        <article class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700 group">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors dark:text-white">
                You & Nana
              </h3>
              <p class="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                Osu · 2 bed · ₵3,000
              </p>
            </div>
            <div class="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg font-bold text-sm border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
              89%
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">Early risers</span>
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">Quiet nights</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
            Ideal for someone who prefers calm evenings, clear routines, and light hosting.
          </p>
        </article>

        <!-- CARD 2 -->
        <article class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700 group">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors dark:text-white">
                Shared Home
              </h3>
              <p class="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                East Legon · ₵2,400
              </p>
            </div>
            <div class="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg font-bold text-sm border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
              92%
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">Pet-friendly 🐾</span>
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">No smoking</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
            A bright ensuite with a host whose habits line up with yours.
          </p>
        </article>

        <!-- CARD 3 -->
        <article class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700 group">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors dark:text-white">
                You & Kojo
              </h3>
              <p class="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                Haatso · 3 bed · ₵2,100
              </p>
            </div>
            <div class="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg font-bold text-sm border border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
              78%
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">Social</span>
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">1 Flag</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
            Great alignment on budget — just check on sleep schedules.
          </p>
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
