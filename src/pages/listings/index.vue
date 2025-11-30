<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-6xl mx-auto space-y-8">

      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div class="space-y-2">
          <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
            <span class="relative flex h-2 w-2">
              <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Host Dashboard
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your Listings
          </h1>
          <p class="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base">
            Create and manage the rooms or apartments you’re offering on Amigo Lease.
          </p>
        </div>

        <div class="flex flex-col items-end gap-3">
          <div class="flex gap-3">
            <button
                type="button"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm disabled:opacity-60 dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
                :disabled="loading"
                @click="reload"
            >
              <span
                  class="mr-2 h-1.5 w-1.5 rounded-full"
                  :class="loading ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'"
              />
              <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
            </button>

            <button
                type="button"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                @click="goToNewListingPage"
            >
              <span class="text-lg leading-none">+</span>
              <span>New Listing</span>
            </button>
          </div>
          <p v-if="listings.length > 0" class="text-xs font-medium text-slate-400 dark:text-slate-500">
            Showing {{ listings.length }} active {{ listings.length === 1 ? 'listing' : 'listings' }}
          </p>
        </div>
      </header>

      <!-- Error -->
      <div
          v-if="error"
          class="rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-sm font-medium text-rose-700 flex items-center gap-3 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400"
      >
        <span class="text-lg">⚠️</span>
        <span>{{ error }}</span>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">

        <!-- LEFT: Listings List -->
        <section class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 dark:text-white">
              <span class="text-xl">🏠</span>
              <span>Active Places</span>
            </h2>
          </div>

          <!-- Loading -->
          <div v-if="loading && listings.length === 0" class="py-12 flex justify-center">
            <div
                class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"/>
          </div>

          <!-- Empty State -->
          <div
              v-else-if="listings.length === 0"
              class="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center dark:border-slate-800 dark:bg-gray-900/50"
          >
            <div
                class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 dark:bg-gray-800 dark:border-slate-700">
              <span class="text-3xl">📦</span>
            </div>
            <h3 class="text-slate-900 font-bold text-lg mb-1 dark:text-white">No listings yet</h3>
            <p class="text-slate-500 text-sm mb-6 dark:text-slate-400">
              You haven't posted any places. Use the form on the right to get started!
            </p>
            <button
                @click="goToNewListing"
                class="text-slate-900 text-sm font-bold hover:underline dark:text-white"
            >
              Create your first listing →
            </button>
          </div>

          <!-- List Items -->
          <div v-else class="grid gap-4">
            <article
                v-for="l in listings"
                :key="l.id"
                class="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
                @click="goToListing(l.id)"
            >
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="space-y-1">
                  <h3 class="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 dark:text-white dark:group-hover:text-blue-400">
                    {{ l.title }}
                  </h3>
                  <p class="text-xs font-medium text-slate-500 flex items-center gap-1.5 dark:text-slate-400">
                    <span class="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
                    <span v-if="l.area">{{ l.area }}, </span>{{ l.city || 'Location Pending' }}
                  </p>
                </div>

                <div class="text-right">
                  <p class="font-bold text-slate-900 dark:text-white">
                    <span v-if="l.monthly_rent != null">{{ l.currency || '₵' }}{{ l.monthly_rent }}</span>
                    <span v-else class="text-slate-400 italic">Set rent</span>
                    <span class="text-xs font-normal text-slate-500 dark:text-slate-400">/mo</span>
                  </p>
                  <p v-if="l.available_from"
                     class="text-[10px] font-medium text-emerald-600 mt-0.5 dark:text-emerald-400">
                    Avail: {{ formatDate(l.available_from) }}
                  </p>
                </div>
              </div>

              <!-- Details Grid -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-100 dark:bg-gray-800 dark:text-slate-300 dark:border-slate-700">
                  🛏️ {{ l.bedrooms ?? l.total_bedrooms ?? '-' }} Beds
                </span>
                <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-100 dark:bg-gray-800 dark:text-slate-300 dark:border-slate-700">
                  🛁 {{ l.bathrooms ?? '-' }} Baths
                </span>
                <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-100 dark:bg-gray-800 dark:text-slate-300 dark:border-slate-700">
                  🚿 {{ l.bathroom_type === 'private' ? 'Private' : 'Shared' }}
                </span>
              </div>

              <!-- Footer Status -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                 <span
                     class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                     :class="l.is_active ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
                 >
                    <span class="w-1.5 h-1.5 rounded-full"
                          :class="l.is_active ? 'bg-green-500' : 'bg-slate-400'"></span>
                    {{ l.is_active ? 'Active' : 'Draft' }}
                 </span>

                <button
                    @click.stop="goToEditListing(l.id)"
                    class="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors flex items-center gap-1 dark:group-hover:text-white hover:underline"
                >
                    Edit <span class="text-lg leading-none">→</span>
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- RIGHT: Quick Create Form -->
        <aside class="relative">
          <div
              class="sticky top-24 rounded-3xl bg-white border border-slate-200 shadow-xl p-6 md:p-8 dark:bg-gray-900 dark:border-slate-800">
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm">⚡</div>
                <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide dark:text-white">Quick Add</h2>
              </div>
              <p class="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                Draft a listing in seconds. You can add photos and fine-tune details later.
              </p>
            </div>

            <form class="space-y-4" @submit.prevent="handleCreate">
              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Listing
                  Title</label>
                <input
                    v-model="form.title"
                    type="text"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                    placeholder="e.g. Sunny Room in Osu"
                    required
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label
                      class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">City</label>
                  <input
                      v-model="form.city"
                      type="text"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                      placeholder="Accra"
                  />
                </div>
                <div class="space-y-1.5">
                  <label
                      class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Area</label>
                  <input
                      v-model="form.area"
                      type="text"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                      placeholder="Cantonments"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Monthly
                  Rent</label>
                <div class="flex gap-2">
                  <select
                      v-model="form.currency"
                      class="w-24 rounded-xl bg-slate-50 border-0 px-3 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all cursor-pointer"
                  >
                    <option value="GHS">₵ GHS</option>
                    <option value="USD">$ USD</option>
                  </select>
                  <input
                      v-model.number="form.monthly_rent"
                      type="number"
                      min="0"
                      class="flex-1 rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                      placeholder="2500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bedrooms</label>
                  <input
                      v-model.number="form.bedrooms"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                      placeholder="1"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bathrooms</label>
                  <input
                      v-model.number="form.bathrooms"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                      placeholder="1"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Available
                  From</label>
                <input
                    v-model="form.available_from"
                    type="date"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all cursor-pointer"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Quick
                  Description</label>
                <textarea
                    v-model="form.description"
                    rows="3"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 resize-none dark:bg-gray-800 dark:text-white dark:focus:ring-white transition-all"
                    placeholder="Cozy room with AC, close to shops..."
                />
              </div>

              <div class="pt-4">
                <button
                    type="submit"
                    class="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    :disabled="submitting || !form.title.trim()"
                >
                  <span v-if="submitting" class="flex items-center gap-2">
                    <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Publishing...
                  </span>
                  <span v-else>Publish Listing</span>
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, onMounted, ref} from 'vue'
import {useRouter} from '#imports'
import {useListings, type ListingInput} from '~/composables/useListings'

const router = useRouter()
const {listings, loading, error, loadMyListings, createListing} = useListings()

useSeoMeta({
  title: 'My Listings - Amigo Lease',
  description: 'Manage your property listings on Amigo Lease.',
})

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

  const created = await createListing({...form})

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

const goToNewListingPage = () => {
  router.push(`/listings/new`)
}

const goToEditListing = (id: string) => {
  router.push(`/listings/${id}/edit`)
}

const goToNewListing = () => {
  // Focus the form instead of routing if on desktop, or route if mobile?
  // For now, let's just route to a dedicated page if you prefer,
  // but this template has the form inline.
  // If you want a separate page: router.push('/listings/new')

  // Since form is inline, maybe scroll to it on mobile?
  const formEl = document.querySelector('aside form')
  formEl?.scrollIntoView({behavior: 'smooth'})
}
</script>