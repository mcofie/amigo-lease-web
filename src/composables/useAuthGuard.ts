import {useNuxtApp} from '#app'

export const useAuthGuard = () => {
    const router = useRouter()
    const {$supabase} = useNuxtApp()

    const requireAuth = async () => {
        const {
            data: {user},
        } = await $supabase.auth.getUser()

        if (!user) {
            router.push('/auth')
            return null
        }

        return user
    }

    return {requireAuth}
}