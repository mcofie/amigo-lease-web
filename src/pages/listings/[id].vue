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

        <p
            v-if="listing"
            class="hidden sm:block text-[10px] font-medium text-slate-400 uppercase tracking-wide dark:text-slate-500"
        >
          Viewed as Seeker
        </p>
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
          <div class="relative h-64 sm:h-72 w-full bg-slate-100 dark:bg-slate-800">
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
                  <span v-if="listing.bathroom_type"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                    🚿 {{ listing.bathroom_type === 'private' ? 'Private' : 'Shared' }}
                  </span>
                  <span v-if="listing.available_from"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400">
                    📅 {{ formattedAvailableFrom }}
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

          <!-- Left: Description -->
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

          <!-- Right: Amenities & Photos -->
          <div class="space-y-6">
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

const route = useRoute()
const router = useRouter()
const {$supabase} = useNuxtApp()

interface Listing {
  id: string
  host_profile_id: string | null
  title: string
  description: string | null
  city: string | null
  area: string | null
  is_active: boolean
  available_from: string | null
  monthly_rent: number | null
  currency: string | null
  bedrooms: number | null
  total_bedrooms: number | null
  bathrooms: number | null
  bathroom_type: 'private' | 'shared' | null
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

const amenityOptions = [
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

  const id = route.params.id as string

  // 1) Listing
  const {data: listingData, error: listingErr} = await $supabase
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
    const {data: hostData} = await $supabase
        .schema('amigo')
        .from('profiles')
        .select('id, full_name, avatar_url, city, area')
        .eq('id', listingRow.host_profile_id)
        .maybeSingle()

    host.value = hostData ? (hostData as Host) : null
  }

  // 3) Amenities
  const {data: amenData} = await $supabase
      .schema('amigo')
      .from('listing_amenities')
      .select('amenity_key')
      .eq('listing_id', id)

  amenityKeys.value = (amenData || []).map((a: { amenity_key: string }) => a.amenity_key)

  // 4) Photos
  const {data: photoData} = await $supabase
      .schema('amigo')
      .from('listing_photos')
      .select('url, sort_order')
      .eq('listing_id', id)
      .order('sort_order', {ascending: true})

  photos.value = (photoData as ListingPhoto[]) ?? []

  loading.value = false
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

const coverPhotoUrl = computed(() => {
  return photos.value[0]?.url ?? ''
})

const amenityObjects = computed(() =>
    amenityOptions.filter((a) => amenityKeys.value.includes(a.key))
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
</script>