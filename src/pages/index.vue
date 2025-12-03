<template>
  <main
      class="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white"
  >
    <HeroSection />
    <div id="how-it-works">
      <HowItWorksSection />
    </div>
    <ArchetypesSection />
    <MatchesSection />
    <TestimonialsSection />
    <CtaSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '~/components/landing/HeroSection.vue'
import HowItWorksSection from '~/components/landing/HowItWorksSection.vue'
import ArchetypesSection from '~/components/landing/ArchetypesSection.vue'
import MatchesSection from '~/components/landing/MatchesSection.vue'
import TestimonialsSection from '~/components/landing/TestimonialsSection.vue'
import CtaSection from '~/components/landing/CtaSection.vue'

useSeoMeta({
  title: 'Amigo Lease - Find Your Perfect Roommate',
  description: 'Connect with compatible roommates in Accra. Match by vibe, lifestyle, and budget.',
  ogTitle: 'Amigo Lease - Find Your Perfect Roommate',
  ogDescription: 'Connect with compatible roommates in Accra. Match by vibe, lifestyle, and budget.',
})
</script>