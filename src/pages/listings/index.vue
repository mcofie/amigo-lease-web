<!-- src/pages/listings/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-10">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <div
              class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Host dashboard</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Your listings
          </h1>
          <p class="text-sm text-gray-500 max-w-lg">
            Create and manage the rooms or apartments you’re offering on Amigo Lease.
          </p>
        </div>

        <div class="flex flex-col items-end gap-2">
          <p
              v-if="listings.length > 0 && !loading"
              class="text-[11px] text-gray-500"
          >
            {{ listings.length }} listing{{ listings.length === 1 ? '' : 's' }}
          </p>

          <div class="flex gap-2">
            <button
                type="button"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white text-gray-800 text-sm font-medium border border-gray-200 hover:bg-gray-50 shadow-sm disabled:opacity-60"
                :disabled="loading"
                @click="reload"
            >
              <span
                  class="mr-2 h-1.5 w-1.5 rounded-full"
                  :class="loading ? 'bg-emerald-400 animate-pulse' : 'bg-gray-300'"
              />
              <span>{{ loading ? 'Refreshing…' : 'Refresh' }}</span>
            </button>

            <button
                type="button"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black shadow-sm disabled:opacity-60"
                @click="goToNewListing"
            >
              <span class="mr-1.5 text-base">＋</span>
              <span>New listing</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Error -->
      <div
          v-if="error"
          class="rounded-3xl bg-white/95 border border-red-100 px-6 py-4 text-xs text-red-600 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
      >
        {{ error }}
      </div>

      <!-- Layout: list + quick-create form -->
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        <!-- Left: listings -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span>Your active places</span>
            <span class="text-[11px] text-gray-400">
              ({{ listings.length }} total)
            </span>
          </h2>

          <!-- Loading -->
          <div v-if="loading && listings.length === 0" class="py-10 flex justify-center">
            <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-400 animate-spin" />
          </div>

          <!-- Empty state -->
          <div
              v-else-if="listings.length === 0"
              class="rounded-3xl bg-white/95 border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-500 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
          >
            You don’t have any listings yet.
            <br />
            <span class="text-xs text-gray-400">
              Click <span class="font-medium text-gray-700">“New listing”</span> to publish your first place.
            </span>
          </div>

          <!-- List -->
          <div v-else class="space-y-3">
            <article
                v-for="l in listings"
                :key="l.id"
                class="rounded-3xl bg-white/95 border border-gray-200 px-4 py-4 md:px-5 md:py-5 shadow-sm hover:shadow-md hover:border-gray-300 transition text-sm flex flex-col gap-3 cursor-pointer"
                @click="goToListing(l.id)"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1">
                  <p class="text-sm font-semibold text-gray-900 line-clamp-1">
                    {{ l.title }}
                  </p>
                  <p class="text-xs text-gray-500">
                    <span v-if="l.area">{{ l.area }}, </span>{{ l.city || 'Location not set' }}
                  </p>
                </div>
                <div class="text-right text-xs text-gray-500">
                  <p class="font-semibold text-gray-900">
                    <span v-if="l.monthly_rent != null">
                      {{ l.currency || '₵' }}{{ l.monthly_rent }}
                    </span>
                    <span v-else class="text-gray-400">
                      Set rent
                    </span>
                    <span class="text-[11px] text-gray-500"> / month</span>
                  </p>
                  <p v-if="l.available_from" class="text-[11px]">
                    From {{ formatDate(l.available_from) }}
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 text-[11px] text-gray-600">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100">
                  🛏️
                  <span>{{ l.bedrooms ?? l.total_bedrooms ?? '—' }} bedrooms</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100">
                  🛁
                  <span>{{ l.bathrooms ?? '—' }} bathrooms</span>
                </span>
                <span
                    v-if="l.bathroom_type"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100"
                >
                  🚿
                  <span>
                    {{ l.bathroom_type === 'private' ? 'Private bathroom' : 'Shared bathroom' }}
                  </span>
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100">
                  {{ l.is_active ? '✅ Active' : '⏸️ Paused' }}
                </span>
              </div>

              <div class="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                <span>Click to view full details</span>
                <span class="inline-flex items-center gap-1">
                  <span>Open</span>
                  <span class="text-base leading-none">›</span>
                </span>
              </div>
            </article>
          </div>
        </section>

        <!-- Right: quick create form -->
        <section
            class="rounded-3xl bg-white/95 border border-gray-200 px-4 py-5 md:px-5 md:py-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)] space-y-4"
        >
          <div class="space-y-1">
            <h2 class="text-sm font-semibold text-gray-900">
              Quick add listing
            </h2>
            <p class="text-xs text-gray-500">
              Just the basics for now — you can open a listing later to refine photos and details.
            </p>
          </div>

          <form class="space-y-3 text-xs" @submit.prevent="handleCreate">
            <div class="space-y-1.5">
              <label class="block text-gray-700 font-medium">
                Title
              </label>
              <input
                  v-model="form.title"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  placeholder="e.g. Ensuite room in Osu, Accra"
                  required
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="block text-gray-700 font-medium">
                  City
                </label>
                <input
                    v-model="form.city"
                    type="text"
                    class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="e.g. Accra"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-gray-700 font-medium">
                  Area / neighbourhood
                </label>
                <input
                    v-model="form.area"
                    type="text"
                    class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="e.g. Osu"
                />
              </div>
            </div>

            <div class="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-3">
              <div class="space-y-1.5">
                <label class="block text-gray-700 font-medium">
                  Monthly rent
                </label>
                <div class="flex gap-2">
                  <select
                      v-model="form.currency"
                      class="w-20 rounded-xl border border-gray-200 px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  >
                    <option value="GHS">₵ GHS</option>
                    <option value="USD">$ USD</option>
                  </select>
                  <input
                      v-model.number="form.monthly_rent"
                      type="number"
                      min="0"
                      class="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="e.g. 2500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="block text-gray-700 font-medium">
                    Bedrooms
                  </label>
                  <input
                      v-model.number="form.bedrooms"
                      type="number"
                      min="0"
                      class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="e.g. 2"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-gray-700 font-medium">
                    Bathrooms
                  </label>
                  <input
                      v-model.number="form.bathrooms"
                      type="number"
                      min="0"
                      class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="e.g. 1"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-gray-700 font-medium">
                Available from
              </label>
              <input
                  v-model="form.available_from"
                  type="date"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-gray-700 font-medium">
                Short description
              </label>
              <textarea
                  v-model="form.description"
                  rows="3"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none"
                  placeholder="Tell people what makes this place a good fit..."
              />
            </div>

            <div class="pt-2 flex items-center justify-between gap-2">
              <p class="text-[11px] text-gray-400">
                You can always open a listing later to edit details or pause it.
              </p>
              <button
                  type="submit"
                  class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-medium hover:bg-black disabled:opacity-50"
                  :disabled="submitting || !form.title.trim()"
              >
                {{ submitting ? 'Saving…' : 'Publish listing' }}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from '#imports'
import { useListings, type ListingInput } from '~/composables/useListings'

const router = useRouter()
const { listings, loading, error, loadMyListings, createListing } = useListings()

const submitting = ref(false)

const form = reactive<ListingInput>({
  title: '',
  description: null,
  city: null,
  area: null,
  monthly_rent: null,
  currency: 'GHS',
  bedrooms: null,
  bathrooms: null,
  available_from: null
})

const reload = async () => {
  await loadMyListings()
}

onMounted(async () => {
  await loadMyListings()
})

const handleCreate = async () => {
  if (!form.title.trim()) return
  submitting.value = true

  const created = await createListing({ ...form })

  if (created) {
    // simple reset
    form.title = ''
    form.description = null
    form.city = null
    form.area = null
    form.monthly_rent = null
    form.bedrooms = null
    form.bathrooms = null
    form.available_from = null
  }

  submitting.value = false
  await loadMyListings()
}

const formatDate = (d: string) => {
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const goToListing = (id: string) => {
  router.push(`/listings/${id}`)
}

const goToNewListing = () => {
  router.push('/listings/new')
}
</script>