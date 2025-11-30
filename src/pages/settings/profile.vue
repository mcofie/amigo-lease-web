<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-8">

      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Your Profile
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Profile Settings
          </h1>
          <p class="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base">
            This is what potential roommates and hosts will see. Keep it fresh!
          </p>
        </div>

        <div class="flex items-center gap-3 self-start md:self-auto">
          <button
              type="button"
              class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-gray-750"
              @click="goToQuiz"
          >
            <span>← Back to Quiz</span>
          </button>

          <div class="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md border-2 border-white dark:border-slate-800">
            {{ form.full_name ? form.full_name.charAt(0).toUpperCase() : '👤' }}
          </div>
        </div>
      </header>

      <!-- PROFILE CARD -->
      <div class="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 md:p-8 space-y-8 dark:bg-gray-900 dark:border-slate-800">
        <div class="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Basic Details</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">Name, role, and bio</p>
          </div>
          <span class="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold dark:bg-slate-800">1</span>
        </div>

        <form class="space-y-6" @submit.prevent="handleSave">
          <div class="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">

            <!-- Left Column: Inputs -->
            <div class="space-y-5">
              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Full Name</label>
                <input
                    v-model="form.full_name"
                    type="text"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                    placeholder="e.g. Ama Tetteh"
                />
                <p class="text-[10px] text-slate-400 font-medium">Use the name you’re comfortable sharing.</p>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Short Bio</label>
                <textarea
                    v-model="form.bio"
                    rows="4"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 resize-none dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                    placeholder="Tell people a bit about who you are outside of the house."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">City</label>
                  <input
                      v-model="form.city"
                      type="text"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="Accra"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Area</label>
                  <input
                      v-model="form.area"
                      type="text"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="East Legon"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: Role Selector -->
            <div class="space-y-3">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">
                I’m here as...
              </label>

              <div class="flex flex-col gap-3">
                <button
                    v-for="option in roleOptions"
                    :key="option.value"
                    type="button"
                    class="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200"
                    :class="form.role === option.value
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md dark:bg-white dark:text-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-gray-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'"
                    @click="form.role = option.value"
                >
                  <span class="text-xl">{{ option.emoji }}</span>
                  <span>{{ option.label }}</span>
                </button>
              </div>

              <div class="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed dark:bg-slate-800 dark:text-slate-400">
                <strong class="text-slate-900 dark:text-white">Note:</strong> This helps us filter matches. 'Both' shows you everything.
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-3">
               <span v-if="saved" class="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 animate-fade-in dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                 ✓ Changes Saved
               </span>
              <span v-if="error" class="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800">
                 ⚠️ {{ error }}
               </span>
            </div>

            <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                :disabled="saving"
            >
              <span v-if="saving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      <!-- FAVOURITES SECTION -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xl">❤️</span>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Saved Places</h2>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Rooms you've starred for later.</p>
          </div>
          <span class="text-xs font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 shadow-sm dark:bg-gray-800 dark:border-slate-700 dark:text-slate-300">
            {{ favorites.length }} Saved
          </span>
        </div>

        <!-- Loading -->
        <div v-if="favLoading" class="py-12 flex justify-center">
          <div class="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin dark:border-slate-700 dark:border-t-white" />
        </div>

        <!-- Empty State -->
        <div
            v-else-if="favorites.length === 0"
            class="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center dark:border-slate-800 dark:bg-gray-900/50"
        >
          <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-3 dark:bg-gray-800 dark:border-slate-700">
            <span class="text-xl opacity-50">⭐</span>
          </div>
          <p class="text-slate-500 text-sm font-medium dark:text-slate-400">No favorites yet. Start exploring!</p>
        </div>

        <!-- Favorites Grid -->
        <div v-else class="grid md:grid-cols-2 gap-4">
          <article
              v-for="fav in favorites"
              :key="fav.id"
              class="group bg-white rounded-2xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
              @click="goToListing(fav.listing?.id)"
          >
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-sm dark:bg-slate-800 dark:border-slate-700">
                🏠
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
                  {{ fav.listing?.title || 'Listing Unavailable' }}
                </h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  <span v-if="fav.listing?.area">{{ fav.listing?.area }}, </span>{{ fav.listing?.city || 'Location pending' }}
                </p>
              </div>
            </div>

            <div class="text-right">
              <p class="text-sm font-bold text-slate-900 dark:text-white">
                <span v-if="fav.listing?.monthly_rent">₵{{ formatRent(fav.listing?.monthly_rent) }}</span>
                <span v-else class="text-slate-400">--</span>
              </p>
              <p class="text-[10px] font-medium text-slate-400 uppercase tracking-wide">/mo</p>
            </div>
          </article>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import {useProfile} from '~/composables/useProfile'
import type {ProfileRole} from '~/types/amigo'

useSeoMeta({
  title: 'Profile Settings - Amigo Lease',
  description: 'Manage your profile and saved listings on Amigo Lease.',
})

const router = useRouter()
const {$supabase} = useNuxtApp()
const {profile, fetchProfile, upsertProfile, error} = useProfile()

const saving = ref(false)
const saved = ref(false)

// Added explicit typing for the roleOptions array to fix TypeScript error
const roleOptions: { value: ProfileRole; label: string; emoji: string }[] = [
  {value: 'seeker', label: 'Looking for a place', emoji: '🔎'},
  {value: 'host', label: 'I have a place', emoji: '🏡'},
  {value: 'both', label: 'Open to both', emoji: '✨'}
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
    data: {user}
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

  const {data, error: favErr} = await $supabase
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
      .order('created_at', {ascending: false})

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
    // Hide success message after 3s
    setTimeout(() => { saved.value = false }, 3000)
  }
}

const goToQuiz = () => {
  router.push('/onboarding/quiz')
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

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>