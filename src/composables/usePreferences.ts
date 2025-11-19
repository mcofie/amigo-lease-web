// src/composables/usePreferences.ts
import { ref, reactive } from 'vue'
import { useNuxtApp } from '#app'
import type { HomeVibe, RoommatePreferences } from '~/types/amigo'

export interface PreferencesFormState {
    preferred_age_min: number | null
    preferred_age_max: number | null

    allow_male: boolean
    allow_female: boolean
    allow_other: boolean

    must_allow_pets: boolean | null
    must_be_pet_friendly: boolean | null

    allow_smokers: boolean
    require_non_smoker: boolean

    min_cleanliness_level: number | null
    max_noise_tolerance: number | null

    preferred_home_vibe: HomeVibe | null

    prefers_works_from_home: boolean | null
    avoids_works_from_home: boolean | null
}

export const usePreferences = () => {
    const { $supabase } = useNuxtApp()

    const preferences = ref<RoommatePreferences | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const defaultFormState = (): PreferencesFormState => ({
        preferred_age_min: null,
        preferred_age_max: null,

        allow_male: true,
        allow_female: true,
        allow_other: true,

        must_allow_pets: null,
        must_be_pet_friendly: null,

        allow_smokers: true,
        require_non_smoker: false,

        min_cleanliness_level: null,
        max_noise_tolerance: null,

        preferred_home_vibe: null,

        prefers_works_from_home: null,
        avoids_works_from_home: null
    })

    const form = reactive<PreferencesFormState>(defaultFormState())

    const loadPreferences = async () => {
        loading.value = true
        error.value = null

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            loading.value = false
            error.value = authError?.message ?? 'Not authenticated'
            return
        }

        const { data, error: prefError } = await $supabase
            .schema('amigo')
            .from('roommate_preferences')
            .select('*')
            .eq('profile_id', user.id)
            .maybeSingle()

        if (prefError) {
            // It's okay if there is no row yet.
            if ((prefError as any).code !== 'PGRST116') {
                error.value = prefError.message
            }
            loading.value = false
            return
        }

        if (data) {
            const pref = data as RoommatePreferences
            preferences.value = pref

            form.preferred_age_min = pref.preferred_age_min
            form.preferred_age_max = pref.preferred_age_max

            form.allow_male = pref.allow_male
            form.allow_female = pref.allow_female
            form.allow_other = pref.allow_other

            form.must_allow_pets = pref.must_allow_pets
            form.must_be_pet_friendly = pref.must_be_pet_friendly

            form.allow_smokers = pref.allow_smokers
            form.require_non_smoker = pref.require_non_smoker

            form.min_cleanliness_level = pref.min_cleanliness_level
            form.max_noise_tolerance = pref.max_noise_tolerance

            // we read it into the form so UI still works,
            // but we won't write it back until enum is final
            form.preferred_home_vibe = pref.preferred_home_vibe

            form.prefers_works_from_home = pref.prefers_works_from_home
            form.avoids_works_from_home = pref.avoids_works_from_home
        }

        loading.value = false
    }

    // helpers to keep types tidy
    const numOrNull = (val: unknown): number | null => {
        if (typeof val === 'number' && Number.isFinite(val)) return val
        return null
    }

    const boolOrNull = (val: unknown): boolean | null => {
        if (typeof val === 'boolean') return val
        return null
    }

    const boolOrDefault = (val: unknown, fallback: boolean): boolean => {
        if (typeof val === 'boolean') return val
        return fallback
    }

    const savePreferences = async () => {
        loading.value = true
        error.value = null

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            loading.value = false
            error.value = authError?.message ?? 'Not authenticated'
            return null
        }

        const payload: Partial<RoommatePreferences> = {
            profile_id: user.id,
            preferred_age_min: numOrNull(form.preferred_age_min),
            preferred_age_max: numOrNull(form.preferred_age_max),

            allow_male: boolOrDefault(form.allow_male, true),
            allow_female: boolOrDefault(form.allow_female, true),
            allow_other: boolOrDefault(form.allow_other, true),

            must_allow_pets: boolOrNull(form.must_allow_pets),
            must_be_pet_friendly: boolOrNull(form.must_be_pet_friendly),

            allow_smokers: boolOrDefault(form.allow_smokers, true),
            require_non_smoker: boolOrDefault(form.require_non_smoker, false),

            min_cleanliness_level: numOrNull(form.min_cleanliness_level),
            max_noise_tolerance: numOrNull(form.max_noise_tolerance),

            // preferred_home_vibe intentionally omitted

            prefers_works_from_home: boolOrNull(form.prefers_works_from_home),
            avoids_works_from_home: boolOrNull(form.avoids_works_from_home)
        }

        const { data, error: upsertError } = await $supabase
            .schema('amigo')
            .from('roommate_preferences')
            .upsert(payload as any, { onConflict: 'profile_id' })
            .select('*')
            .maybeSingle()

        if (upsertError) {
            error.value = upsertError.message
            loading.value = false
            return null
        }

        if (!data) {
            // nothing came back – be explicit
            loading.value = false
            return null
        }

        preferences.value = data as RoommatePreferences
        loading.value = false
        return preferences.value
    }

    return {
        form,
        preferences,
        loading,
        error,
        loadPreferences,
        savePreferences
    }
}