// src/composables/useProfile.ts
import type { Profile, ProfileRole } from '~/types/amigo'

export const useProfile = () => {
    const { $supabase } = useNuxtApp()

    const profile = ref<Profile | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchProfile = async () => {
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

        const { data, error: profileError } = await $supabase
            .from('amigo.profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle()

        if (profileError) {
            error.value = profileError.message
        } else {
            profile.value = data as Profile | null
        }

        loading.value = false
    }

    const upsertProfile = async (
        payload: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
    ) => {
        error.value = null

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            error.value = authError?.message ?? 'Not authenticated'
            return null
        }

        const { data, error: upsertError } = await $supabase
            .from('amigo.profiles')
            .upsert(
                {
                    id: user.id,
                    ...payload
                },
                { onConflict: 'id' }
            )
            .select('*')
            .maybeSingle()

        if (upsertError) {
            error.value = upsertError.message
            return null
        }

        profile.value = data as Profile
        return profile.value
    }

    const setRole = async (role: ProfileRole) => {
        return upsertProfile({
            role,
            // keep simple defaults
            has_place: role === 'host' || role === 'both',
            looking_for_place: role === 'seeker' || role === 'both'
        })
    }

    return {
        profile,
        loading,
        error,
        fetchProfile,
        upsertProfile,
        setRole
    }
}