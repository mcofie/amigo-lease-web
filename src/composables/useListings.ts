// src/composables/useListings.ts
import { ref } from 'vue'
import { useNuxtApp } from '#app'

export interface Listing {
    id: string
    host_profile_id: string
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

export const useListings = () => {
    const { $supabase } = useNuxtApp()

    const listings = ref<Listing[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

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

        const { data, error: listError } = await $supabase
            .schema('amigo')
            .from('listings')
            .select('*')
            .eq('host_profile_id', user.id)
            .order('created_at', { ascending: false })

        if (listError) {
            error.value = listError.message
            loading.value = false
            return
        }

        listings.value = data as Listing[]
        loading.value = false
    }

    return {
        listings,
        loading,
        error,
        loadMyListings
    }
}