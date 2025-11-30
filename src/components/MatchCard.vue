<template>
  <div
      class="group p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col gap-5 dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-4">
        <!-- Avatar / initials -->
        <div class="relative">
          <div
              class="h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center text-slate-900 text-sm font-bold border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700"
          >
            <img
                v-if="props.match.avatar_url"
                :src="props.match.avatar_url"
                alt=""
                loading="lazy"
                class="h-full w-full object-cover"
            />
            <span v-else>{{ initials }}</span>
          </div>
          <!-- Online indicator (optional) -->
          <div
              class="absolute -bottom-1 -right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center dark:bg-gray-900">
            <div class="h-2.5 w-2.5 bg-emerald-500 rounded-full border border-white dark:border-gray-900"></div>
          </div>
        </div>

        <div class="space-y-0.5">
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            {{ props.match.full_name || 'Roommate' }}
          </h3>
          <p class="text-xs font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
            <span class="text-base">📍</span>
            <span v-if="props.match.area">
              {{ props.match.area }}, {{ props.match.city || '—' }}
            </span>
            <span v-else>
              {{ props.match.city || 'Location not set' }}
            </span>
          </p>
        </div>
      </div>

      <!-- Score -->
      <div class="flex flex-col items-end">
        <div
            class="px-3 py-1 rounded-lg bg-slate-900 text-white text-sm font-bold shadow-md shadow-slate-900/10 dark:bg-white dark:text-slate-900"
        >
          {{ props.match.score }}%
        </div>
        <span class="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wide dark:text-slate-500">
          Match
        </span>
      </div>
    </div>

    <!-- Meta Tags / Summary -->
    <div class="space-y-3">
      <!-- Compatibility Pills -->
      <div class="flex flex-wrap gap-2">
        <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wide dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
          Good vibe
        </span>

        <span
            v-if="archetypeMeta"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide"
            :class="archetypeMeta.chipClass || 'bg-slate-50 border-slate-100 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'"
        >
          <span>{{ archetypeMeta.emoji }}</span>
          <span>{{ archetypeMeta.shortTag }}</span>
        </span>

        <span
            v-if="summary.pets && summary.pets !== 'unknown'"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide"
            :class="summary.pets === 'match'
              ? 'bg-slate-50 border-slate-100 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
              : 'bg-orange-50 border-orange-100 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400'"
        >
          <span>🐾</span>
          <span>{{ summary.pets === 'match' ? 'Pet Friendly' : 'No Pets' }}</span>
        </span>
      </div>

      <!-- Descriptive Tags -->
      <div v-if="tags.length" class="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
        <span
            v-for="tag in tags"
            :key="tag"
            class="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- CTAs -->
    <div class="flex gap-3 pt-2 border-t border-slate-50 mt-auto dark:border-slate-800">
      <button
          class="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          @click="$emit('view-profile')"
      >
        View Profile
      </button>

      <button
          class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all dark:bg-gray-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-800"
          @click="$emit('start-chat')"
      >
        <span>Say Hi</span>
        <span>👋</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import type {MatchRow, CompatibilitySummary} from '~/composables/useMatches'
import {getArchetypeMeta} from '~/types/archetypes'

// Accept exactly what useMatches returns
const props = defineProps<{
  match: MatchRow
}>()

const summary = computed<CompatibilitySummary>(() => {
  return (props.match.compatibility_summary as CompatibilitySummary) || ({} as CompatibilitySummary)
})

const archetypeMeta = computed(() =>
    getArchetypeMeta(props.match.archetype ?? null)
)

const tags = computed(() => {
  const s = summary.value
  const out: string[] = []

  if (s.cleanliness) out.push(`Cleanliness: ${s.cleanliness}`)
  if (s.noise) out.push(`Noise: ${s.noise}`)
  if (s.sleep) out.push(`Sleep: ${s.sleep}`)
  if (s.vibe) out.push(`Vibe: ${s.vibe}`)

  // Fallback if empty
  if (!out.length) out.push('Good overall match')

  return out.slice(0, 3) // Limit to 3 tags to keep card clean
})

const initials = computed(() => {
  const name = props.match.full_name?.trim() || ''
  if (!name) return 'RM'
  const parts = name.split(/\s+/).filter(Boolean)

  if (parts.length === 0) return 'RM'
  if (parts.length === 1) {
    return (parts[0] ?? '').slice(0, 2).toUpperCase() || 'RM'
  }

  const [first = '', second = ''] = parts
  const firstInitial = first[0] ?? ''
  const secondInitial = second[0] ?? ''
  const combined = (firstInitial + secondInitial).toUpperCase()

  return combined || firstInitial.toUpperCase() || 'RM'
})
</script>