<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Top bar -->
      <header class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <button
              class="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-800"
              @click="router.back()"
          >
            ← Back to listings
          </button>

          <div
              class="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm"
          >
            <span
                class="h-1.5 w-1.5 rounded-full"
                :class="listing?.is_active ? 'bg-emerald-400' : 'bg-amber-300'"
            />
            <span>Listing details</span>
          </div>
        </div>

        <p
            v-if="listing"
            class="hidden sm:block text-[11px] text-gray-400"
        >
          Viewed as a seeker
        </p>
      </header>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 rounded-full border-2 border-dashed border-gray-400 animate-spin" />
      </div>

      <!-- Error -->
      <div
          v-else-if="error"
          class="rounded-2xl bg-white/95 border border-red-100 text-center py-12 px-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
      >
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else-if="listing" class="space-y-8">
        <!-- Top: cover + title row -->
        <section
            class="rounded-3xl bg-white/95 border border-gray-200 shadow-[0_18px_40px_rgba(15,23,42,0.05)] overflow-hidden"
        >
          <!-- Cover -->
          <div class="relative h-56 w-full bg-gray-100">
            <img
                v-if="coverPhotoUrl"
                :src="coverPhotoUrl"
                alt="Listing photo"
                class="h-full w-full object-cover"
            />
            <div
                v-else
                class="h-full w-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 text-gray-400 text-xs"
            >
              <div
                  class="h-10 w-10 rounded-xl bg-white/80 border border-dashed border-gray-300 flex items-center justify-center text-lg"
              >
                📷
              </div>
              <p class="text-[11px] text-gray-500">
                No photos yet — add some later so people can picture the space.
              </p>
            </div>

            <!-- status badge -->
            <div
                class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 text-[11px] text-white"
            >
              <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="listing.is_active ? 'bg-emerald-400' : 'bg-amber-300'"
              />
              <span>{{ listing.is_active ? 'Active listing' : 'Paused listing' }}</span>
            </div>
          </div>

          <!-- Body -->
          <div class="p-5 md:p-6 space-y-6">
            <!-- Title + price -->
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div class="space-y-1.5">
                <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
                  {{ listing.title }}
                </h1>
                <p class="text-sm text-gray-500">
                  <span v-if="listing.area">{{ listing.area }}, </span>{{ listing.city || 'Location not set' }}
                </p>

                <div class="flex flex-wrap gap-2 text-[11px] text-gray-600 pt-1">
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100">
                    🛏️
                    <span>{{ listing.bedrooms ?? listing.total_bedrooms ?? '—' }} bedrooms</span>
                  </span>
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100">
                    🛁
                    <span>{{ listing.bathrooms ?? '—' }} bathrooms</span>
                  </span>
                  <span
                      v-if="listing.bathroom_type"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100"
                  >
                    🚿
                    <span>
                      {{ listing.bathroom_type === 'private' ? 'Private bathroom' : 'Shared bathroom' }}
                    </span>
                  </span>
                  <span
                      v-if="listing.available_from"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
                  >
                    📅
                    <span>Available {{ formattedAvailableFrom }}</span>
                  </span>
                </div>
              </div>

              <div class="text-right space-y-1">
                <p class="text-sm text-gray-500">Monthly rent</p>
                <p class="text-2xl font-semibold text-gray-900">
                  <span v-if="listing.monthly_rent != null">
                    {{ currencySymbol }}{{ formattedRent }}
                  </span>
                  <span v-else class="text-gray-400 text-base">
                    Set rent
                  </span>
                  <span class="text-xs text-gray-500 font-normal">/ month</span>
                </p>
              </div>
            </div>

            <!-- Host info -->
            <div class="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div class="flex items-center gap-3">
                <!-- avatar / initials -->
                <div class="flex-shrink-0">
                  <img
                      v-if="host?.avatar_url"
                      :src="host.avatar_url"
                      alt=""
                      class="h-10 w-10 rounded-full object-cover bg-gray-100 border border-gray-200"
                  />
                  <div
                      v-else
                      class="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold"
                  >
                    {{ hostInitials }}
                  </div>
                </div>
                <div class="space-y-0.5">
                  <p class="text-sm font-medium text-gray-900">
                    {{ host?.full_name || 'Host' }}
                  </p>
                  <p class="text-[11px] text-gray-500">
                    Hosting on Amigo Lease
                    <span v-if="hostLocation"> · {{ hostLocation }}</span>
                  </p>
                </div>
              </div>

              <button
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-medium hover:bg-black shadow-sm"
                  @click="goToChat"
              >
                Say hi to the host 👋
              </button>
            </div>
          </div>
        </section>

        <!-- Middle: description + amenities -->
        <section class="grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-6 items-start">
          <!-- Description -->
          <div class="rounded-2xl bg-white/95 border border-gray-200 p-5 space-y-3">
            <h2 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span>About this place</span>
              <span>🏡</span>
            </h2>

            <p
                v-if="listing.description"
                class="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
            >
              {{ listing.description }}
            </p>
            <p v-else class="text-sm text-gray-400 italic">
              The host hasn’t added a detailed description yet.
            </p>
          </div>

          <!-- Amenities + photos thumbnails -->
          <div class="space-y-4">
            <!-- Amenities -->
            <div class="rounded-2xl bg-white/95 border border-gray-200 p-5 space-y-3">
              <h3 class="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span>Amenities</span>
                <span>✨</span>
              </h3>

              <div v-if="amenityObjects.length" class="flex flex-wrap gap-1.5 text-[11px]">
                <span
                    v-for="a in amenityObjects"
                    :key="a.key"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-900 text-white"
                >
                  <span>{{ a.emoji }}</span>
                  <span>{{ a.label }}</span>
                </span>
              </div>
              <p v-else class="text-[11px] text-gray-400">
                No amenities added yet. The host can edit this listing to include Wi-Fi, parking, pets, and more.
              </p>
            </div>

            <!-- More photos / placeholder -->
            <div class="rounded-2xl bg-white/95 border border-gray-200 p-4 space-y-2">
              <p class="text-xs font-medium text-gray-800">
                More photos
              </p>

              <div v-if="photos.length > 1" class="flex gap-2 overflow-x-auto">
                <div
                    v-for="(p, idx) in photos.slice(1)"
                    :key="idx"
                    class="h-20 w-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                >
                  <img
                      :src="p.url"
                      alt="Listing photo"
                      class="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div
                  v-else
                  class="h-20 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-[11px] text-gray-400"
              >
                Additional photos will appear here once you add them.
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom: status note -->
        <section
            class="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 text-[11px] text-amber-800"
        >
          <p v-if="listing.is_active">
            This listing is currently <span class="font-semibold">active</span>. People whose quiz answers and budget
            match this place may see it in their results and can message you.
          </p>
          <p v-else>
            This listing is currently <span class="font-semibold">paused</span>. You can re-activate it from your
            listings dashboard when you’re ready.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, useNuxtApp } from '#imports'

