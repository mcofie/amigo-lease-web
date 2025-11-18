// src/composables/usePublicProfile.ts
import {ref} from 'vue'
import {useNuxtApp} from '#app'
import type {RoommateTraits} from '~/types/amigo'

export interface PublicProfile {
    id: string
    full_name: string | null
    bio: string | null
    city: string | null
    area: string | null
    avatar_url: string | null
    has_place: boolean | null
    looking_for_place: boolean | null
    budget_min: number | null
    budget_max: number | null
}

export interface PublicListing {
    id: string
    title: string
    city: string | null
    area: string | null
    rent_amount: number | null
    currency: string | null
    available_from: string | null
    room_type: string | null
    is_active: boolean
    created_at: string
}

export const usePublicProfile = () => {
    const {$supabase} = useNuxtApp()

    const profile = ref<PublicProfile | null>(null)
    const traits = ref<RoommateTraits | null>(null)
    const listings = ref<PublicListing[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadPublicProfile = async (profileId: string) => {
        loading.value = true
        error.value = null

        const {data: profileData, error: profileError} = await $supabase
            .schema('amigo')
            .from('profiles')
            .select('*')
            .eq('id', profileId)
            .maybeSingle()

        if (profileError || !profileData) {
            error.value = profileError?.message ?? 'Profile not found'
            loading.value = false
            return
        }

        profile.value = profileData as PublicProfile

        const {data: traitsData, error: traitsError} = await $supabase
            .schema('amigo')
            .from('roommate_traits')
            .select('*')
            .eq('profile_id', profileId)
            .maybeSingle()

        if (!traitsError && traitsData) {
            traits.value = traitsData as RoommateTraits
        }

        const {data: listingsData, error: listingsError} = await $supabase
            .schema('amigo')
            .from('listings')
            .select('*')
            .eq('host_profile_id', profileId)
            .eq('is_active', true)
            .order('created_at', {ascending: false})

        if (!listingsError && listingsData) {
            listings.value = listingsData as PublicListing[]
        }

        loading.value = false
    }

    return {
        profile,
        traits,
        listings,
        loading,
        error,
        loadPublicProfile
    }
}