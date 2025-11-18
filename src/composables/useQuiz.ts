// src/composables/useQuiz.ts
import {ref} from 'vue'
import {useNuxtApp} from '#app'
import type {HomeVibe, RoommateTraits, SleepSchedule, QuizQuestion} from '~/types/amigo'

export interface QuizAnswers {
    cleanliness?: number
    noise?: number
    social?: number
    guests?: number
    pets?: boolean
    smoking?: boolean
    sleep?: SleepSchedule
    vibe?: HomeVibe
    wfh?: number

    [key: string]: unknown
}

export const useQuiz = () => {
    const {$supabase} = useNuxtApp()

    const questions = ref<QuizQuestion[]>([])
    const answers = ref<QuizAnswers>({})
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadQuizQuestions = async (numQuestions = 8) => {
        loading.value = true
        error.value = null

        const {data, error: rpcError} = await $supabase
            .schema('amigo')
            .rpc(
                'get_quiz_questions',
                {num_questions: numQuestions}
            )

        if (rpcError) {
            error.value = rpcError.message
            loading.value = false
            return
        }

        // Normalise options json -> string[]
        questions.value = (data || []).map((q: any) => ({
            id: q.id,
            answer_key: q.answer_key,
            question_text: q.question_text,
            help_text: q.help_text ?? null,
            input_type: q.input_type,
            scale_min: q.scale_min,
            scale_max: q.scale_max,
            scale_min_label: q.scale_min_label,
            scale_max_label: q.scale_max_label,
            options: q.options ? (q.options as string[]) : null,
            weight: q.weight ?? 1,
            category: q.category ?? null
        }))
        loading.value = false
    }

    const loadExistingTraits = async () => {
        loading.value = true
        error.value = null

        const {
            data: {user},
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            loading.value = false
            error.value = authError?.message ?? 'Not authenticated'
            return
        }

        const {data, error: traitsError} = await $supabase
            .schema('amigo')
            .from('roommate_traits')
            .select('*')
            .eq('profile_id', user.id)
            .maybeSingle()

        if (traitsError) {
            if ((traitsError as any).code !== 'PGRST116') {
                error.value = traitsError.message
            }
        } else if (data) {
            const traits = data as RoommateTraits
            answers.value = {
                cleanliness: traits.cleanliness_level ?? undefined,
                noise: traits.noise_tolerance ?? undefined,
                social: traits.social_level ?? undefined,
                guests: traits.guest_comfort ?? undefined,
                pets: traits.pet_friendly ?? undefined,
                smoking: traits.smoking_ok ?? undefined,
                sleep: traits.sleep_schedule ?? undefined,
                vibe: traits.home_vibe ?? undefined,
                wfh: traits.works_from_home ?? undefined,
                ...(traits.raw_answers ?? {})
            }
        }

        loading.value = false
    }

    const setAnswer = (answerKey: string, value: unknown) => {
        answers.value[answerKey] = value
    }

    const buildTraitsPayload = (profileId: string): Partial<RoommateTraits> => {
        return {
            profile_id: profileId,
            cleanliness_level: (answers.value.cleanliness as number) ?? 5,
            noise_tolerance: (answers.value.noise as number) ?? 5,
            social_level: (answers.value.social as number) ?? 5,
            guest_comfort: (answers.value.guests as number) ?? 5,
            pet_friendly: (answers.value.pets as boolean) ?? false,
            smoking_ok: (answers.value.smoking as boolean) ?? false,
            sleep_schedule: (answers.value.sleep as SleepSchedule) ?? 'regular',
            home_vibe: (answers.value.vibe as HomeVibe) ?? 'flexible',
            works_from_home: (answers.value.wfh as number) ?? 5,
            raw_answers: answers.value
        }
    }

    const saveTraits = async () => {
        loading.value = true
        error.value = null

        const {
            data: {user},
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            loading.value = false
            error.value = authError?.message ?? 'Not authenticated'
            return null
        }

        const payload = buildTraitsPayload(user.id)

        const {data, error: upsertError} = await $supabase
            .schema('amigo')
            .from('roommate_traits')
            .upsert(payload, {onConflict: 'profile_id'})
            .select('*')
            .maybeSingle()

        if (upsertError) {
            error.value = upsertError.message
            loading.value = false
            return null
        }

        loading.value = false
        return data as RoommateTraits
    }

    return {
        questions,
        answers,
        loading,
        error,
        loadQuizQuestions,
        loadExistingTraits,
        setAnswer,
        saveTraits
    }
}