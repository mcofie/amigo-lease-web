<template>
  <div class="min-h-screen bg-gray-50 px-4 py-10">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">
            My listings
          </h1>
          <p class="text-sm text-gray-500">
            Manage the rooms and homes you’re offering for roommates.
          </p>
        </div>

        <button
            type="button"
            class="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black"
            @click="goToNewListing"
        >
          + Add listing
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-400 animate-spin"/>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-2xl bg-white border border-red-100 py-10 text-center text-sm text-red-600">
        {{ error }}
      </div>

      <!-- Empty -->
      <div
          v-else-if="listings.length === 0"
          class="rounded-2xl bg-white border border-dashed border-gray-200 py-14 text-center space-y-2 text-sm"
      >
        <p class="text-gray-800 font-medium">
          You haven’t added any listings yet.
        </p>
        <p class="text-gray-500 text-xs">
          When you create a listing, we’ll use your vibe profile to help match you with the right roommates.
        </p>
      </div>

      <!-- Listings -->
      <div v-else class="grid gap-4">
        <div
            v-for="listing in listings"
            :key="listing.id"
            class="rounded-2xl bg-white border border-gray-200 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm"
        >
          <div class="space-y-1">
            <p class="font-medium text-gray-900">
              {{ listing.title }}
            </p>
            <p class="text-xs text-gray-500">
              <span v-if="listing.area">{{ listing.area }}, </span>{{ listing.city }}
            </p>
            <p class="text-xs text-gray-400">
              Available from: {{ listing.available_from || 'TBD' }}
            </p>
          </div>

          <div class="flex items-center gap-4 md:text-right">
            <div>
              <p class="text-sm font-semibold text-gray-900">
                ₵{{ listing.rent_amount ?? '—' }}
                <span class="text-xs text-gray-500">/ month</span>
              </p>
              <p class="text-[11px] text-gray-500">
                {{ listing.is_active ? 'Active' : 'Hidden' }}
              </p>
            </div>

            <div class="flex gap-2">
              <button
                  class="px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-700 hover:bg-gray-100"
                  @click="editListing(listing.id)"
              >
                Edit
              </button>
              <button
                  class="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-100"
                  @click="viewListingPublic(listing.id)"
              >
                View
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from '#imports'
import {useListings} from '~/composables/useListings'

const router = useRouter()
const {listings, loading, error, loadMyListings} = useListings()

onMounted(async () => {
  await loadMyListings()
})

const goToNewListing = () => {
  router.push('/listings/new') // you can implement this later
}

const editListing = (id: string) => {
  router.push(`/listings/${id}/edit`)
}

const viewListingPublic = (id: string) => {
  router.push(`/listing/${id}`)
}
</script>