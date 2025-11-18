<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-10">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Host dashboard</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            My listings
          </h1>
          <p class="text-sm text-gray-500">
            Manage the rooms and homes you’re offering for roommates.
          </p>
        </div>

        <button
            type="button"
            class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black shadow-sm"
            @click="goToNewListing"
        >
          <span class="mr-1 text-base">＋</span>
          Add listing
        </button>
      </header>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-400 animate-spin" />
      </div>

      <!-- Error -->
      <div
          v-else-if="error"
          class="rounded-3xl bg-white/95 border border-red-100 px-6 py-10 text-center text-sm text-red-600 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
      >
        {{ error }}
      </div>

      <!-- Empty -->
      <div
          v-else-if="listings.length === 0"
          class="rounded-3xl bg-white/95 border border-dashed border-gray-200 px-6 py-14 text-center space-y-3 shadow-[0_18px_40px_rgba(0,0,0,0.04)] text-sm"
      >
        <div class="text-3xl">🏠</div>
        <p class="text-gray-900 font-medium">
          You haven’t added any listings yet.
        </p>
        <p class="text-gray-500 text-xs max-w-sm mx-auto">
          When you create a listing, we’ll use your vibe profile to help match you with the right roommates.
        </p>
        <button
            type="button"
            class="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm hover:bg-black shadow-sm"
            @click="goToNewListing"
        >
          Add your first listing
        </button>
      </div>

      <!-- Listings -->
      <div v-else class="grid gap-4">
        <div
            v-for="listing in listings"
            :key="listing.id"
            class="rounded-3xl bg-white/95 border border-gray-200 px-4 py-4 md:px-5 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm shadow-sm hover:shadow-md hover:border-gray-300 transition"
        >
          <!-- Left side: main info -->
          <div class="space-y-1.5">
            <p class="font-medium text-gray-900">
              {{ listing.title || 'Untitled listing' }}
            </p>
            <p class="text-xs text-gray-500">
              <span v-if="listing.area">{{ listing.area }}, </span>{{ listing.city || 'City not set' }}
            </p>
            <p class="text-[11px] text-gray-400">
              Available from:
              <span class="font-medium text-gray-600">
                {{ listing.available_from || 'TBD' }}
              </span>
            </p>
          </div>

          <!-- Right side: price & actions -->
          <div class="flex items-end md:items-center gap-4 md:text-right justify-between md:justify-end w-full md:w-auto">
            <div class="space-y-0.5">
              <p class="text-sm font-semibold text-gray-900">
                ₵{{ listing.rent_amount ?? '—' }}
                <span class="text-xs text-gray-500">/ month</span>
              </p>
              <p
                  class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full"
                  :class="listing.is_active
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  : 'bg-gray-100 text-gray-500 border border-gray-200'"
              >
                <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="listing.is_active ? 'bg-emerald-500' : 'bg-gray-400'"
                />
                <span>{{ listing.is_active ? 'Active' : 'Hidden' }}</span>
              </p>
            </div>

            <div class="flex gap-2">
              <button
                  class="px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-700 bg-white hover:bg-gray-100"
                  @click.stop="editListing(listing.id)"
              >
                Edit
              </button>
              <button
                  class="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 bg-white hover:bg-gray-100"
                  @click.stop="viewListingPublic(listing.id)"
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
import { onMounted } from 'vue'
import { useRouter } from '#imports'
import { useListings } from '~/composables/useListings'

const router = useRouter()
const { listings, loading, error, loadMyListings } = useListings()

onMounted(async () => {
  await loadMyListings()
})

const goToNewListing = () => {
  router.push('/listings/new') // implement page later
}

const editListing = (id: string) => {
  router.push(`/listings/${id}/edit`)
}

const viewListingPublic = (id: string) => {
  router.push(`/listing/${id}`)
}
</script>