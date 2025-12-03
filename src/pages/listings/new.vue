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
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">Create Listing</h1>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Host Dashboard · New Place</p>
          </div>
        </div>

        <div
            class="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
            Drafting
          </span>
        </div>
      </header>

      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">

        <!-- LEFT: Form -->
        <div
            class="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 md:p-8 space-y-8 dark:bg-gray-900 dark:border-slate-800">
          <div class="flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Listing Details</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Basics, price, and amenities</p>
            </div>
            <span
                class="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold dark:bg-slate-800">1</span>
          </div>

          <form class="space-y-8" @submit.prevent="handleSubmit">
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
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Monthly
                    Rent</label>
                  <div class="relative">
                    <input
                        v-model.number="form.monthly_rent"
                        type="number"
                        min="0"
                        class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                        placeholder="2300"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <select v-model="form.currency" class="bg-transparent border-none text-xs font-bold text-slate-500 focus:ring-0 cursor-pointer">
                        <option value="GHS">GHS</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Deposit (Optional)</label>
                  <input
                      v-model.number="form.deposit_amount"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="0"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Utilities Estimate</label>
                  <input
                      v-model.number="form.utilities_estimate"
                      type="number"
                      min="0"
                      class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                      placeholder="e.g. 200"
                  />
                </div>
              </div>
            </div>

            <!-- Property Details -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Property Details</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Room Type</label>
                  <select v-model="form.room_type" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow">
                    <option value="private">Private Room</option>
                    <option value="shared">Shared Room</option>
                    <option value="entire">Entire Place</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bathroom Type</label>
                  <select v-model="form.bathroom_type" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow">
                    <option value="private">Private (Ensuite)</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bedrooms</label>
                  <input v-model.number="form.bedrooms" type="number" min="0" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Bathrooms</label>
                  <input v-model.number="form.bathrooms" type="number" min="0" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Total Bedrooms</label>
                  <input v-model.number="form.total_bedrooms" type="number" min="0" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Occupants</label>
                  <input v-model.number="form.total_occupants" type="number" min="0" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
              </div>
            </div>

            <!-- Availability & Preferences -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Availability & Rules</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Available From</label>
                  <input v-model="form.available_from" type="date" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Available To (Optional)</label>
                  <input v-model="form.available_to" type="date" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 cursor-pointer dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">Max Additional Roommates</label>
                  <input v-model.number="form.max_additional_roommates" type="number" min="0" class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow" />
                </div>
                <div class="flex items-center gap-6 pt-6">
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.has_pets" class="sr-only peer">
                    <div class="relative w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"></div>
                    <span class="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">Has Pets</span>
                  </label>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.smoking_allowed" class="sr-only peer">
                    <div class="relative w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"></div>
                    <span class="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300">Smoking Allowed</span>
                  </label>
                </div>
              </div>

              <div class="space-y-1.5 mt-4">
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide dark:text-slate-300">House Rules</label>
                <textarea
                    v-model="form.house_rules"
                    rows="3"
                    class="w-full rounded-xl bg-slate-50 border-0 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 resize-none dark:bg-slate-800 dark:text-white dark:focus:ring-white transition-shadow"
                    placeholder="Any specific rules? e.g. No overnight guests, quiet hours after 10pm..."
                />
              </div>
            </div>

            <!-- Amenities -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-2 dark:border-slate-800">
                Amenities</p>
              <div v-if="amenityOptions.length" class="flex flex-wrap gap-2">
                <button
                    v-for="amenity in amenityOptions"
                    :key="amenity.key || amenity.code"
                    type="button"
                    class="px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 flex items-center gap-1.5"
                    :class="
                    selectedAmenities.includes(amenity.key || amenity.code || amenity.id)
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md dark:bg-white dark:text-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-gray-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                  "
                    @click="toggleAmenity(amenity.key || amenity.code || amenity.id)"
                >
                  <span class="text-sm">{{ amenity.emoji }}</span>
                  <span>{{ amenity.label }}</span>
                </button>
              </div>
              <div v-else class="text-sm text-slate-500 italic">
                Loading amenities...
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
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                  type="button"
                  class="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
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
                <span v-else>Create Listing</span>
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
                   <span v-if="form.room_type"
                      class="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                     🏠 {{ form.room_type.replace('_', ' ') }}
                   </span>
                </div>

                <!-- Description snippet -->
                <p class="text-xs text-slate-500 leading-relaxed line-clamp-3 border-t border-slate-100 pt-3 mt-2 dark:text-slate-400 dark:border-slate-800">
                  {{ form.description || 'Your description will appear here...' }}
                </p>
              </div>
            </div>

            <div
                class="bg-slate-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed dark:bg-slate-800 dark:text-slate-400">
              <strong class="text-slate-900 dark:text-white">Tip:</strong> High-quality photos and a detailed
              description increase your chances of finding a great roommate by 3x.
            </div>
          </div>
        </div>

      </div>

      <!-- Success Toast (Simple) -->
      <div v-if="justCreated"
           class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-bounce-in dark:bg-white dark:text-slate-900">
        <span class="text-emerald-400">✓</span>
        <span class="text-sm font-bold">Listing Created Successfully!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted, computed} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import {useListings} from '~/composables/useListings'

