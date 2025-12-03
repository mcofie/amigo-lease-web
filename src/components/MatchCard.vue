<template>
  <article
      class="group relative flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden dark:bg-gray-950 dark:border-slate-800"
      @click="$emit('view-profile')"
  >
    
    <!-- Decorative Background Blob -->
    <div :class="['absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-500', colorClasses.blob]"></div>

    <div class="relative p-6 flex flex-col h-full">
      
      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-4">
          <!-- Avatar (Squircle) -->
          <div class="relative group-hover:scale-105 transition-transform duration-300">
             <div v-if="props.match.avatar_url" class="relative h-16 w-16 rounded-2xl overflow-hidden shadow-md">
               <img :src="props.match.avatar_url" class="h-full w-full object-cover" alt="Avatar" />
             </div>
             <div v-else :class="['relative h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-md border', colorClasses.avatarPlaceholder]">
               {{ initials }}
             </div>
             <!-- Online/Status Indicator -->
             <div class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-950"></div>
          </div>

          <div>
            <h3 class="text-xl font-extrabold text-slate-900 tracking-tight dark:text-white">
              {{ props.match.full_name || 'Roommate' }}
            </h3>
            <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
              <span class="uppercase tracking-wider">{{ props.match.city || 'Accra' }}</span>
              <span v-if="props.match.area" class="text-slate-300 dark:text-slate-600">•</span>
              <span v-if="props.match.area">{{ props.match.area }}</span>
            </div>
          </div>
        </div>

        <!-- Score Badge (Floating) -->
        <div :class="['flex flex-col items-center justify-center w-14 h-14 rounded-2xl shadow-sm border backdrop-blur-sm', colorClasses.badge]">
          <span class="text-lg font-black">{{ props.match.score }}</span>
          <span class="text-[9px] font-bold uppercase opacity-60">%</span>
        </div>
      </div>

      <!-- Compatibility Visual -->
      <div class="mb-6">
        <div class="flex justify-between items-end mb-2">
          <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compatibility</span>
          <span :class="['text-xs font-bold', colorClasses.text]">{{ matchLabel }}</span>
        </div>
        <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
          <div :class="['h-full rounded-full shadow-sm transition-all duration-1000 ease-out', colorClasses.bar]" :style="{ width: `${props.match.score}%` }"></div>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-auto">
        <span
            v-for="tag in displayTags"
            :key="tag.label"
            :class="['px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border transition-colors shadow-sm', tag.classes]"
        >
          {{ tag.label }}
        </span>
      </div>

    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MatchRow, CompatibilitySummary } from '~/composables/useMatches'
import { getArchetypeMeta } from '~/types/archetypes'

const props = defineProps<{
  match: MatchRow
}>()

const summary = computed<CompatibilitySummary>(() => {
  return (props.match.compatibility_summary as CompatibilitySummary) || ({} as CompatibilitySummary)
})

const initials = computed(() => {
  const name = props.match.full_name?.trim() || ''
  if (!name) return 'RM'
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'RM'
  
  const firstInitial = parts[0]?.charAt(0) || ''
  const secondInitial = parts[1]?.charAt(0) || ''
  
  return (firstInitial + secondInitial).toUpperCase() || 'RM'
})

const colorClasses = computed(() => {
  const score = props.match.score
  if (score >= 90) {
    return {
      blob: 'bg-emerald-500',
      text: 'text-emerald-600 dark:text-emerald-400',
      bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      badge: 'bg-emerald-50/80 border-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400',
      avatarPlaceholder: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
    }
  } else if (score >= 80) {
    return {
      blob: 'bg-orange-500',
      text: 'text-orange-600 dark:text-orange-400',
      bar: 'bg-gradient-to-r from-orange-500 to-amber-400',
      badge: 'bg-orange-50/80 border-orange-100 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-400',
      avatarPlaceholder: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
    }
  } else {
    return {
      blob: 'bg-indigo-500',
      text: 'text-indigo-600 dark:text-indigo-400',
      bar: 'bg-gradient-to-r from-indigo-500 to-purple-400',
      badge: 'bg-indigo-50/80 border-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400',
      avatarPlaceholder: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800'
    }
  }
})

const matchLabel = computed(() => {
  const score = props.match.score
  if (score >= 90) return 'Perfect Match'
  if (score >= 80) return 'Great Match'
  return 'Good Match'
})

const displayTags = computed(() => {
  const tags: { label: string; classes: string }[] = []
  const s = summary.value

  // Archetype tag
  const arch = getArchetypeMeta(props.match.archetype ?? null)
  if (arch) {
    tags.push({
      label: arch.shortLabel,
      classes: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
    })
  }

  // Pet tag
  if (s.pets === 'match') {
    tags.push({
      label: 'Pet-friendly',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
    })
  } else if (s.pets === 'conflict') {
    tags.push({
      label: 'No Pets',
      classes: 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
    })
  }

  // Smoking tag
  if (s.smoking === 'match') {
    tags.push({
      label: 'Non-smoker',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
    })
  }

  // Vibe tag
  if (s.vibe) {
     tags.push({
      label: s.vibe,
      classes: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
    })
  }

  return tags.slice(0, 3)
})
</script>