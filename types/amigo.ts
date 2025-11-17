// src/types/amigo.ts

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say'
export type ProfileRole = 'seeker' | 'host' | 'both'

export type SleepSchedule = 'early_bird' | 'regular' | 'night_owl'
export type HomeVibe = 'sanctuary' | 'social_hub' | 'flexible'

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