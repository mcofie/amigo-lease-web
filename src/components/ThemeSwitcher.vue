<template>
  <div class="relative">
    <button
        type="button"
        class="flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
        @click="toggleMenu"
        title="Change theme"
    >
      <span v-if="colorMode.preference === 'system'" class="text-lg">💻</span>
      <span v-else-if="colorMode.value === 'dark'" class="text-lg">🌙</span>
      <span v-else class="text-lg">☀️</span>
    </button>

    <!-- Dropdown -->
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
      <div
          v-if="isOpen"
          class="absolute right-0 top-full mt-2 w-32 rounded-xl bg-white border border-slate-100 shadow-xl py-1 z-50 origin-top-right dark:bg-gray-900 dark:border-slate-800"
      >
        <button
            v-for="theme in themes"
            :key="theme.value"
            class="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            :class="colorMode.preference === theme.value ? 'text-blue-600 font-bold dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'"
            @click="setTheme(theme.value)"
        >
          <span>{{ theme.icon }}</span>
          <span>{{ theme.label }}</span>
        </button>
      </div>
    </transition>

    <!-- Backdrop to close -->
    <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-transparent"
        @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()
const isOpen = ref(false)

const themes = [
  { value: 'system', label: 'System', icon: '💻' },
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const setTheme = (theme: string) => {
  colorMode.preference = theme
  isOpen.value = false
}
</script>
