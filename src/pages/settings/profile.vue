<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-xl space-y-6">
      <!-- Title -->
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold">
          Your profile
        </h1>
        <p class="text-sm text-gray-500">
          This is what potential roommates and hosts will see.
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
        <form class="space-y-4" @submit.prevent="handleSave">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium mb-1">Full name</label>
            <input
                v-model="form.full_name"
                type="text"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g. Ama Tetteh"
            />
          </div>

          <!-- Short bio -->
          <div>
            <label class="block text-sm font-medium mb-1">Short bio</label>
            <textarea
                v-model="form.bio"
                rows="3"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
                placeholder="Tell people a bit about who you are outside of the house."
            />
          </div>

          <!-- City / Area -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input
                  v-model="form.city"
                  type="text"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. Accra"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Area</label>
              <input
                  v-model="form.area"
                  type="text"
                  class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. East Legon"
              />
            </div>
          </div>

          <!-- Role (just display / light control) -->
          <div>
            <label class="block text-sm font-medium mb-1">I’m here as</label>
            <div class="flex flex-wrap gap-2">
              <button
                  type="button"
                  v-for="option in roleOptions"
                  :key="option.value"
                  class="px-3 py-1.5 rounded-full text-xs border transition"
                  :class="form.role === option.value
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'"
                  @click="form.role = option.value"
              >
                {{ option.label }}
              </button>
            </div>
            <p class="mt-1 text-[11px] text-gray-400">
              This helps us understand whether to show you rooms, roommates, or both.
            </p>
          </div>

          <!-- Error -->
          <p v-if="error" class="text-xs text-red-500">
            {{ error }}
          </p>

          <!-- Actions -->
          <div class="flex justify-between pt-2">
            <button
                type="button"
                class="text-xs text-gray-500 hover:text-gray-800"
                @click="goBack"
            >
              Back
            </button>
            <button
                type="submit"
                class="text-sm px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
                :disabled="saving"
            >
              {{ saving ? 'Saving…' : 'Save changes' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Saved hint -->
      <p v-if="saved" class="text-xs text-green-600">
        Profile updated.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useNuxtApp} from '#imports'
import {useProfile} from '~/composables/useProfile'
import type {ProfileRole} from '~/types/amigo'

const router = useRouter()
const {$supabase} = useNuxtApp()
const {profile, fetchProfile, upsertProfile, error} = useProfile()

const saving = ref(false)
const saved = ref(false)

const roleOptions: { value: ProfileRole; label: string }[] = [
  {value: 'seeker', label: 'Looking for a place / roommate'},
  {value: 'host', label: 'I have a place, need a roommate'},
  {value: 'both', label: 'I’m open to both'}
]

const form = reactive({
  full_name: '',
  bio: '',
  city: '',
  area: '',
  role: 'seeker' as ProfileRole
})

onMounted(async () => {
  const {data: {user}} = await $supabase.auth.getUser()
  if (!user) {
    router.push('/auth')
    return
  }

  await fetchProfile()

  if (profile.value) {
    form.full_name = (profile.value.full_name as string) ?? ''
    form.bio = (profile.value.bio as string) ?? ''
    form.city = profile.value.city ?? ''
    form.area = profile.value.area ?? ''
    form.role = (profile.value.role as ProfileRole) ?? 'seeker'
  }
})

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
</script>