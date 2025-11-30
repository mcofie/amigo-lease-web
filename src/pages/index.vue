<template>
  <main
      class="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white"
  >
    <HeroSection />
    <ArchetypesSection />
    <MatchesSection />
    <CtaSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '~/components/landing/HeroSection.vue'
import ArchetypesSection from '~/components/landing/ArchetypesSection.vue'
import MatchesSection from '~/components/landing/MatchesSection.vue'
import CtaSection from '~/components/landing/CtaSection.vue'
</script>