useSeoMeta({
  title: 'New Listing - Amigo Lease',
  description: 'Create a new listing on Amigo Lease.',
})

const router = useRouter()
const {$supabase} = useNuxtApp()
const {createListing, loadAmenities, saveAmenities, error: createError} = useListings()

const submitting = ref(false)
const justCreated = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  title: '',
  description: '',
  city: '',
  area: '',
  monthly_rent: null as number | null,
  deposit_amount: null as number | null,
  utilities_estimate: null as number | null,
  currency: 'GHS',
  bedrooms: null as number | null,
  bathrooms: null as number | null,
  available_from: '',
  available_to: '',
  room_type: 'private',
  bathroom_type: 'shared',
  total_bedrooms: null as number | null,
  total_occupants: null as number | null,
  max_additional_roommates: null as number | null,
  has_pets: false,
  smoking_allowed: false,
  house_rules: ''
})

const amenityOptions = ref<any[]>([])
const selectedAmenities = ref<string[]>([])
const photoInputs = ref<string[]>(['', '', ''])

// Fallback amenities in case DB is empty or fails
const fallbackAmenities = [
  {key: 'wifi', label: 'Wi-Fi', emoji: '📶'},
  {key: 'parking', label: 'Parking', emoji: '🅿️'},
  {key: 'ensuite', label: 'Ensuite', emoji: '🚿'},
  {key: 'ac', label: 'AC', emoji: '❄️'},
  {key: 'furnished', label: 'Furnished', emoji: '🛋️'},
  {key: 'washing_machine', label: 'Laundry', emoji: '🧺'},
  {key: 'generator', label: 'Power', emoji: '⚡'},
  {key: 'pets_allowed', label: 'Pets OK', emoji: '🐾'}
]

onMounted(async () => {
  const {
    data: {user}
  } = await $supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
    return
  }

  // Load amenities
  const loaded = await loadAmenities()
  if (loaded && loaded.length > 0) {
    amenityOptions.value = loaded
  } else {
    amenityOptions.value = fallbackAmenities
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
    deposit_amount: form.deposit_amount,
    utilities_estimate: form.utilities_estimate,
    currency: form.currency,
    bedrooms: form.bedrooms,
    bathrooms: form.bathrooms,
    available_from: form.available_from || null,
    available_to: form.available_to || null,
    room_type: form.room_type || null,
    bathroom_type: form.bathroom_type || null,
    total_bedrooms: form.total_bedrooms,
    total_occupants: form.total_occupants,
    max_additional_roommates: form.max_additional_roommates,
    has_pets: form.has_pets,
    smoking_allowed: form.smoking_allowed,
    house_rules: form.house_rules || null
  })

  if (!created || error.value) {
    submitting.value = false
    return
  }

  const listingId = (created as any).id
  if (!listingId) {
    console.warn('Listing created but no id returned')
    submitting.value = false
    return
  }

  // 2) Save amenities & photos
  try {
    await saveAmenities(listingId, selectedAmenities.value)

    const urls = photoInputs.value.map(u => u.trim()).filter(Boolean)
    if (urls.length) {
      const photoPayload = urls.map((url, index) => ({
        listing_id: listingId,
        url: url,
        sort_order: index
      }))

      await ($supabase as any)
          .schema('amigo')
          .from('listing_photos')
          .insert(photoPayload as any[])
    }
  } catch (e) {
    console.error('Failed to save extras', e)
  }

  submitting.value = false
  justCreated.value = true

  // Delay navigation to show success toast
  setTimeout(() => {
    router.push('/listings')
  }, 1500)
}
</script>