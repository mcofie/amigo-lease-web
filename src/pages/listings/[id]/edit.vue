<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-6xl mx-auto space-y-6">

      <!-- Header -->
      <header class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-4">
          <div
              class="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-700"
              @click="router.back()"
          >
            <span class="text-lg leading-none text-slate-700 dark:text-slate-300">←</span>
          </div>

          <div>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">Edit Listing</h1>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Host Dashboard · Update Details</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.is_active" class="sr-only peer">
              <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
              <span class="ms-3 text-sm font-medium text-slate-900 dark:text-slate-300 hidden sm:inline-block">{{ form.is_active ? 'Active' : 'Paused' }}</span>
            </label>
          </div>

          <div
              class="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
            <span class="relative flex h-2 w-2">
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Editing
            </span>
          </div>
        </div>
      </header>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div
              class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"/>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider animate-pulse">Loading Listing...</p>
        </div>
      </div>

      <div v-else class="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">

        <!-- LEFT: Form -->
        <div
            class="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 md:p-8 space-y-8 dark:bg-gray-900 dark:border-slate-800">
          <div class="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Listing Details</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Update basics, price, and amenities</p>
            </div>
            <span
                class="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold dark:bg-slate-800">1</span>
          </div>

          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Title & Description -->
            <div class="space-y-5">
              <div class="space-y-1.5">
                <label
                    class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Title</label>
                <input
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                    placeholder="e.g. Ensuite room in 2-bed in Osu"
                />
                <p class="text-[10px] text-slate-400 font-medium">Short, clear, and specific works best.</p>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Description</label>
                <textarea
                    v-model="form.description"
                    rows="4"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 resize-none dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                    placeholder="What’s it like to live here? What kind of roommate are you hoping for?"
                />
              </div>
            </div>

            <!-- Location -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Location</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label
                      class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">City</label>
                  <input
                      v-model="form.city"
                      type="text"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="Accra"
                  />
                </div>
                <div class="space-y-1.5">
                  <label
                      class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Area</label>
                  <input
                      v-model="form.area"
                      type="text"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="Osu"
                  />
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Pricing</p>
              <div class="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Monthly
                    Rent</label>
                  <input
                      v-model.number="form.monthly_rent"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="2300"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Currency</label>
                  <select
                      v-model="form.currency"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                  >
                    <option value="GHS">₵ GHS</option>
                    <option value="USD">$ USD</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Details -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Details</p>
              <div class="grid grid-cols-3 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bedrooms</label>
                  <input
                      v-model.number="form.bedrooms"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bathrooms</label>
                  <input
                      v-model.number="form.bathrooms"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Available</label>
                  <input
                      v-model="form.available_from"
                      type="date"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                  />
                </div>
              </div>
            </div>

            <!-- Amenities -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Amenities</p>
              <div class="flex flex-wrap gap-2">
                <button
                    v-for="amenity in amenityOptions"
                    :key="amenity.key"
                    type="button"
                    class="px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 flex items-center gap-1.5"
                    :class="
                    selectedAmenities.includes(amenity.key)
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md dark:bg-white dark:text-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-gray-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                  "
                    @click="toggleAmenity(amenity.key)"
                >
                  <span class="text-sm">{{ amenity.emoji }}</span>
                  <span>{{ amenity.label }}</span>
                </button>
              </div>
            </div>

            <!-- Photos -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Photos</p>
              <div class="space-y-3">
                <div v-for="(url, index) in photoInputs" :key="index" class="space-y-1">
                  <div class="relative">
                    <input
                        v-model="photoInputs[index]"
                        type="url"
                        class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                        :placeholder="`Image URL ${index + 1}`"
                    />
                  </div>
                </div>
              </div>
              <p class="text-[10px] text-slate-400 font-medium bg-slate-50 p-2 rounded-lg inline-block dark:bg-slate-800">
                ℹ️ Paste direct image links for now. Uploads coming soon.
              </p>
            </div>

            <!-- Error -->
            <div v-if="error"
                 class="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400">
              ⚠️ {{ error }}
            </div>

            <!-- Action Bar -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                  type="button"
                  class="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-2 py-2 rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                  @click="router.back()"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  class="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  :disabled="submitting || !form.title.trim()"
              >
                <span v-if="submitting"
                      class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        <!-- RIGHT: Preview -->
        <div class="relative hidden lg:block">
          <div class="sticky top-8 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2 dark:text-white">
                <span class="text-lg">👀</span> Live Preview
              </h3>
              <span
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-100 px-2 py-1 rounded dark:bg-slate-800">Seeker View</span>
            </div>

            <div
                class="rounded-3xl bg-white border border-slate-200 p-5 shadow-lg dark:bg-gray-900 dark:border-slate-800">
              <!-- Cover -->
              <div
                  class="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative mb-4 dark:bg-slate-800 dark:border-slate-700">
                <img
                    v-if="firstPhotoUrl"
                    :src="firstPhotoUrl"
                    alt="Preview"
                    class="w-full h-full object-cover"
                />
                <div v-else class="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                  <span class="text-3xl">🖼️</span>
                  <span class="text-[10px] font-bold uppercase tracking-wide">No Image</span>
                </div>
                <!-- Status badge simulation -->
                <div
                    class="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  Preview
                </div>
              </div>

              <!-- Content -->
              <div class="space-y-3">
                <div class="flex justify-between items-start">
                  <div class="space-y-1">
                    <h4 class="font-bold text-slate-900 text-base leading-tight line-clamp-2 dark:text-white">
                      {{ form.title || 'Listing Title' }}
                    </h4>
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span v-if="form.area">{{ form.area }}, </span>{{ form.city || 'City, Location' }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-slate-900 dark:text-white">
                      <span v-if="form.monthly_rent">{{ currencySymbol }}{{ formattedRent }}</span>
                      <span v-else class="text-slate-400">--</span>
                    </p>
                    <p class="text-[10px] font-medium text-slate-400">/month</p>
                  </div>
                </div>

                <!-- Pills -->
                <div class="flex flex-wrap gap-1.5">
                   <span
                       class="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                     🛏️ {{ form.bedrooms || '-' }} Bed
                   </span>
                  <span
                      class="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                     🛁 {{ form.bathrooms || '-' }} Bath
                   </span>
                </div>

                <!-- Description snippet -->
                <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 border-t border-slate-100 pt-3 mt-2 dark:text-slate-400 dark:border-slate-800">
                  {{ form.description || 'Your description will appear here...' }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Success Toast (Simple) -->
      <div v-if="justUpdated"
           class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-bounce-in dark:bg-white dark:text-slate-900">
        <span class="text-emerald-400">✓</span>
        <span class="text-sm font-bold">Listing Updated Successfully!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted, computed} from 'vue'
import {useRouter, useRoute, useNuxtApp} from '#imports'
import {useListings} from '~/composables/useListings'

useSeoMeta({
  title: 'Edit Listing - Amigo Lease',
  description: 'Edit your listing details on Amigo Lease.',
})

const router = useRouter()
const route = useRoute()
const {$supabase} = useNuxtApp()
const {updateListing, error: updateError} = useListings()

const loading = ref(true)
const submitting = ref(false)
const justUpdated = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  title: '',
  description: '',
  city: '',
  area: '',
  monthly_rent: null as number | null,
  currency: 'GHS',
  bedrooms: null as number | null,
  bathrooms: null as number | null,
  available_from: '',
  is_active: true
})

