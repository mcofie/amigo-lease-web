<template>
  <div
      class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white flex items-center justify-center px-4 py-10"
  >
    <div class="w-full max-w-5xl space-y-6">
      <!-- Header -->
      <div class="space-y-2 text-center">
        <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
          <span>Host listing</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
          List your room or place
        </h1>
        <p class="text-sm text-gray-500 max-w-xl mx-auto">
          Add the basics about your space. We’ll show it to people whose vibe and preferences match yours.
        </p>
      </div>

      <!-- Card -->
      <div
          class="bg-white/95 border border-orange-100 rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.06)] p-5 md:p-7"
      >
        <!-- Card header: steps -->
        <div class="flex items-center justify-between mb-5 text-[11px] text-gray-500">
          <div class="flex items-center gap-2">
            <span
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white text-[10px]">
              1
            </span>
            <span class="font-medium text-gray-800">Listing details</span>
            <span class="hidden sm:inline text-gray-400">·</span>
            <span class="hidden sm:inline">Basics, price, amenities</span>
          </div>
          <div class="flex items-center gap-2">
            <span
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500 text-[10px]">
              2
            </span>
            <span>Preview</span>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-5">
          <!-- FORM -->
          <div
              class="md:col-span-3 space-y-5 border-b md:border-b-0 md:border-r border-dashed border-gray-200 pr-0 md:pr-6 pb-5 md:pb-0">
            <form class="space-y-5" @submit.prevent="handleSubmit">
              <!-- Title -->
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-900">Title</label>
                <input
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                    placeholder="e.g. Ensuite room in 2-bed in Osu"
                />
                <p class="text-[11px] text-gray-400">
                  Short, clear, and specific works best.
                </p>
              </div>

              <!-- Description -->
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-900">Description</label>
                <textarea
                    v-model="form.description"
                    rows="3"
                    class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none placeholder:text-gray-400"
                    placeholder="What’s it like to live here? What kind of roommate are you hoping for?"
                />
                <p class="text-[11px] text-gray-400">
                  A few sentences about the space, vibe, and expectations is perfect.
                </p>
              </div>

              <!-- Location -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                  Location
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">City</label>
                    <input
                        v-model="form.city"
                        type="text"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                        placeholder="e.g. Accra"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">Area / neighbourhood</label>
                    <input
                        v-model="form.area"
                        type="text"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                        placeholder="e.g. Osu, East Legon"
                    />
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                  Pricing
                </p>
                <div class="grid grid-cols-3 gap-4">
                  <div class="col-span-2 space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">Monthly rent</label>
                    <input
                        v-model.number="form.monthly_rent"
                        type="number"
                        min="0"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                        placeholder="e.g. 2300"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">Currency</label>
                    <select
                        v-model="form.currency"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    >
                      <option value="GHS">₵ GHS</option>
                      <option value="USD">$ USD</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Details -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                  Details
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">Bedrooms</label>
                    <input
                        v-model.number="form.bedrooms"
                        type="number"
                        min="0"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">Bathrooms</label>
                    <input
                        v-model.number="form.bathrooms"
                        type="number"
                        min="0"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-900">Available from</label>
                    <input
                        v-model="form.available_from"
                        type="date"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
              </div>

              <!-- Amenities -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                  Amenities
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                      v-for="amenity in amenityOptions"
                      :key="amenity.key"
                      type="button"
                      class="px-3 py-1.5 rounded-full text-[11px] border transition flex items-center gap-1.5"
                      :class="
                      selectedAmenities.includes(amenity.key)
                        ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    "
                      @click="toggleAmenity(amenity.key)"
                  >
                    <span>{{ amenity.emoji }}</span>
                    <span>{{ amenity.label }}</span>
                  </button>
                </div>
                <p class="text-[11px] text-gray-400">
                  These help seekers quickly decide if your place fits their basics.
                </p>
              </div>

              <!-- Photos -->
              <div class="space-y-2">
                <p class="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                  Photos (optional)
                </p>
                <div class="space-y-2">
                  <div
                      v-for="(url, index) in photoInputs"
                      :key="index"
                      class="space-y-1.5"
                  >
                    <label class="block text-[11px] text-gray-500">
                      Photo URL {{ index + 1 }}
                    </label>
                    <input
                        v-model="photoInputs[index]"
                        type="url"
                        class="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                        placeholder="https://…"
                    />
                  </div>
                </div>
                <p class="text-[11px] text-gray-400">
                  Image uploads are coming soon — for now you can paste links to hosted images.
                </p>
              </div>

              <!-- Error -->
              <p v-if="error" class="text-xs text-red-500">
                {{ error }}
              </p>

              <!-- Actions -->
              <div class="flex items-center justify-between pt-2">
                <button
                    type="button"
                    class="text-xs text-gray-500 hover:text-gray-800 inline-flex items-center gap-1"
                    @click="goBack"
                >
                  ← Cancel
                </button>
                <button
                    type="submit"
                    class="inline-flex items-center justify-center text-sm px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black disabled:opacity-60 shadow-sm"
                    :disabled="submitting || !form.title.trim()"
                >
                  {{ submitting ? 'Publishing…' : 'Publish listing' }}
                </button>
              </div>
            </form>
          </div>

          <!-- PREVIEW -->
          <div class="md:col-span-2 space-y-3 pt-4 md:pt-0 md:pl-2">
            <div class="flex items-center justify-between text-xs text-gray-500">
              <p class="font-medium text-gray-700 flex items-center gap-1.5">
                <span class="text-base">👀</span> Live preview
              </p>
              <p class="text-[11px]">
                What seekers will see
              </p>
            </div>

            <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-3">
              <div class="rounded-xl bg-white border border-gray-200 p-4 space-y-2 shadow-sm">
                <!-- Photo -->
                <div
                    v-if="firstPhotoUrl"
                    class="mb-2 rounded-lg overflow-hidden bg-gray-100 h-32 w-full flex items-center justify-center"
                >
                  <img
                      :src="firstPhotoUrl"
                      alt="Listing photo preview"
                      class="h-full w-full object-cover"
                  />
                </div>

                <!-- Title + price row -->
                <div class="flex items-start justify-between gap-3">
                  <div class="space-y-1">
                    <p class="text-sm font-semibold text-gray-900">
                      {{ form.title || 'Room in 2-bed apartment in Osu' }}
                    </p>
                    <p class="text-[11px] text-gray-500">
                      <span v-if="form.area || form.city">
                        <span v-if="form.area">{{ form.area }}</span>
                        <span v-if="form.area && form.city"> · </span>
                        <span v-if="form.city">{{ form.city }}</span>
                      </span>
                      <span v-else>
                        Location not set
                      </span>
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold text-gray-900">
                      <span v-if="form.monthly_rent != null">
                        {{ currencySymbol }}{{ formattedRent }}
                      </span>
                      <span v-else class="text-gray-400">
                        Set rent
                      </span>
                    </p>
                    <p class="text-[11px] text-gray-500">
                      / month
                    </p>
                  </div>
                </div>

                <!-- Meta pills -->
                <div class="flex flex-wrap gap-1.5 text-[11px] text-gray-600 mt-1">
                  <span
                      v-if="form.bedrooms != null"
                      class="px-2 py-0.5 rounded-full bg-gray-100"
                  >
                    {{ form.bedrooms }} bed{{ form.bedrooms === 1 ? '' : 's' }}
                  </span>
                  <span
                      v-if="form.bathrooms != null"
                      class="px-2 py-0.5 rounded-full bg-gray-100"
                  >
                    {{ form.bathrooms }} bath{{ form.bathrooms === 1 ? '' : 's' }}
                  </span>
                  <span
                      v-if="form.available_from"
                      class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700"
                  >
                    Available {{ form.available_from }}
                  </span>
                  <span
                      v-if="!form.bedrooms && !form.bathrooms && !form.available_from"
                      class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                  >
                    Add details to help people decide
                  </span>
                </div>

                <!-- Amenity chips -->
                <div
                    v-if="selectedAmenityObjects.length"
                    class="flex flex-wrap gap-1.5 mt-2"
                >
                  <span
                      v-for="amenity in selectedAmenityObjects"
                      :key="amenity.key"
                      class="px-2 py-0.5 rounded-full bg-orange-50 text-[11px] text-orange-700 border border-orange-100 flex items-center gap-1"
                  >
                    <span>{{ amenity.emoji }}</span>
                    <span>{{ amenity.label }}</span>
                  </span>
                </div>

                <!-- Description snippet -->
                <p class="text-[11px] text-gray-500 mt-2 line-clamp-3">
                  {{
                    form.description ||
                    'A cosy shared home with friendly housemates. Add a short description so people can imagine living here.'
                  }}
                </p>
              </div>
            </div>

            <p class="text-[11px] text-gray-400">
              This is a rough preview — in the app, we’ll also show your profile photo and vibe.
            </p>
          </div>
        </div>
      </div>

      <!-- Success hint -->
      <div v-if="justCreated" class="text-xs text-emerald-700 text-center">
        Listing created! You’ll see it in your matches and host views.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted, computed} from 'vue'
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

