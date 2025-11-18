<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-3xl space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <p class="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide text-gray-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Profile
          </p>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Your profile
          </h1>
          <p class="text-sm text-gray-500">
            This is what potential roommates and hosts will see.
          </p>
        </div>

        <!-- Simple avatar placeholder -->
        <div
            class="hidden sm:flex h-12 w-12 rounded-full bg-gray-900 text-white items-center justify-center text-sm font-semibold shadow-md"
        >
          {{ form.full_name ? form.full_name.charAt(0).toUpperCase() : '👤' }}
        </div>
      </div>

      <!-- PROFILE CARD -->
      <div
          class="bg-white/90 border border-orange-100 rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.06)] p-5 md:p-7 space-y-5"
      >
        <form class="space-y-5" @submit.prevent="handleSave">
          <!-- Top row: name + role -->
          <div class="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
            <!-- Name -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-800">Full name</label>
              <input
                  v-model="form.full_name"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                  placeholder="e.g. Ama Tetteh"
              />
              <p class="text-[11px] text-gray-400">
                Use the name you’re comfortable sharing with potential roommates.
              </p>
            </div>

            <!-- Role -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-800">
                I’m here as
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                    v-for="option in roleOptions"
                    :key="option.value"
                    type="button"
                    class="px-3 py-1.5 rounded-full text-[11px] border transition shadow-sm"
                    :class="form.role === option.value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'"
                    @click="form.role = option.value"
                >
                  {{ option.label }}
                </button>
              </div>
              <p class="text-[11px] text-gray-400">
                This helps us decide whether to show you rooms, roommates, or both.
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <!-- Short bio -->
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-gray-800">
              Short bio
            </label>
            <textarea
                v-model="form.bio"
                rows="3"
                class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none placeholder:text-gray-400"
                placeholder="Tell people a bit about who you are outside of the house."
            ></textarea>
            <p class="text-[11px] text-gray-400">
              A couple of sentences about your lifestyle, work, or hobbies is perfect.
            </p>
          </div>

          <!-- City / Area -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-800">City</label>
              <input
                  v-model="form.city"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                  placeholder="e.g. Accra"
              />
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-800">Area / Neighbourhood</label>
              <input
                  v-model="form.area"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder:text-gray-400"
                  placeholder="e.g. East Legon"
              />
            </div>
          </div>

          <!-- Error / saved state -->
          <div class="flex items-center justify-between pt-1">
            <div class="min-h-[1.25rem]">
              <p v-if="error" class="text-xs text-red-500">
                {{ error }}
              </p>
              <p
                  v-else-if="saved"
                  class="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full"
              >
                <span>✅</span>
                <span>Profile updated</span>
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-2">
            <button
                type="button"
                class="text-xs text-gray-500 hover:text-gray-800 inline-flex items-center gap-1"
                @click="goBack"
            >
              ← Back
            </button>

            <button
                type="submit"
                class="inline-flex items-center justify-center text-sm px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black disabled:opacity-60 shadow-sm"
                :disabled="saving"
            >
              {{ saving ? 'Saving…' : 'Save changes' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Subtle hint -->
      <p class="text-[11px] text-gray-400">
        You can update your profile anytime. A strong profile helps you stand out in matches.
      </p>

      <!-- FAVOURITES / SAVED PLACES -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <p class="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide text-gray-500 uppercase">
              <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Saved places
            </p>
            <h2 class="text-lg font-semibold text-gray-900">
              Your favourites
            </h2>
            <p class="text-xs text-gray-500">
              Rooms and homes you’ve starred while browsing.
            </p>
          </div>
          <p class="text-[11px] text-gray-400">
            {{ favorites.length }} saved
          </p>
        </div>

        <!-- Loading favourites -->
        <div
            v-if="favLoading"
            class="rounded-2xl bg-white/80 border border-gray-200 py-8 flex items-center justify-center"
        >
          <div class="flex flex-col items-center gap-2 text-xs text-gray-500">
            <div class="h-8 w-8 rounded-full border-2 border-dashed border-gray-300 animate-spin" />
            <span>Loading your saved places…</span>
          </div>
        </div>

        <!-- Error favourites -->
        <div
            v-else-if="favError"
            class="rounded-2xl bg-white border border-red-100 py-6 px-4 text-xs text-red-600"
        >
          {{ favError }}
        </div>

        <!-- Empty -->
        <div
            v-else-if="favorites.length === 0"
            class="rounded-2xl bg-white/80 border border-dashed border-gray-200 py-8 px-4 text-center space-y-2"
        >
          <p class="text-sm text-gray-700 font-medium">
            You haven’t saved any places yet.
          </p>
          <p class="text-xs text-gray-500">
            When you tap the ♥ icon on a listing, it will appear here for quick access.
          </p>
        </div>

        <!-- List -->
        <div v-else class="grid gap-3">
          <article
              v-for="fav in favorites"
              :key="fav.id"
              class="rounded-2xl bg-white border border-gray-200 p-4 flex items-center justify-between gap-3 hover:shadow-sm transition cursor-pointer"
              @click="goToListing(fav.listing?.id)"
          >
            <div class="flex items-start gap-3">
              <!-- Tiny thumbnail placeholder -->
              <div
                  class="hidden sm:flex h-10 w-10 rounded-xl bg-orange-50 items-center justify-center text-base"
              >
                ❤️
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ fav.listing?.title || 'Listing unavailable' }}
                </p>
                <p class="text-[11px] text-gray-500">
                  <span v-if="fav.listing?.area || fav.listing?.city">
                    <span v-if="fav.listing?.area">{{ fav.listing?.area }}</span>
                    <span v-if="fav.listing?.area && fav.listing?.city"> · </span>
                    <span v-if="fav.listing?.city">{{ fav.listing?.city }}</span>
                  </span>
                  <span v-else>
                    Location not set
                  </span>
                </p>
                <p class="text-[11px] text-gray-400">
                  Saved on {{ formatDate(fav.created_at) }}
                </p>
              </div>
            </div>

            <div class="text-right space-y-1 text-[11px]">
              <p class="text-sm font-semibold text-gray-900">
                <span v-if="fav.listing?.monthly_rent != null">
                  {{ fav.listing?.currency === 'USD' ? '$' : '₵' }}{{ formatRent(fav.listing?.monthly_rent) }}
                  <span class="text-[10px] text-gray-500">/ month</span>
                </span>
                <span v-else class="text-gray-400">
                  Rent not set
                </span>
              </p>
              <p class="text-gray-500">
                <span v-if="fav.listing?.bedrooms != null">
                  {{ fav.listing?.bedrooms }} bed{{ fav.listing?.bedrooms === 1 ? '' : 's' }}
                </span>
                <span v-if="fav.listing?.bathrooms != null">
                  · {{ fav.listing?.bathrooms }} bath{{ fav.listing?.bathrooms === 1 ? '' : 's' }}
                </span>
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useNuxtApp } from '#imports'
import { useProfile } from '~/composables/useProfile'
import type { ProfileRole } from '~/types/amigo'

