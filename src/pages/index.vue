<template>
  <main class="min-h-screen w-full bg-white flex items-center justify-center p-6 select-none">
    <h1 class="font-asimovian text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-slate-900 tracking-normal text-center antialiased">
      Amigo Lease
    </h1>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Amigo Lease',
  description: 'Amigo Lease',
  ogTitle: 'Amigo Lease',
  ogDescription: 'Amigo Lease',
})
</script>

<style scoped>
.font-asimovian {
  font-family: 'Asimovian', cursive, sans-serif;
}
</style>