import {ref} from 'vue'
import {useNuxtApp} from '#imports'
import type {RoommateTraits} from '~/types/amigo'

export interface MatchRow {
    id: string
    profile_id: string
    matched_profile_id: string
    score: number
    compatibility_summary: Record<string, any> | null
    matched_profile: {
        id: string
        full_name: string | null
        city: string | null
        area: string | null
        avatar_url: string | null
    }
}

export const useMatches = () => {
    const {$supabase} = useNuxtApp()

    const matches = ref<MatchRow[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadMatches = async () => {
        loading.value = true
        error.value = null

        const {
            data: {user},
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            loading.value = false
            return
        }

        const {data, error: matchError} = await ($supabase as any)
            .schema('amigo')
            .from('matches')
            .select(`
    id,
    profile_id,
    matched_profile_id:other_profile_id,
    score,
    matched_profile:profiles!matches_other_profile_id_fkey (
      id,
      full_name,
      city,
      area,
      avatar_url
    )
  `)
            .eq('profile_id', user.id)
            .order('score', {ascending: false})


        if (matchError) {
            error.value = matchError.message
            loading.value = false
            return
        }

        matches.value = (data || []) as MatchRow[]
        loading.value = false
    }

    return {matches, loading, error, loadMatches}
}