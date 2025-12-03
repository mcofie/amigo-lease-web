// src/composables/useListings.ts
import { ref } from 'vue'
import { useNuxtApp } from '#app'

export interface ListingInput {
    title: string
    description: string | null
    city: string | null
    area: string | null
    monthly_rent: number | null
    deposit_amount: number | null
    utilities_estimate: number | null
    currency: string
    bedrooms: number | null
    bathrooms: number | null
    available_from: string | null // 'YYYY-MM-DD'
    available_to: string | null // 'YYYY-MM-DD'
    is_active?: boolean
    room_type: string | null
    bathroom_type: string | null
    total_bedrooms: number | null
    total_occupants: number | null
    max_additional_roommates: number | null
    has_pets: boolean
    smoking_allowed: boolean
    house_rules: string | null
}

export const useListings = () => {
    const { $supabase } = useNuxtApp()

    const listings = ref<any[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadListings = async () => {
        loading.value = true
        error.value = null

        const { data, error: fetchError } = await ($supabase as any)
            .schema('amigo')
            .from('listings')
            .select('*')
            .order('created_at', { ascending: false })

        if (fetchError) {
            error.value = fetchError.message
            loading.value = false
            return
        }

        listings.value = data || []
        loading.value = false
    }

    const loadMyListings = async () => {
        loading.value = true
        error.value = null

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            loading.value = false
            return
        }

        const { data, error: fetchError } = await ($supabase as any)
            .schema('amigo')
            .from('listings')
            .select('*')
            .eq('host_profile_id', user.id)
            .order('created_at', { ascending: false })

        if (fetchError) {
            error.value = fetchError.message
            loading.value = false
            return
        }

        listings.value = data || []
        loading.value = false
    }

    const createListing = async (payload: ListingInput) => {
        error.value = null
        loading.value = true

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            loading.value = false
            return null
        }

        const { data, error: insertError } = await ($supabase as any)
            .schema('amigo')
            .from('listings')
            .insert({
                host_profile_id: user.id,
                title: payload.title,
                description: payload.description,
                city: payload.city,
                area: payload.area,
                monthly_rent: payload.monthly_rent,
                deposit_amount: payload.deposit_amount,
                utilities_estimate: payload.utilities_estimate,
                currency: payload.currency,
                bedrooms: payload.bedrooms,
                bathrooms: payload.bathrooms,
                available_from: payload.available_from,
                available_to: payload.available_to,
                is_active: payload.is_active ?? true,
                room_type: payload.room_type,
                bathroom_type: payload.bathroom_type,
                total_bedrooms: payload.total_bedrooms,
                total_occupants: payload.total_occupants,
                max_additional_roommates: payload.max_additional_roommates,
                has_pets: payload.has_pets,
                smoking_allowed: payload.smoking_allowed,
                house_rules: payload.house_rules
            } as any)
            .select('*')
            .maybeSingle()

        if (insertError) {
            error.value = insertError.message
            loading.value = false
            return null
        }

        loading.value = false
        return data
    }

    const updateListing = async (id: string, payload: Partial<ListingInput>) => {
        error.value = null
        loading.value = true

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            loading.value = false
            return null
        }

        const updatePayload: any = {
            title: payload.title,
            description: payload.description,
            city: payload.city,
            area: payload.area,
            monthly_rent: payload.monthly_rent,
            deposit_amount: payload.deposit_amount,
            utilities_estimate: payload.utilities_estimate,
            currency: payload.currency,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            available_from: payload.available_from,
            available_to: payload.available_to,
            room_type: payload.room_type,
            bathroom_type: payload.bathroom_type,
            total_bedrooms: payload.total_bedrooms,
            total_occupants: payload.total_occupants,
            max_additional_roommates: payload.max_additional_roommates,
            has_pets: payload.has_pets,
            smoking_allowed: payload.smoking_allowed,
            house_rules: payload.house_rules
        }

        if (payload.is_active !== undefined) {
            updatePayload.is_active = payload.is_active
        }

        const { data, error: updateError } = await ($supabase as any)
            .schema('amigo')
            .from('listings')
            .update(updatePayload)
            .eq('id', id)
            .eq('host_profile_id', user.id) // Security: ensure ownership
            .select('*')
            .maybeSingle()

        if (updateError) {
            error.value = updateError.message
            loading.value = false
            return null
        }

        loading.value = false
        return data
    }

    const loadAmenities = async () => {
        const { data, error: fetchError } = await ($supabase as any)
            .schema('amigo')
            .from('amenities')
            .select('*')
            .order('label', { ascending: true })

        if (fetchError) {
            console.error('Error loading amenities:', fetchError)
            return []
        }
        return data || []
    }

    const saveAmenities = async (listingId: string, amenityKeys: string[]) => {
        // First delete existing
        await ($supabase as any)
            .schema('amigo')
            .from('listing_amenities')
            .delete()
            .eq('listing_id', listingId)

        if (amenityKeys.length === 0) return

        const payload = amenityKeys.map(key => ({
            listing_id: listingId,
            amenity_id: key
        }))

        const { error: insertError } = await ($supabase as any)
            .schema('amigo')
            .from('listing_amenities')
            .insert(payload)

        if (insertError) {
            throw insertError
        }
    }

    const deleteListing = async (id: string) => {
        error.value = null
        loading.value = true

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            loading.value = false
            return false
        }

        const { error: deleteError } = await ($supabase as any)
            .schema('amigo')
            .from('listings')
            .delete()
            .eq('id', id)
            .eq('host_profile_id', user.id) // Security: ensure ownership

        if (deleteError) {
            error.value = deleteError.message
            loading.value = false
            return false
        }

        loading.value = false
        return true
    }

    return {
        listings,
        loading,
        error,
        loadListings,
        loadMyListings,
        createListing,
        updateListing,
        loadAmenities,
        saveAmenities,
        deleteListing
    }
}