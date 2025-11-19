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
    available_from: string | null
}

export const useListings = () => {
    const { $supabase } = useNuxtApp()

    const listings = ref<any[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // (optional) generic loader
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

    // ✅ specific: only listings for the current host
    const loadMyListings = async () => {
        loading.value = true
        error.value = null

        const {
            data: { user },
            error: authError,
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
            error: authError,
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
                rent_amount: payload.monthly_rent,
                currency: payload.currency,
                bedrooms: payload.bedrooms,
                bathrooms: payload.bathrooms,
                available_from: payload.available_from,
                is_active: true,
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

    return {
        listings,
        loading,
        error,
        loadListings,
        loadMyListings, // 👈 add this
        createListing,
    }
}