const selectedAmenities = ref<string[]>([])
const photoInputs = ref<string[]>(['', '', ''])

onMounted(async () => {
  const {
    data: {user}
  } = await $supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
  }
})

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

const selectedAmenityObjects = computed(() =>
    amenityOptions.filter(a => selectedAmenities.value.includes(a.key))
)

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
  justCreated.value = false

  // 1) Create main listing
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

  if (!created || error.value) {
    submitting.value = false
    return
  }

  const listingId = (created as any).id
  if (!listingId) {
    console.warn('Listing created but no id returned from createListing')
    submitting.value = false
    return
  }

  // 2) (Optional) save amenities
  // NOTE: Your DB schema for listing_amenities uses (listing_id, amenity_id).
  // To actually insert these, you’ll want a mapping from `key` -> amenity_id
  // loaded from amigo.amenities. For now we just keep them in UI / preview.

  // 3) Save photos (listings_photos.image_url)
  try {
    const urls = photoInputs.value.map(u => u.trim()).filter(Boolean)
    if (urls.length) {
      const photoPayload = urls.map((url, index) => ({
        listing_id: listingId,
        image_url: url,
        sort_order: index
      }))

      await ($supabase as any)
          .schema('amigo')
          .from('listing_photos')
          .insert(photoPayload as any[])
    }
  } catch (e) {
    console.error('Failed to save photos', e)
  }

  submitting.value = false
  justCreated.value = true
  router.push('/matches') // or '/listings' if you prefer
}

const goBack = () => {
  router.back()
}
</script>