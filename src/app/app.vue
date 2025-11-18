<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
import {useHead} from '#imports'

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    }
  ]
})

</script>

<style>
/* global styles here if needed */
</style>