<!-- src/components/MatchCard.vue -->
<template>
  <div
      class="p-5 rounded-3xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-gray-100
           flex flex-col gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition"
  >
    <!-- Header -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <!-- Avatar / initials -->
        <div class="relative">
          <img
              v-if="profile.avatar_url"
              :src="profile.avatar_url"
              alt=""
              class="h-12 w-12 rounded-full object-cover bg-gray-100"
          />
          <div
              v-else
              class="h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center
                   text-xs font-semibold tracking-wide"
          >
            {{ initials }}
          </div>
        </div>

        <div class="space-y-0.5">
          <p class="font-medium text-gray-900">
            {{ profile.full_name || 'Roommate' }}
          </p>
          <p class="text-xs text-gray-500">
            <span v-if="profile.area">
              {{ profile.area }}, {{ profile.city || '—' }}
            </span>
            <span v-else>
              {{ profile.city || 'Location not set' }}
            </span>
          </p>

          <!-- Tiny meta row -->
          <div class="flex flex-wrap gap-1.5 text-[10px] text-gray-500">
            <span
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gray-50 border border-gray-200"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Good vibe potential
            </span>

            <!-- Archetype pill -->
            <span
                v-if="archetypeMeta"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full"
                :class="archetypeMeta.chipClass"
            >
              <span>{{ archetypeMeta.emoji }}</span>
              <span class="font-medium">
                {{ archetypeMeta.shortTag }}
              </span>
            </span>

            <span
                v-if="summary.pets && summary.pets !== 'unknown'"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-50 border border-orange-100"
            >
              <span>🐾</span>
              <span>
                {{ summary.pets === 'match' ? 'Pet-friendly match' : 'Pets might be tricky' }}
              </span>
            </span>
            <span
                v-if="summary.smoking && summary.smoking !== 'unknown'"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-50 border border-rose-100"
            >
              <span>🚭</span>
              <span>
                {{ summary.smoking === 'match' ? 'Aligned on smoking' : 'Different smoking habits' }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Score -->
      <div
          class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500
               text-white text-sm font-semibold text-right"
      >
        <div>{{ props.match.score }}%</div>
        <div class="text-[10px] opacity-90">compatibility</div>
      </div>
    </div>

    <!-- Tags -->
    <div v-if="tags.length" class="flex flex-wrap gap-2 text-[11px] pt-1">
      <span
          v-for="tag in tags"
          :key="tag"
          class="px-2.5 py-1 rounded-full bg-gray-900 text-white"
      >
        {{ tag }}
      </span>
    </div>

    <!-- CTAs -->
    <div class="flex gap-3 pt-3">
      <button
          class="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-black flex-1"
          @click="$emit('view-profile')"
      >
        View profile
      </button>

      <button
          class="px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 flex-1"
          @click="$emit('start-chat')"
      >
        Say hi 👋
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MatchRow, CompatibilitySummary } from '~/composables/useMatches'
import { getArchetypeMeta } from '~/types/archetypes'

// Accept exactly what useMatches returns
const props = defineProps<{
  match: MatchRow
}>()

// Locally shape the profile with the fields we use + optional archetype
type MatchProfile = {
  id: string
  full_name: string | null
  city: string | null
  area: string | null
  avatar_url: string | null
  archetype?: string | null
}

const profile = computed<MatchProfile>(() => {
  // ⬇️ bridge through `any` because MatchRow type doesn't declare `matched_profile`
  const raw = props.match as any
  return (raw.matched_profile as MatchProfile) || {
    id: '',
    full_name: null,
    city: null,
    area: null,
    avatar_url: null,
    archetype: null
  }
})

const summary = computed<CompatibilitySummary>(() => {
  return (props.match.compatibility_summary as CompatibilitySummary) || ({} as CompatibilitySummary)
})

const archetypeMeta = computed(() =>
    getArchetypeMeta(profile.value.archetype ?? null)
)

const tags = computed(() => {
  const s = summary.value
  const out: string[] = []

  if (s.cleanliness) out.push(`🧽 Cleanliness: ${s.cleanliness}`)
  if (s.noise) out.push(`🔈 Noise: ${s.noise}`)
  if (s.sleep) out.push(`🌙 Sleep: ${s.sleep}`)
  if (s.vibe) out.push(`✨ Vibe: ${s.vibe}`)
  if (!out.length) out.push('✨ Good overall vibe')

  return out
})

const initials = computed(() => {
  const name = profile.value.full_name?.trim() || ''
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