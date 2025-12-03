<template>
  <section class="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none dark:from-orange-900/10"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span class="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider dark:bg-orange-900/30 dark:text-orange-400">
              Know Thyself
            </span>
        <h2 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          What’s your roommate <span class="text-orange-600 dark:text-orange-500">archetype?</span>
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          Are you a <strong>Social Sunbeam</strong> or a <strong>Quiet Nest-Builder</strong>? Discover your living style and find people who complement it perfectly.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
            v-for="arch in displayedArchetypes"
            :key="arch.key"
            class="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-orange-500/30"
            :class="{ 'bg-white border-2 border-orange-100 shadow-lg hover:shadow-2xl dark:border-orange-500/30': arch.key === 'easygoing_socialite' }"
        >
          <div v-if="arch.key === 'easygoing_socialite'" class="absolute top-4 right-4 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide dark:bg-orange-900/50 dark:text-orange-300">Popular</div>
          <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{{ arch.emoji }}</div>
          <h3 class="text-xl font-bold text-slate-900 mb-2 dark:text-white">{{ arch.name }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
            {{ arch.description }}
          </p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button
            @click="goToArchetypes"
            class="inline-flex items-center gap-2 text-sm font-bold text-slate-900 border-b-2 border-slate-900 hover:text-orange-600 hover:border-orange-600 transition-colors pb-0.5 dark:text-white dark:border-white dark:hover:text-orange-400 dark:hover:border-orange-400"
        >
          Explore all 10 archetypes
          <span class="text-lg">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'
import { ARCHETYPES } from '~/types/archetypes'

const router = useRouter()

// Select 3 representative archetypes to display
const displayedArchetypes = [
  ARCHETYPES.find(a => a.key === 'neat_planner'),
  ARCHETYPES.find(a => a.key === 'easygoing_socialite'),
  ARCHETYPES.find(a => a.key === 'chill_creative')
].filter(Boolean) as typeof ARCHETYPES

const goToArchetypes = () => {
  router.push('/archetypes')
}
</script>