const route = useRoute()
const router = useRouter()
const { $supabase } = useNuxtApp()

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
  { key: 'wifi', label: 'Wi-Fi', emoji: '📶' },
  { key: 'parking', label: 'Parking', emoji: '🅿️' },
  { key: 'ensuite', label: 'Ensuite bathroom', emoji: '🚿' },
  { key: 'ac', label: 'Air conditioning', emoji: '❄️' },
  { key: 'furnished', label: 'Furnished', emoji: '🛋️' },
  { key: 'washing_machine', label: 'Washing machine', emoji: '🧺' },
  { key: 'generator', label: 'Backup power', emoji: '⚡' },
  { key: 'pets_allowed', label: 'Pets allowed', emoji: '🐾' }
]

const loadListing = async () => {
  loading.value = true
  error.value = null

  const id = route.params.id as string

  // 1) Listing
  const { data: listingData, error: listingErr } = await $supabase
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
    const { data: hostData } = await $supabase
        .schema('amigo')
        .from('profiles')
        .select('id, full_name, avatar_url, city, area')
        .eq('id', listingRow.host_profile_id)
        .maybeSingle()

    host.value = hostData ? (hostData as Host) : null
  }

  // 3) Amenities
  const { data: amenData } = await $supabase
      .schema('amigo')
      .from('listing_amenities')
      .select('amenity_key')
      .eq('listing_id', id)

  amenityKeys.value = (amenData || []).map((a: { amenity_key: string }) => a.amenity_key)

  // 4) Photos
  const { data: photoData } = await $supabase
      .schema('amigo')
      .from('listing_photos')
      .select('url, sort_order')
      .eq('listing_id', id)
      .order('sort_order', { ascending: true })

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