const amenityOptions = [
  {key: 'wifi', label: 'Wi-Fi', emoji: '📶'},
  {key: 'parking', label: 'Parking', emoji: '🅿️'},
  {key: 'ensuite', label: 'Ensuite', emoji: '🚿'},
  {key: 'ac', label: 'AC', emoji: '❄️'},
  {key: 'furnished', label: 'Furnished', emoji: '🛋️'},
  {key: 'washing_machine', label: 'Laundry', emoji: '🧺'},
  {key: 'generator', label: 'Power', emoji: '⚡'},
  {key: 'pets_allowed', label: 'Pets OK', emoji: '🐾'}
]

const selectedAmenities = ref<string[]>([])
const photoInputs = ref<string[]>(['', '', ''])

onMounted(async () => {
  const {
    data: {user}
  } = await $supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
    return
  }

  await loadListingData()
})

const loadListingData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id as string
    if (!id) {
      error.value = 'Invalid listing ID'
      return
    }

    // 1) Fetch listing
    const {data: listingData, error: listingErr} = await ($supabase as any)
        .schema('amigo')
        .from('listings')
        .select('*')
        .eq('id', id)
        .maybeSingle()

    if (listingErr || !listingData) {
      error.value = listingErr?.message ?? 'Listing not found'
      return
    }

    // Populate form
    form.title = listingData.title
    form.description = listingData.description || ''
    form.city = listingData.city || ''
    form.area = listingData.area || ''
    form.monthly_rent = listingData.monthly_rent
    form.currency = listingData.currency || 'GHS'
    form.bedrooms = listingData.bedrooms
    form.bathrooms = listingData.bathrooms
    form.available_from = listingData.available_from || ''
    form.is_active = listingData.is_active

    // 2) Fetch amenities
    const {data: amenData} = await ($supabase as any)
        .schema('amigo')
        .from('listing_amenities')
        .select('amenity_key')
        .eq('listing_id', id)

    selectedAmenities.value = (amenData || []).map((a: any) => a.amenity_key)

    // 3) Fetch photos
    const {data: photoData} = await ($supabase as any)
        .schema('amigo')
        .from('listing_photos')
        .select('url, sort_order')
        .eq('listing_id', id)
        .order('sort_order', {ascending: true})

    const urls = (photoData || []).map((p: any) => p.url)
    // Ensure we have at least 3 inputs
    while (urls.length < 3) urls.push('')
    photoInputs.value = urls
  } catch (e: any) {
    console.error('Error loading listing:', e)
    error.value = e.message || 'Failed to load listing'
  } finally {
    loading.value = false
  }
}

