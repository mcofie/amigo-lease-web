<template>
  <div
      class="p-5 rounded-3xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img
            :src="profile.avatar_url || '/default-avatar.png'"
            class="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p class="font-medium text-gray-900">{{ profile.full_name || 'Unnamed' }}</p>
          <p class="text-xs text-gray-500">
            {{ profile.area ? `${profile.area}, ${profile.city}` : profile.city }}
          </p>
        </div>
      </div>

      <!-- Score -->
      <div
          class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold"
      >
        {{ match.score }}%
      </div>
    </div>

    <!-- Compatibility tags -->
    <div class="flex flex-wrap gap-2 text-xs">
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
const props = defineProps<{
  match: any
}>()

const profile = props.match.matched_profile

const tags = computed(() => {
  const summary = props.match.compatibility_summary || {}

  return [
    summary.cleanliness && `🧽 Cleanliness: ${summary.cleanliness}`,
    summary.noise && `🔈 Noise: ${summary.noise}`,
    summary.sleep && `🌙 Sleep: ${summary.sleep}`,
    summary.vibe && `✨ Vibe: ${summary.vibe}`
  ].filter(Boolean)
})
</script>