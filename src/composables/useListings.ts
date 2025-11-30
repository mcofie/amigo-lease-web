// src/composables/useListings.ts
import { ref } from 'vue'
import { useNuxtApp } from '#app'

export interface ListingInput {
    title: string
    description: string | null
    city: string | null
    area: string | null
    monthly_rent: number | null
    currency: string
    bedrooms: number | null
    bathrooms: number | null
    available_from: string | null // 'YYYY-MM-DD'
    is_active?: boolean
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
                currency: payload.currency,
                bedrooms: payload.bedrooms,
                bathrooms: payload.bathrooms,
                available_from: payload.available_from,
                is_active: payload.is_active ?? true
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
            currency: payload.currency,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            available_from: payload.available_from
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

    return {
        listings,
        loading,
        error,
        loadListings,
        loadMyListings,
        createListing,
        updateListing
    }
}