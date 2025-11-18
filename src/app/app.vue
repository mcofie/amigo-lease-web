<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  htmlAttrs: {lang: 'en'}
})
</script>

<style>
/* global styles here if needed */
</style>