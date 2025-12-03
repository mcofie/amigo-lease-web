export interface Archetype {
    key: string
    name: string
    shortLabel: string
    emoji: string
    vibeTag: string
    description: string
    traits: string[]
    bestWith: string
    trickyWith: string
    chipClass?: string // Optional, kept for compatibility if needed
}

export const ARCHETYPES: Archetype[] = [
    {
        key: 'neat_planner',
        name: 'The Neat Planner',
        shortLabel: 'Tidy • Structured',
        emoji: '📋',
        vibeTag: 'Organised',
        description:
            'You appreciate a home where everything has its place. You like structure, cleanliness, and a predictable routine.',
        traits: [
            'Keeps shared spaces spotless',
            'Values clear schedules and rosters',
            'Prefers a calm, well-ordered environment'
        ],
        bestWith:
            'Other structured people or respectful roommates who are happy to follow a system.',
        trickyWith:
            'Chaotic or messy people who view cleaning rosters as "optional suggestions".'
    },
    {
        key: 'calm_minimalist',
        name: 'The Calm Minimalist',
        shortLabel: 'Quiet • Simple',
        emoji: '🍃',
        vibeTag: 'Zen',
        description:
            'You prefer a peaceful, uncluttered home. You’re not necessarily strict, but you love a simple, quiet atmosphere.',
        traits: [
            'Enjoys silence and personal space',
            'Keeps things simple and clutter-free',
            'Low-maintenance and respectful'
        ],
        bestWith:
            'Quiet professionals or introverts who also value a peaceful sanctuary.',
        trickyWith:
            'Hoarders or people who fill every silence with loud music or chatter.'
    },
    {
        key: 'quiet_professional',
        name: 'The Quiet Professional',
        shortLabel: 'Focused • Busy',
        emoji: '💼',
        vibeTag: 'Productive',
        description:
            'Home is your base for rest and work. You’re often busy, focused, and value a distraction-free environment.',
        traits: [
            'Often works from home or has long hours',
            'Needs quiet hours for focus',
            'Polite but keeps to themselves'
        ],
        bestWith:
            'Other professionals who understand the grind and respect quiet hours.',
        trickyWith:
            'Party animals or people who interrupt you constantly while you’re working.'
    },
    {
        key: 'soft_spoken_academic',
        name: 'The Soft-Spoken Academic',
        shortLabel: 'Gentle • Bookish',
        emoji: '📚',
        vibeTag: 'Intellectual',
        description:
            'You’re introverted, thoughtful, and perhaps a bit bookish. You love a home that feels like a cozy library.',
        traits: [
            'Very respectful of noise levels',
            'Enjoys deep conversations over small talk',
            'Prefers a low-stimulation environment'
        ],
        bestWith:
            'Other quiet souls, readers, or people who enjoy a gentle, shared silence.',
        trickyWith:
            'Loud, boisterous personalities who dominate the space and energy.'
    },
    {
        key: 'chill_creative',
        name: 'The Chill Creative',
        shortLabel: 'Artistic • Flexible',
        emoji: '🎨',
        vibeTag: 'Expressive',
        description:
            'You have a creative spirit and a flexible schedule. Your home is a place for expression and relaxed vibes.',
        traits: [
            'Often up late working on projects',
            'Open-minded and easygoing',
            'Brings a unique, artistic energy to the home'
        ],
        bestWith:
            'Other creatives or open-minded people who don’t mind a bit of creative chaos.',
        trickyWith:
            'Rigid 9-to-5ers who need absolute silence at 10 PM sharp.'
    },
    {
        key: 'night_owl_thinker',
        name: 'The Night Owl Thinker',
        shortLabel: 'Late • Reflective',
        emoji: '🌙',
        vibeTag: 'Nocturnal',
        description:
            'You come alive at night. Whether it’s reading, gaming, or working, you enjoy the peace of the late hours.',
        traits: [
            'Active when the world is asleep',
            'Respectful of sleeping roommates',
            'Enjoys late-night chats or solo time'
        ],
        bestWith:
            'Other night owls or heavy sleepers who aren’t disturbed by your schedule.',
        trickyWith:
            'Early risers who start blending smoothies at 6 AM while you’re just falling asleep.'
    },
    {
        key: 'easygoing_socialite',
        name: 'The Easygoing Socialite',
        shortLabel: 'Fun • Open',
        emoji: '🥂',
        vibeTag: 'Social',
        description:
            'You love being around people. You’re the heart of the home, always up for a chat, a drink, or a shared meal.',
        traits: [
            'Energized by social interaction',
            'Comfortable with guests and noise',
            'Makes everyone feel included'
        ],
        bestWith:
            'Extroverts or people who want a lively, buzzing home environment.',
        trickyWith:
            'Strict introverts who want to come home and not speak to anyone.'
    },
    {
        key: 'warm_host',
        name: 'The Warm Host',
        shortLabel: 'Welcoming • Cozy',
        emoji: '🍲',
        vibeTag: 'Hospitable',
        description:
            'You love taking care of people. Your home is warm, welcoming, and probably smells like something delicious baking.',
        traits: [
            'Loves hosting dinners or game nights',
            'Creates a cozy, family-like atmosphere',
            'Generous and thoughtful'
        ],
        bestWith:
            'People who appreciate a community feel and shared meals.',
        trickyWith:
            'People who treat the house like a hotel and never contribute to the vibe.'
    },
    {
        key: 'pet_loving_softie',
        name: 'The Pet-Loving Softie',
        shortLabel: 'Animal Lover • Sweet',
        emoji: '🐾',
        vibeTag: 'Nurturing',
        description:
            'Your life revolves around your furry friends (or you wish it did). You prioritize a pet-friendly, loving environment.',
        traits: [
            'Must love dogs/cats/pets',
            'Patient and nurturing personality',
            'Home is where the pets are'
        ],
        bestWith:
            'Fellow animal lovers who don’t mind a bit of fur on the sofa.',
        trickyWith:
            'People with allergies or who dislike animals.'
    },
    {
        key: 'cool_independent',
        name: 'The Cool Independent',
        shortLabel: 'Balanced • Chill',
        emoji: '😎',
        vibeTag: 'Autonomous',
        description:
            'You’re easygoing but value your independence. You’re a great roommate because you’re low-drama and handle your own business.',
        traits: [
            'Respects boundaries naturally',
            'Friendly but has their own life',
            'Reliable and drama-free'
        ],
        bestWith:
            'Almost anyone, as long as they are respectful and self-sufficient.',
        trickyWith:
            'Needy people who expect you to be their best friend and therapist.'
    }
]

export function getArchetypeMeta(key: string | null | undefined): Archetype | null {
    if (!key) return null
    return ARCHETYPES.find(a => a.key === key) || null
}
