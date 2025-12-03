<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Top bar -->
      <header class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <button
              class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-white"
              @click="router.back()"
          >
            <span class="text-lg leading-none">←</span>
            <span>Back</span>
          </button>

          <div
              class="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10"
          >
            <span
                class="h-1.5 w-1.5 rounded-full"
                :class="listing?.is_active ? 'bg-emerald-500' : 'bg-amber-400'"
            />
            <span class="text-[10px] font-bold text-slate-600 uppercase tracking-wide dark:text-slate-300">Listing Details</span>
          </div>
        </div>

          <div class="flex items-center gap-3">
            <button
                v-if="listing"
                type="button"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200"
                :class="isFavorited
                  ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 dark:bg-white/10 dark:border-white/10 dark:text-slate-400 dark:hover:text-rose-400'"
                :disabled="favLoading"
                @click="toggleFavorite"
            >
              <span class="text-xl leading-none" :class="{ 'scale-110': isFavorited }">
                {{ isFavorited ? '❤️' : '🤍' }}
              </span>
            </button>

            <p
                v-if="listing"
                class="hidden sm:block text-[10px] font-medium text-slate-400 uppercase tracking-wide dark:text-slate-500"
            >
              Viewed as Seeker
            </p>
          </div>
      </header>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div
              class="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white"/>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider animate-pulse">Loading Listing...</p>
        </div>
      </div>

      <!-- Error -->
      <div
          v-else-if="error"
          class="rounded-2xl bg-white border border-rose-100 py-12 px-6 text-center shadow-sm dark:bg-gray-900 dark:border-rose-900"
      >
        <p class="text-sm font-bold text-rose-600 mb-1">
          Unable to load listing
        </p>
        <p class="text-xs text-rose-500/80">
          {{ error }}
        </p>
      </div>

      <!-- Content -->
      <div v-else-if="listing" class="space-y-6">

        <!-- Top: Cover + Title + Host -->
        <section
            class="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden dark:bg-gray-900 dark:border-slate-800">

          <!-- Cover Image Area -->
          <div class="relative h-64 sm:h-80 w-full bg-slate-100 dark:bg-slate-800">
            <img
                v-if="coverPhotoUrl"
                :src="coverPhotoUrl"
                alt="Listing photo"
                class="h-full w-full object-cover"
            />
            <div
                v-else
                class="h-full w-full flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800/50"
            >
              <div
                  class="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-sm dark:bg-slate-700 dark:border-slate-600">
                📷
              </div>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                No photos available yet.
              </p>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-4 left-4">
               <span
                   class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-md border shadow-sm"
                   :class="listing.is_active
                    ? 'bg-emerald-500/90 text-white border-emerald-400/50'
                    : 'bg-amber-400/90 text-amber-900 border-amber-300/50'"
               >
                  <span class="h-1.5 w-1.5 rounded-full bg-white/80"></span>
                  {{ listing.is_active ? 'Active' : 'Paused' }}
               </span>
            </div>
          </div>

          <!-- Main Details Body -->
          <div class="p-6 sm:p-8 space-y-8">

            <!-- Title & Price Row -->
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div class="space-y-2">
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight dark:text-white">
                  {{ listing.title }}
                </h1>
                <p class="text-sm font-medium text-slate-500 flex items-center gap-1.5 dark:text-slate-400">
                  <span class="text-lg">📍</span>
                  <span v-if="listing.area">{{ listing.area }}, </span>{{ listing.city || 'Location Pending' }}
                </p>

                <!-- Key Features -->
                <div class="flex flex-wrap gap-2 pt-2">
                  <span
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                    🛏️ {{ listing.bedrooms ?? listing.total_bedrooms ?? '-' }} Bed
                  </span>
                  <span
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                    🛁 {{ listing.bathrooms ?? '-' }} Bath
                  </span>
                  <span v-if="listing.room_type"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                    🏠 {{ listing.room_type === 'entire' ? 'Entire Place' : listing.room_type === 'shared' ? 'Shared Room' : 'Private Room' }}
                  </span>
                  <span v-if="listing.bathroom_type"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                    🚿 {{ listing.bathroom_type === 'private' ? 'Ensuite' : 'Shared Bath' }}
                  </span>
                </div>
              </div>

              <!-- Price Block -->
              <div
                  class="flex flex-col md:items-end gap-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-2xl font-bold text-slate-900 dark:text-white">
                     <span v-if="listing.monthly_rent != null">{{ currencySymbol }}{{ formattedRent }}</span>
                     <span v-else class="text-slate-400 text-lg italic">Not set</span>
                  </span>
                  <span class="text-xs font-medium text-slate-500 dark:text-slate-400">/mo</span>
                </div>
                
                <!-- Utilities & Deposit -->
                <div class="mt-2 space-y-1 text-right">
                  <p v-if="listing.utilities_estimate" class="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    + {{ currencySymbol }}{{ listing.utilities_estimate }} utilities (est.)
                  </p>
                  <p v-if="listing.deposit_amount" class="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {{ currencySymbol }}{{ listing.deposit_amount }} deposit
                  </p>
                </div>
              </div>
            </div>

            <div class="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>

            <!-- Host Info Row -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <!-- Host Avatar -->
                <div class="relative">
                  <div
                      class="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden">
                    <img
                        v-if="host?.avatar_url"
                        :src="host.avatar_url"
                        alt=""
                        class="h-full w-full object-cover"
                    />
                    <span v-else>{{ hostInitials }}</span>
                  </div>
                </div>

                <div class="space-y-0.5">
                  <p class="text-sm font-bold text-slate-900 dark:text-white">
                    Hosted by {{ host?.full_name || 'Host' }}
                  </p>
                  <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Member of Amigo Lease <span v-if="hostLocation">· {{ hostLocation }}</span>
                  </p>
                </div>
              </div>

              <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 transition-all dark:bg-white dark:text-slate-900"
                  @click="goToChat"
              >
                <span>Message Host</span>
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <!-- Content Grid: Description + Sidebar -->
        <div class="grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6 items-start">

          <!-- Left: Description & Details -->
          <div class="space-y-6">
            <!-- About -->
            <section
                class="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm dark:bg-gray-900 dark:border-slate-800">
              <h2 class="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 dark:text-white">
                <span class="text-lg">🏡</span>
                <span>About this place</span>
              </h2>

              <div
                  class="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed dark:prose-invert dark:text-slate-300">
                <p v-if="listing.description" class="whitespace-pre-line">
                  {{ listing.description }}
                </p>
                <p v-else class="italic text-slate-400">
                  The host hasn’t added a detailed description yet.
                </p>
              </div>
            </section>

            <!-- House Rules & Preferences -->
            <section
                class="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm dark:bg-gray-900 dark:border-slate-800">
              <h2 class="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 dark:text-white">
                <span class="text-lg">📋</span>
                <span>House Rules & Preferences</span>
              </h2>

              <div class="grid sm:grid-cols-2 gap-4 mb-6">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <span class="text-xl">{{ listing.has_pets ? '🐾' : '🚫' }}</span>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white">Pets</p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">{{ listing.has_pets ? 'Allowed' : 'Not allowed' }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <span class="text-xl">{{ listing.smoking_allowed ? '🚬' : '🚭' }}</span>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white">Smoking</p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">{{ listing.smoking_allowed ? 'Allowed' : 'Not allowed' }}</p>
                  </div>
                </div>
              </div>

              <div v-if="listing.house_rules">
                <h3 class="text-xs font-bold text-slate-900 mb-2 dark:text-white">Additional Rules</h3>
                <p class="text-sm text-slate-600 whitespace-pre-line dark:text-slate-300">
                  {{ listing.house_rules }}
                </p>
              </div>
            </section>
          </div>

          <!-- Right: Amenities, Availability & Photos -->
          <div class="space-y-6">
            
            <!-- Availability Card -->
            <div
                class="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm dark:bg-gray-900 dark:border-slate-800">
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 dark:text-white">
                <span class="text-lg">📅</span>
                <span>Availability</span>
              </h3>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Available From</span>
                  <span class="text-sm font-bold text-slate-900 dark:text-white">{{ formattedAvailableFrom || 'Now' }}</span>
                </div>
                <div v-if="listing.available_to" class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Available To</span>
                  <span class="text-sm font-bold text-slate-900 dark:text-white">{{ formattedAvailableTo }}</span>
                </div>
                <div class="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                <div class="flex justify-between items-center">
                  <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Min. Stay</span>
                  <span class="text-sm font-bold text-slate-900 dark:text-white">1 Month</span>
                </div>
              </div>
            </div>

            <!-- Amenities -->
            <div
                class="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm dark:bg-gray-900 dark:border-slate-800">
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 dark:text-white">
                <span class="text-lg">✨</span>
                <span>Amenities</span>
              </h3>

              <div v-if="amenityObjects.length" class="flex flex-wrap gap-2">
                <span
                    v-for="a in amenityObjects"
                    :key="a.key"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                >
                  <span>{{ a.emoji }}</span>
                  <span>{{ a.label }}</span>
                </span>
              </div>
              <p v-else class="text-xs text-slate-400 italic">
                No specific amenities listed.
              </p>
            </div>

            <!-- Additional Photos -->
            <div
                class="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm dark:bg-gray-900 dark:border-slate-800">
              <h3 class="text-sm font-bold text-slate-900 mb-4 dark:text-white">More Photos</h3>

              <div v-if="photos.length > 1" class="grid grid-cols-2 gap-2">
                <div
                    v-for="(p, idx) in photos.slice(1, 5)"
                    :key="idx"
                    class="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                >
                  <img
                      :src="p.url"
                      alt="Listing photo"
                      class="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div v-if="photos.length > 5"
                     class="aspect-square rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                  +{{ photos.length - 5 }} more
                </div>
              </div>

              <div
                  v-else
                  class="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 text-center p-4 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <span class="text-2xl opacity-50">🖼️</span>
                <p class="text-xs font-medium text-slate-400">No other photos available.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Note -->
        <div v-if="!listing.is_active"
             class="rounded-2xl bg-amber-50 border border-amber-100 p-4 flex gap-3 items-start dark:bg-amber-900/20 dark:border-amber-800">
          <span class="text-lg">⏸️</span>
          <div>
            <p class="text-xs font-bold text-amber-800 dark:text-amber-400">Listing Paused</p>
            <p class="text-xs text-amber-700 mt-0.5 dark:text-amber-500">
              This listing is currently hidden from search results.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {useRoute, useRouter, useNuxtApp} from '#imports'
import {useListings} from '~/composables/useListings'



const route = useRoute()
const router = useRouter()
const {$supabase} = useNuxtApp()

const {loadAmenities} = useListings()

interface Listing {
  id: string
  host_profile_id: string | null
  title: string
  description: string | null
  city: string | null
  area: string | null
  is_active: boolean
  available_from: string | null
  available_to: string | null
  monthly_rent: number | null
  deposit_amount: number | null
  utilities_estimate: number | null
  currency: string | null
  bedrooms: number | null
  total_bedrooms: number | null
  bathrooms: number | null
  bathroom_type: 'private' | 'shared' | null
  room_type: 'private' | 'shared' | 'entire' | null
  total_occupants: number | null
  max_additional_roommates: number | null
  has_pets: boolean
  smoking_allowed: boolean
  house_rules: string | null
}

interface ListingPhoto {
  url: string
  sort_order: number | null
}

interface Host {
  id: string
  full_name: string | null
  avatar_url: string | null
  city: string | null
  area: string | null
}

const listing = ref<Listing | null>(null)
const host = ref<Host | null>(null)
const photos = ref<ListingPhoto[]>([])
const amenityKeys = ref<string[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Favorites
const isFavorited = ref(false)
const favLoading = ref(false)

const amenityOptions = ref<any[]>([])

// Fallback amenities in case DB is empty or fails
const fallbackAmenities = [
  {key: 'wifi', label: 'Wi-Fi', emoji: '📶'},
  {key: 'parking', label: 'Parking', emoji: '🅿️'},
  {key: 'ensuite', label: 'Ensuite bathroom', emoji: '🚿'},
  {key: 'ac', label: 'Air conditioning', emoji: '❄️'},
  {key: 'furnished', label: 'Furnished', emoji: '🛋️'},
  {key: 'washing_machine', label: 'Washing machine', emoji: '🧺'},
  {key: 'generator', label: 'Backup power', emoji: '⚡'},
  {key: 'pets_allowed', label: 'Pets allowed', emoji: '🐾'}
]



const loadListing = async () => {
  loading.value = true
  error.value = null

  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if (!id) {
    error.value = 'Invalid listing ID'
    loading.value = false
    return
  }

  // 1) Listing
  const {data: listingData, error: listingErr} = await ($supabase as any)
      .schema('amigo')
      .from('listings')
      .select('*')
      .eq('id', id)
      .maybeSingle()

  if (listingErr || !listingData) {
    error.value = listingErr?.message ?? 'Listing not found'
    loading.value = false
    return
  }

  const listingRow = listingData as Listing
  listing.value = listingRow

  // 2) Host profile
  if (listingRow.host_profile_id) {
    const {data: hostData} = await ($supabase as any)
        .schema('amigo')
        .from('profiles')
        .select('id, full_name, avatar_url, city, area')
        .eq('id', listingRow.host_profile_id)
        .maybeSingle()

    host.value = hostData ? (hostData as Host) : null
  }

  // 3) Amenities
  const {data: amenData} = await ($supabase as any)
      .schema('amigo')
      .from('listing_amenities')
      .select('amenity_id')
      .eq('listing_id', id)

  amenityKeys.value = (amenData || []).map((a: { amenity_id: string }) => a.amenity_id)

  // 4) Photos
  const {data: photoData} = await ($supabase as any)
      .schema('amigo')
      .from('listing_photos')
      .select('url, sort_order')
      .eq('listing_id', id)
      .order('sort_order', {ascending: true})

  photos.value = (photoData as ListingPhoto[]) ?? []

  loading.value = false

  // 5) Check favorite status
  await checkFavoriteStatus()
}

const checkFavoriteStatus = async () => {
  const {data: {user}} = await $supabase.auth.getUser()
  if (!user) return

  const listingId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if (!listingId) return

  const {data} = await ($supabase as any)
      .schema('amigo')
      .from('favorites')
      .select('id')
      .eq('profile_id', user.id)
      .eq('listing_id', listingId)
      .maybeSingle()

  isFavorited.value = !!data
}

const toggleFavorite = async () => {
  if (favLoading.value) return
  favLoading.value = true

  const {data: {user}} = await $supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
    return
  }

  const listingId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if (!listingId) {
    favLoading.value = false
    return
  }

  if (isFavorited.value) {
    // Remove
    const {error} = await ($supabase as any)
        .schema('amigo')
        .from('favorites')
        .delete()
        .eq('profile_id', user.id)
        .eq('listing_id', listingId)

    if (!error) isFavorited.value = false
  } else {
    // Add
    const {error} = await ($supabase as any)
        .schema('amigo')
        .from('favorites')
        .insert({
          profile_id: user.id,
          listing_id: listingId
        })

    if (!error) isFavorited.value = true
  }

  favLoading.value = false
}

onMounted(async () => {
  await loadListing()
})

const currencySymbol = computed(() => {
  if (!listing.value) return '₵'
  return listing.value.currency === 'USD' ? '$' : '₵'
})

const formattedRent = computed(() => {
  if (!listing.value || listing.value.monthly_rent == null) return ''
  try {
    return listing.value.monthly_rent.toLocaleString()
  } catch {
    return String(listing.value.monthly_rent)
  }
})

const formattedAvailableFrom = computed(() => {
  if (!listing.value?.available_from) return ''
  const d = new Date(listing.value.available_from)
  if (Number.isNaN(d.getTime())) return listing.value.available_from
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const formattedAvailableTo = computed(() => {
  if (!listing.value?.available_to) return ''
  const d = new Date(listing.value.available_to)
  if (Number.isNaN(d.getTime())) return listing.value.available_to
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const coverPhotoUrl = computed(() => {
  return photos.value[0]?.url ?? ''
})

const amenityObjects = computed(() =>
    amenityOptions.value.filter((a) => amenityKeys.value.includes(a.key || a.code || a.id))
)

const hostLocation = computed(() => {
  if (!host.value) return null
  if (host.value.city && host.value.area) return `${host.value.area}, ${host.value.city}`
  return host.value.city || host.value.area || null
})

const hostInitials = computed(() => {
  const name = host.value?.full_name || 'Host'
  const trimmed = name.trim()
  if (!trimmed) return 'HT'

  const parts = trimmed.split(/\s+/).filter(Boolean)
  const first = parts[0]?.charAt(0)
  const second = parts[1]?.charAt(0)

  if (first && second) return (first + second).toUpperCase()
  if (first) return first.toUpperCase()
  return 'HT'
})

const goToChat = () => {
  if (!listing.value?.host_profile_id) return
  router.push(`/chat/${listing.value.host_profile_id}`)
}

useSeoMeta({
  title: computed(() => listing.value ? `${listing.value.title} - Amigo Lease` : 'Listing Details - Amigo Lease'),
  description: computed(() => listing.value?.description || 'View listing details on Amigo Lease.'),
  ogTitle: computed(() => listing.value ? `${listing.value.title} - Amigo Lease` : 'Listing Details - Amigo Lease'),
  ogDescription: computed(() => listing.value?.description || 'View listing details on Amigo Lease.'),
  ogImage: computed(() => photos.value[0]?.url || ''),
})
</script>