const router = useRouter()
const { $supabase } = useNuxtApp()
const { profile, fetchProfile, upsertProfile, error } = useProfile()

const saving = ref(false)
const saved = ref(false)

const roleOptions: { value: ProfileRole; label: string }[] = [
  { value: 'seeker', label: 'Looking for a place / roommate' },
  { value: 'host', label: 'I have a place, need a roommate' },
  { value: 'both', label: 'I’m open to both' }
]

const form = reactive({
  full_name: '',
  bio: '',
  city: '',
  area: '',
  role: 'seeker' as ProfileRole
})

// ---- favourites types / state ----
interface FavoriteWithListing {
  id: string
  created_at: string
  listing: {
    id: string
    title: string | null
    city: string | null
    area: string | null
    monthly_rent: number | null
    currency: string | null
    bedrooms: number | null
    bathrooms: number | null
  } | null
}

const favorites = ref<FavoriteWithListing[]>([])
const favLoading = ref(true)
const favError = ref<string | null>(null)

onMounted(async () => {
  const {
    data: { user }
  } = await $supabase.auth.getUser()

  if (!user) {
    router.push('/auth')
    return
  }

  // Load profile + favourites in parallel
  await Promise.all([fetchProfile(), loadFavorites(user.id)])

  if (profile.value) {
    form.full_name = (profile.value.full_name as string) ?? ''
    form.bio = (profile.value.bio as string) ?? ''
    form.city = profile.value.city ?? ''
    form.area = profile.value.area ?? ''
    form.role = (profile.value.role as ProfileRole) ?? 'seeker'
  }
})

const loadFavorites = async (profileId: string) => {
  favLoading.value = true
  favError.value = null

  const { data, error: favErr } = await $supabase
      .schema('amigo')
      .from('favorites')
      .select(
          `
      id,
      created_at,
      listing:listing_id (
        id,
        title,
        city,
        area,
        monthly_rent,
        currency,
        bedrooms,
        bathrooms
      )
    `
      )
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })

  if (favErr) {
    favError.value = favErr.message
    favLoading.value = false
    return
  }

  favorites.value = (data || []) as FavoriteWithListing[]
  favLoading.value = false
}

const handleSave = async () => {
  if (saving.value) return
  saving.value = true
  saved.value = false

  await upsertProfile({
    full_name: form.full_name || null,
    bio: form.bio || null,
    city: form.city || null,
    area: form.area || null,
    role: form.role
  })

  saving.value = false

  if (!error.value) {
    saved.value = true
  }
}

const goBack = () => {
  router.back()
}

// helpers for favourites
const formatDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatRent = (rent: number | null) => {
  if (rent == null) return ''
  try {
    return rent.toLocaleString()
  } catch {
    return String(rent)
  }
}

const goToListing = (listingId?: string) => {
  if (!listingId) return
  router.push(`/listing/${listingId}`)
}
</script>