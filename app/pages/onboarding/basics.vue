<!-- src/pages/onboarding/basics.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="w-full max-w-md space-y-6">
      <h1 class="text-2xl font-semibold text-center">
        Tell us a bit about your plans
      </h1>
      <p class="text-center text-sm text-gray-500">
        This helps us find roommates and places that fit your life.
      </p>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium mb-1">City</label>
          <input
              v-model="form.city"
              type="text"
              class="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. Accra"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Area / Neighbourhood</label>
          <input
              v-model="form.area"
              type="text"
              class="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. East Legon, Osu"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium mb-1">Budget min</label>
            <input
                v-model.number="form.budget_min"
                type="number"
                min="0"
                class="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="e.g. 1500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Budget max</label>
            <input
                v-model.number="form.budget_max"
                type="number"
                min="0"
                class="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="e.g. 2500"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium mb-1">Move-in from</label>
            <input
                v-model="form.move_in_from"
                type="date"
                class="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Move-in to</label>
            <input
                v-model="form.move_in_to"
                type="date"
                class="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <button
            type="submit"
            class="w-full rounded-lg px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-900 disabled:opacity-60"
            :disabled="submitting"
        >
          {{ submitting ? 'Saving...' : 'Continue' }}
        </button>

        <p v-if="error" class="text-xs text-red-500 text-center">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useProfile} from "../../../composables/useProfile";

const router = useRouter()
const { profile, upsertProfile, fetchProfile, error } = useProfile()

const submitting = ref(false)

const form = reactive({
  city: '',
  area: '',
  budget_min: null as number | null,
  budget_max: null as number | null,
  move_in_from: '',
  move_in_to: ''
})

onMounted(async () => {
  await fetchProfile()

  if (profile.value) {
    form.city = profile.value.city ?? ''
    form.area = profile.value.area ?? ''
    form.budget_min = profile.value.budget_min
    form.budget_max = profile.value.budget_max
    form.move_in_from = profile.value.move_in_from ?? ''
    form.move_in_to = profile.value.move_in_to ?? ''
  }
})

const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true

  await upsertProfile({
    city: form.city || null,
    area: form.area || null,
    budget_min: form.budget_min,
    budget_max: form.budget_max,
    move_in_from: form.move_in_from || null,
    move_in_to: form.move_in_to || null
  })

  submitting.value = false

  if (!error.value) {
    // Next step: quiz
    router.push('/onboarding/quiz')
  }
}
</script>