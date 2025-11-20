export type RoommateArchetype =
    | 'neat_planner'
    | 'calm_minimalist'
    | 'quiet_professional'
    | 'soft_spoken_academic'
    | 'chill_creative'
    | 'night_owl_thinker'
    | 'easygoing_socialite'
    | 'warm_host'
    | 'pet_loving_softie'
    | 'cool_independent'

export interface ArchetypeMeta {
    id: RoommateArchetype
    label: string
    emoji: string
    shortTag: string
    description: string
    chipClass: string
}

export const ARCHETYPES: Record<RoommateArchetype, ArchetypeMeta> = {
    neat_planner: {
        id: 'neat_planner',
        label: 'Neat Planner',
        emoji: '🧹',
        shortTag: 'Neat Planner',
        description: 'Very tidy, organised, and likes things in their place.',
        chipClass: 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    },
    calm_minimalist: {
        id: 'calm_minimalist',
        label: 'Calm Minimalist',
        emoji: '🌿',
        shortTag: 'Calm Minimalist',
        description: 'Low clutter, low noise, prefers a peaceful, simple home.',
        chipClass: 'bg-slate-50 text-slate-700 border border-slate-200'
    },
    quiet_professional: {
        id: 'quiet_professional',
        label: 'Quiet Professional',
        emoji: '💼',
        shortTag: 'Quiet Professional',
        description: 'Focused on work, respectful, and keeps things low-key.',
        chipClass: 'bg-slate-50 text-slate-700 border border-slate-200'
    },
    soft_spoken_academic: {
        id: 'soft_spoken_academic',
        label: 'Soft-Spoken Academic',
        emoji: '📚',
        shortTag: 'Soft-Spoken Academic',
        description: 'Introverted and thoughtful, loves a quiet, cosy space.',
        chipClass: 'bg-violet-50 text-violet-700 border border-violet-100'
    },
    chill_creative: {
        id: 'chill_creative',
        label: 'Chill Creative',
        emoji: '🎨',
        shortTag: 'Chill Creative',
        description: 'Relaxed, expressive, and brings creative energy to the home.',
        chipClass: 'bg-indigo-50 text-indigo-700 border border-indigo-100'
    },
    night_owl_thinker: {
        id: 'night_owl_thinker',
        label: 'Night Owl Thinker',
        emoji: '🌙',
        shortTag: 'Night Owl',
        description: 'Most alive in the late hours, reflective and independent.',
        chipClass: 'bg-slate-900 text-slate-100 border border-slate-800'
    },
    easygoing_socialite: {
        id: 'easygoing_socialite',
        label: 'Easygoing Socialite',
        emoji: '🎉',
        shortTag: 'Socialite',
        description: 'Loves people, cool with noise, and enjoys a lively home.',
        chipClass: 'bg-pink-50 text-pink-700 border border-pink-100'
    },
    warm_host: {
        id: 'warm_host',
        label: 'Warm Host',
        emoji: '🍲',
        shortTag: 'Warm Host',
        description: 'Friendly and welcoming – happy to host friends and dinners.',
        chipClass: 'bg-orange-50 text-orange-700 border border-orange-100'
    },
    pet_loving_softie: {
        id: 'pet_loving_softie',
        label: 'Pet-Loving Softie',
        emoji: '🐾',
        shortTag: 'Pet Lover',
        description: 'Loves animals and brings soft, nurturing energy.',
        chipClass: 'bg-amber-50 text-amber-700 border border-amber-100'
    },
    cool_independent: {
        id: 'cool_independent',
        label: 'Cool Independent',
        emoji: '😎',
        shortTag: 'Independent',
        description: 'Minds their business, easy to live with, low drama.',
        chipClass: 'bg-slate-50 text-slate-700 border border-slate-200'
    }
}

export function getArchetypeMeta(value: string | null | undefined): ArchetypeMeta | null {
    if (!value) return null
    const key = value as RoommateArchetype
    return ARCHETYPES[key] ?? null
}