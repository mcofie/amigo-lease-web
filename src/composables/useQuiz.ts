// src/composables/useQuiz.ts
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import type { HomeVibe, RoommateTraits, SleepSchedule, QuizQuestion } from '~/types/amigo'

export interface QuizAnswers {
    cleanliness?: number
    noise?: number
    social?: number
    guests?: number
    pets?: boolean
    smoking?: boolean
    sleep?: SleepSchedule
    vibe?: HomeVibe | string
    wfh?: number

    [key: string]: unknown
}

export const useQuiz = () => {
    const { $supabase } = useNuxtApp()

    const questions = ref<QuizQuestion[]>([])
    const answers = ref<QuizAnswers>({})
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadQuizQuestions = async (numQuestions = 8) => {
        loading.value = true
        error.value = null

        const { data, error: rpcError } = await ($supabase as any)
            .schema('amigo')
            .rpc('get_quiz_questions', { num_questions: numQuestions })

        if (rpcError) {
            error.value = rpcError.message
            loading.value = false
            return
        }

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
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            loading.value = false
            error.value = authError?.message ?? 'Not authenticated'
            return
        }

        const { data, error: traitsError } = await $supabase
            .schema('amigo')
            .from('roommate_traits')
            .select('*')
            .eq('profile_id', user.id)
            .maybeSingle()

        if (traitsError) {
            // it's okay if there's no row yet
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
                // ⚠️ don't trust DB home_vibe until enum is final – keep it in raw_answers
                // vibe: traits.home_vibe ?? undefined,
                wfh: traits.works_from_home ?? undefined,
                ...(traits.raw_answers ?? {})
            }
        }

        loading.value = false
    }

    const setAnswer = (answerKey: string, value: unknown) => {
        answers.value[answerKey] = value
    }

    // ---- helpers to keep types safe for Postgres ----
    const numOrDefault = (val: unknown, fallback: number): number => {
        if (typeof val === 'number' && Number.isFinite(val)) return val
        return fallback
    }

    const boolOrDefault = (val: unknown, fallback: boolean): boolean => {
        if (typeof val === 'boolean') return val
        return fallback
    }

    const strOrDefault = <T extends string>(val: unknown, fallback: T): T => {
        if (typeof val === 'string' && val.length > 0) {
            return val as T
        }
        return fallback
    }

    const buildTraitsPayload = (profileId: string): Partial<RoommateTraits> => {
        const payload: Partial<RoommateTraits> = {
            profile_id: profileId,

            // numeric columns
            cleanliness_level: numOrDefault(answers.value.cleanliness, 5),
            noise_tolerance: numOrDefault(answers.value.noise, 5),
            social_level: numOrDefault(answers.value.social, 5),
            guest_comfort: numOrDefault(answers.value.guests, 5),
            works_from_home: numOrDefault(answers.value.wfh, 5),

            // boolean columns
            pet_friendly: boolOrDefault(answers.value.pets, false),
            smoking_ok: boolOrDefault(answers.value.smoking, false),

            // enum / text columns
            sleep_schedule: strOrDefault<SleepSchedule>(
                answers.value.sleep,
                'regular'
            ),

            // JSONB – we keep *all* quiz answers here, including vibe
            raw_answers: answers.value
        }

        // 🔒 IMPORTANT:
        // We DO NOT set `home_vibe` here to avoid enum mismatch errors.
        // Once your Postgres enum is final, you can add a safe mapping like:
        // payload.home_vibe = normalizeHomeVibe(answers.value.vibe)

        return payload
    }

    const saveTraits = async (): Promise<RoommateTraits | null> => {
        loading.value = true
        error.value = null

        const {
            data: { user },
            error: authError
        } = await $supabase.auth.getUser()

        if (authError || !user) {
            loading.value = false
            error.value = authError?.message ?? 'Not authenticated'
            return null
        }

        const payload = buildTraitsPayload(user.id)

        const { data, error: upsertError } = await $supabase
            .schema('amigo')
            .from('roommate_traits')
            .upsert(payload as any, { onConflict: 'profile_id' })
            .select('*')
            .maybeSingle()

        if (upsertError) {
            error.value = upsertError.message
            loading.value = false
            return null
        }

        loading.value = false

        if (!data) {
            // no row returned – be explicit
            return null
        }

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