const currencySymbol = computed(() => {
  if (form.currency === 'USD') return '$'
  return '₵'
})

const formattedRent = computed(() => {
  if (form.monthly_rent == null) return ''
  try {
    return form.monthly_rent.toLocaleString()
  } catch {
    return String(form.monthly_rent)
  }
})

const firstPhotoUrl = computed(() => {
  const urls = photoInputs.value.map(u => u.trim()).filter(Boolean)
  return urls[0] || ''
})

const toggleAmenity = (key: string) => {
  if (selectedAmenities.value.includes(key)) {
    selectedAmenities.value = selectedAmenities.value.filter(k => k !== key)
  } else {
    selectedAmenities.value.push(key)
  }
}

const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true
  justUpdated.value = false
  error.value = null

  const id = route.params.id as string

  // 1) Update main listing
  const updated = await updateListing(id, {
    title: form.title,
    description: form.description || null,
    city: form.city || null,
    area: form.area || null,
    monthly_rent: form.monthly_rent,
    currency: form.currency,
    bedrooms: form.bedrooms,
    bathrooms: form.bathrooms,
    available_from: form.available_from || null,
    is_active: form.is_active
  })

  if (!updated || updateError.value) {
    error.value = updateError.value || 'Failed to update listing'
    submitting.value = false
    return
  }

  // 2) Update amenities (Delete all & re-insert)
  try {
    await ($supabase as any)
        .schema('amigo')
        .from('listing_amenities')
        .delete()
        .eq('listing_id', id)

    if (selectedAmenities.value.length) {
      const amenPayload = selectedAmenities.value.map(key => ({
        listing_id: id,
        amenity_key: key
      }))
      await ($supabase as any)
          .schema('amigo')
          .from('listing_amenities')
          .insert(amenPayload)
    }

    // 3) Update photos (Delete all & re-insert)
    await ($supabase as any)
        .schema('amigo')
        .from('listing_photos')
        .delete()
        .eq('listing_id', id)

    const urls = photoInputs.value.map(u => u.trim()).filter(Boolean)
    if (urls.length) {
      const photoPayload = urls.map((url, index) => ({
        listing_id: id,
        image_url: url,
        sort_order: index
      }))

      await ($supabase as any)
          .schema('amigo')
          .from('listing_photos')
          .insert(photoPayload)
    }
  } catch (e: any) {
    console.error('Failed to save extras', e)
    error.value = 'Saved details, but failed to update photos/amenities.'
  }

  submitting.value = false
  justUpdated.value = true

  // Delay navigation to show success toast
  setTimeout(() => {
    router.push(`/listings/${id}`)
  }, 1500)
}
</script>
