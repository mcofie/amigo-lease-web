<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-xl space-y-6">
      <!-- Title -->
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold">
          List your room or place
        </h1>
        <p class="text-sm text-gray-500">
          We’ll show this to people whose vibe and preferences match yours.
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input
                v-model="form.title"
                type="text"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g. Room in 2-bed apartment in Osu"
                required
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
                v-model="form.description"
                rows="3"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
                placeholder="Tell people what it’s like to live here, who you’re hoping to live with, etc."
            />
          </div>

          <!-- Location -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input
                  v-model="form.city"
                  type="text"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. Accra"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Area</label>
              <input
                  v-model="form.area"
                  type="text"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. Osu, East Legon"
              />
            </div>
          </div>

          <!-- Rent -->
          <div class="grid grid-cols-3 gap-3">
            <div class="col-span-2">
              <label class="block text-sm font-medium mb-1">Monthly rent</label>
              <input
                  v-model.number="form.monthly_rent"
                  type="number"
                  min="0"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. 2300"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Currency</label>
              <select
                  v-model="form.currency"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <!-- Beds/Baths + date -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1">Bedrooms</label>
              <input
                  v-model.number="form.bedrooms"
                  type="number"
                  min="0"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Bathrooms</label>
              <input
                  v-model.number="form.bathrooms"
                  type="number"
                  min="0"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Available from</label>
              <input
                  v-model="form.available_from"
                  type="date"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <!-- Error -->
          <p v-if="error" class="text-xs text-red-500">
            {{ error }}
          </p>

          <!-- Actions -->
          <div class="flex justify-between pt-2">
            <button
                type="button"
                class="text-xs text-gray-500 hover:text-gray-800"
                @click="goBack"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="text-sm px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
                :disabled="submitting"
            >
              {{ submitting ? 'Publishing…' : 'Publish listing' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success hint -->
      <div v-if="justCreated" class="text-xs text-green-600 text-center">
        Listing created! You’ll see it in your matches and host views.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import {useListings} from '~/composables/useListings'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {createListing, error} = useListings()

const submitting = ref(false)
const justCreated = ref(false)

const form = reactive({
  title: '',
  description: '',
  city: '',
  area: '',
  monthly_rent: null as number | null,
  currency: 'GHS',
  bedrooms: null as number | null,
  bathrooms: null as number | null,
  available_from: ''
})

onMounted(async () => {
  const {data: {user}} = await $supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
  }
})

const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true
  justCreated.value = false

  const created = await createListing({
    title: form.title,
    description: form.description || null,
    city: form.city || null,
    area: form.area || null,
    monthly_rent: form.monthly_rent,
    currency: form.currency,
    bedrooms: form.bedrooms,
    bathrooms: form.bathrooms,
    available_from: form.available_from || null
  })

  submitting.value = false

  if (created && !error.value) {
    justCreated.value = true
    // Optionally route somewhere:
    router.push('/matches') // or '/host/listings'
  }
}

const goBack = () => {
  router.back()
}
</script>