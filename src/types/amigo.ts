// src/types/amigo.ts

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say'
export type ProfileRole = 'seeker' | 'host' | 'both'

export type SleepSchedule = 'early_bird' | 'regular' | 'night_owl'
export type HomeVibe = 'sanctuary' | 'social_hub' | 'flexible'

export interface QuizQuestion {
    id: string
    answer_key: string
    question_text: string
    help_text: string | null
    input_type: 'scale' | 'boolean' | 'choice' | 'multi_choice'
    scale_min: number | null
    scale_max: number | null
    scale_min_label: string | null
    scale_max_label: string | null
    options: string[] | null   // we’ll parse JSON to string[]
    weight: number
    category: string | null
}

export interface Profile {
    id: string
    full_name: string | null
    username: string | null
    avatar_url: string | null
    bio: string | null

    gender: Gender | null
    date_of_birth: string | null

    role: ProfileRole

    country: string | null
    city: string | null
    area: string | null

    move_in_from: string | null
    move_in_to: string | null
    budget_min: number | null
    budget_max: number | null

    has_place: boolean
    looking_for_place: boolean

    created_at: string
    updated_at: string
}

export interface RoommateTraits {
    profile_id: string

    cleanliness_level: number | null
    noise_tolerance: number | null
    social_level: number | null
    guest_comfort: number | null

    pet_friendly: boolean | null
    smoking_ok: boolean | null

    sleep_schedule: SleepSchedule | null
    home_vibe: HomeVibe | null

    works_from_home: number | null

    archetype: string | null
    raw_answers: Record<string, unknown> | null

    created_at: string
    updated_at: string
}

export interface RoommatePreferences {
    profile_id: string

    preferred_age_min: number | null
    preferred_age_max: number | null

    allow_male: boolean
    allow_female: boolean
    allow_other: boolean

    must_allow_pets: boolean | null
    must_be_pet_friendly: boolean | null

    allow_smokers: boolean
    require_non_smoker: boolean

    min_cleanliness_level: number | null
    max_noise_tolerance: number | null

    preferred_home_vibe: HomeVibe | null

    prefers_works_from_home: boolean | null
    avoids_works_from_home: boolean | null

    created_at: string
    updated_at: string
}