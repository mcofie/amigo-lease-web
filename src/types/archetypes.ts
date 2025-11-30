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
        key: 'quiet_nest_builder',
        name: 'The Quiet Nest-Builder',
        shortLabel: 'Calm • Cozy',
        emoji: '🕯️',
        vibeTag: 'Low-key',
        description:
            'You love a calm, tidy space that feels like a soft landing at the end of the day. Home is where you recharge, not where the party starts.',
        traits: [
            'Prefers small hangouts over big house parties',
            'Notices when things are out of place and quietly fixes them',
            'Values clear boundaries and respect for alone time'
        ],
        bestWith:
            'Other calm, respectful roommates who like movie nights, shared dinners, and generally predictable home energy.',
        trickyWith:
            'Very high-energy partiers or people who regularly bring the club home at 2am.'
    },
    {
        key: 'social_sunbeam',
        name: 'The Social Sunbeam',
        shortLabel: 'Warm • Chatty',
        emoji: '🌞',
        vibeTag: 'Open-door',
        description:
            'You’re the one who asks how everyone’s day went and actually listens. You like a home that feels friendly, lived-in, and a little bit social.',
        traits: [
            'Happy to chat in the kitchen and check in on people',
            'Comfortable having guests over (within reason)',
            'Good at smoothing tension and keeping things light'
        ],
        bestWith:
            'People who appreciate warmth and conversation, even if they’re more introverted, as long as boundaries are clear.',
        trickyWith:
            'Housemates who never want to talk or share anything and find small talk draining or annoying.'
    },
    {
        key: 'structured_planner',
        name: 'The Structured Planner',
        shortLabel: 'Organised • Clear',
        emoji: '📅',
        vibeTag: 'Systems',
        description:
            'You thrive when everyone knows the plan. Bills, chores, trash days – you like it written down and agreed, not guessed.',
        traits: [
            'Loves rota boards, shared calendars, or a simple system',
            'Pays bills on time and expects the same energy',
            'Prefers to talk things through before they become issues'
        ],
        bestWith:
            'Roommates who appreciate structure or are at least willing to follow agreed-upon house rules.',
        trickyWith:
            'Very spontaneous or forgetful people who dislike routines and see plans as “optional suggestions”.'
    },
    {
        key: 'easygoing_chameleon',
        name: 'The Easygoing Chameleon',
        shortLabel: 'Flexible • Chill',
        emoji: '🦎',
        vibeTag: 'Adaptive',
        description:
            'You can vibe with many types of people and living situations. You don’t need everything perfect – just generally fair and respectful.',
        traits: [
            'Not easily stressed by small messes or noise',
            'Can adjust to either social or quiet homes over time',
            'Prefers harmony over winning an argument'
        ],
        bestWith:
            'Most archetypes, especially when paired with at least one more structured or organised housemate.',
        trickyWith:
            'People who assume “chill” means “do everything for them” or never communicate their needs at all.'
    },
    {
        key: 'party_pulse',
        name: 'The Party Pulse',
        shortLabel: 'Lively • Social',
        emoji: '🎉',
        vibeTag: 'Hub',
        description:
            'You see home as a shared space for fun – pre-games, game nights, friends dropping by. You bring the energy (and probably the speaker).',
        traits: [
            'Comfortable with later nights and music (within limits)',
            'Has a wide circle of friends and likes hosting',
            'Often the one suggesting “Let’s do something tonight”'
        ],
        bestWith:
            'Roommates who share a social streak or are okay with a bit of buzz, as long as quiet times are agreed.',
        trickyWith:
            'Very noise-sensitive, early-sleep, or strictly private people who view home as a retreat from all social activity.'
    },
    {
        key: 'cozy_homebody',
        name: 'The Cozy Homebody',
        shortLabel: 'Soft • Present',
        emoji: '🛋️',
        vibeTag: 'Cocoon',
        description:
            'You spend a lot of time at home and want it to feel safe, comfy, and emotionally light. Candles, blankets, playlists – that’s your territory.',
        traits: [
            'Enjoys slow evenings, shared cooking, or silent co-existing',
            'Often decorates or adds little cozy touches',
            'Sensitive to tension and prefers kind, honest check-ins'
        ],
        bestWith:
            'People who respect the home as a comfort zone and don’t bring constant drama or chaos into the space.',
        trickyWith:
            'Very chaotic schedules, constant late-night noise, or roommates who treat home like a hotel with no shared responsibility.'
    }
]

export function getArchetypeMeta(key: string | null | undefined): Archetype | null {
    if (!key) return null
    return ARCHETYPES.find(a => a.key === key) || null
}
