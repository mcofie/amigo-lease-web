// composables/useMatches.ts
import { ref } from 'vue'
import { useNuxtApp } from '#imports'

export interface CompatibilitySummary {
    pets?: 'match' | 'conflict' | 'unknown'
    smoking?: 'match' | 'conflict' | 'unknown'
    // keep it open for future categories
    [key: string]: any
}

export interface MatchRow {
    match_id: string
    profile_id: string
    matched_profile_id: string
    score: number
    compatibility_summary: CompatibilitySummary | null
    full_name: string | null
    city: string | null
    area: string | null
    avatar_url: string | null
}

export const useMatches = () => {
    const { $supabase } = useNuxtApp()

    const matches = ref<MatchRow[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadMatches = async () => {
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

        const { data, error: matchError } = await $supabase
            .schema('amigo')
            .from('v_profile_matches_for_me')
            .select(`
        match_id,
        profile_id,
        matched_profile_id,
        score,
        compatibility_summary,
        full_name,
        city,
        area,
        avatar_url
      `)
            .eq('profile_id', user.id)
            .order('score', { ascending: false })

        if (matchError) {
            error.value = matchError.message
            loading.value = false
            return
        }

        matches.value = (data || []) as MatchRow[]
        loading.value = false
    }

    return { matches, loading, error, loadMatches }
}