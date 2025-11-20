<!-- src/components/MatchCard.vue -->
<template>
  <div
      class="p-5 rounded-3xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition"
  >
    <!-- Header: avatar + name + score -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <img
            :src="profile.avatar_url || '/default-avatar.png'"
            alt=""
            class="h-12 w-12 rounded-full object-cover bg-gray-100"
        />

        <div class="space-y-0.5">
          <p class="font-medium text-gray-900">
            {{ profile.full_name || 'Unnamed' }}
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
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gray-50 border border-gray-200">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Good vibe potential
            </span>
            <span
                v-if="summary.pets && summary.pets !== 'unknown'"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-50 border border-orange-100"
            >
              <span>🐾</span>
              <span>{{ summary.pets === 'match' ? 'Pet-friendly match' : 'Pets might be tricky' }}</span>
            </span>
            <span
                v-if="summary.smoking && summary.smoking !== 'unknown'"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-50 border border-rose-100"
            >
              <span>🚭</span>
              <span>{{ summary.smoking === 'match' ? 'Aligned on smoking' : 'Different smoking habits' }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Score pill -->
      <div
          class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold text-right"
      >
        <div>{{ match.score }}%</div>
        <div class="text-[10px] opacity-90">compatibility</div>
      </div>
    </div>

    <!-- Compatibility tags -->
    <div v-if="tags.length" class="flex flex-wrap gap-2 text-[11px]">
      <span
          v-for="tag in tags"
          :key="tag"
          class="px-2.5 py-1 rounded-full bg-gray-900 text-white"
      >
        {{ tag }}
      </span>
    </div>

    <!-- CTA buttons -->
    <div class="flex gap-3 pt-2">
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

type MatchWithProfile = MatchRow & {
  matched_profile: {
    id: string
    full_name: string | null
    city: string | null
    area: string | null
    avatar_url: string | null
  }
}

const props = defineProps<{
  match: MatchWithProfile
}>()

const profile = computed(() => props.match.matched_profile)

const summary = computed<CompatibilitySummary>(() => {
  return (props.match.compatibility_summary as CompatibilitySummary) || {}
})


const tags = computed(() => {
  const s = summary.value
  const out: string[] = []

  if (s.cleanliness) out.push(`🧽 Cleanliness: ${s.cleanliness}`)
  if (s.noise) out.push(`🔈 Noise: ${s.noise}`)
  if (s.sleep) out.push(`🌙 Sleep: ${s.sleep}`)
  if (s.vibe) out.push(`✨ Vibe: ${s.vibe}`)

  // Fallback if nothing set
  if (!out.length) {
    out.push('✨ Good overall vibe')
  }

  return out
})
</script>