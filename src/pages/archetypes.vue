<!-- src/pages/archetypes.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-2">
          <div
              class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-orange-100 text-[11px] text-gray-600 shadow-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
            <span>Roommate archetypes</span>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
              Who are you on Amigo Lease?
            </h1>
            <p class="mt-1 text-sm text-gray-500 max-w-xl">
              Based on your quiz answers, we place you into a gentle archetype. It isn’t a box –
              just a starting point to understand your living style and who you might click with.
            </p>
          </div>
        </div>

        <div class="text-[11px] text-gray-500 max-w-xs">
          <p class="font-medium text-gray-700 mb-1">
            How to use this
          </p>
          <p>
            Think of these as vibes, not labels. You might be mostly one archetype, with a sprinkle
            of another.
          </p>
        </div>
      </header>

      <!-- Legend / chips -->
      <section
          class="rounded-3xl bg-white/90 border border-gray-100 px-4 py-4 md:px-5 md:py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] text-[11px] text-gray-600 flex flex-wrap gap-2 items-center"
      >
        <p class="font-medium text-gray-800 mr-1">
          What we look at:
        </p>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 border border-orange-100">
          🧽 Cleanliness
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-50 border border-rose-100">
          🔈 Noise & social energy
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          🛌 Sleep & home vibe
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sky-50 border border-sky-100">
          🐾 Pets & habits
        </span>
      </section>

      <!-- Archetype grid -->
      <section class="grid gap-4 md:gap-5 md:grid-cols-2">
        <article
            v-for="type in archetypes"
            :key="type.key"
            class="rounded-3xl bg-white/95 border border-gray-100 shadow-[0_14px_30px_rgba(15,23,42,0.06)]
                 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition overflow-hidden flex flex-col"
        >
          <!-- Top stripe -->
          <div class="h-1 w-full bg-gradient-to-r from-orange-500/80 via-rose-500/80 to-purple-500/70"/>

          <div class="p-4 md:p-5 space-y-3 flex-1 flex flex-col">
            <!-- Title row -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div
                    class="h-9 w-9 rounded-2xl bg-gradient-to-br from-orange-100 via-rose-100 to-white
                         flex items-center justify-center text-lg"
                >
                  <span>{{ type.emoji }}</span>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {{ type.shortLabel }}
                  </p>
                  <h2 class="text-sm md:text-base font-semibold text-gray-900">
                    {{ type.name }}
                  </h2>
                </div>
              </div>

              <div class="text-right text-[10px] text-gray-400">
                <p class="uppercase tracking-[0.16em] mb-0.5">
                  Vibe
                </p>
                <p class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-900 text-[10px] text-white">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
                  <span>{{ type.vibeTag }}</span>
                </p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-gray-600 leading-relaxed">
              {{ type.description }}
            </p>

            <!-- Traits -->
            <div class="space-y-1.5 text-[11px] text-gray-600">
              <p class="font-medium text-gray-800">
                You’re probably:
              </p>
              <ul class="space-y-1">
                <li
                    v-for="t in type.traits"
                    :key="t"
                    class="flex items-start gap-1.5"
                >
                  <span class="mt-[2px] text-[10px] text-gray-400">•</span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>

            <!-- Fit row -->
            <div class="grid grid-cols-1 gap-2 pt-2 border-t border-dashed border-gray-200 mt-auto">
              <div class="flex items-start gap-1.5 text-[11px]">
                <span class="mt-[1px]">✅</span>
                <div>
                  <p class="font-medium text-gray-800">
                    Usually a great fit with:
                  </p>
                  <p class="text-gray-600">
                    {{ type.bestWith }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-1.5 text-[11px]">
                <span class="mt-[1px]">⚠️</span>
                <div>
                  <p class="font-medium text-gray-800">
                    Might feel tricky with:
                  </p>
                  <p class="text-gray-600">
                    {{ type.trickyWith }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- Footer note -->
      <section
          class="mt-2 rounded-3xl bg-white/90 border border-dashed border-gray-200 px-4 py-4 md:px-5 md:py-5 text-[11px] text-gray-600"
      >
        <p class="font-medium text-gray-800 mb-1">
          Not a perfect fit?
        </p>
        <p class="max-w-2xl">
          That’s okay. Archetypes are just a shorthand to help you and your future roommate talk
          about expectations. Real life is messier and more interesting – and you’re always more
          than one label.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Archetype {
  key: string
  name: string
  shortLabel: string
  emoji: string
  vibeTag: string
  description: string
  traits: string[]
  bestWith: string
  trickyWith: string
}

/**
 * IMPORTANT: Make sure these `key` values line up with `roommate_traits.archetype`
 * if you're storing the archetype string in the DB. e.g.:
 *   - "quiet_nest_builder"
 *   - "social_sunbeam"
 *   - etc.
 */
const archetypes: Archetype[] = [
  {
    key: 'quiet_nest_builder',
    name: 'The Quiet Nest-Builder',
    shortLabel: 'Calm • Cozy • Considerate',
    emoji: '🕯️',
    vibeTag: 'Low-key nights in',
    description:
        'You love a calm, tidy space that feels like a soft landing at the end of the day. Home is where you recharge, not where the party starts.',
    traits: [
      'Prefers small hangouts over big house parties',
      'Notices when things are out of place and quietly fixes them',
      'Values clear boundaries, gentle communication, and respect for alone time'
    ],
    bestWith:
        'Other calm, respectful roommates who like movie nights, shared dinners, and generally predictable home energy.',
    trickyWith:
        'Very high-energy partiers or people who regularly bring the club home at 2am.'
  },
  {
    key: 'social_sunbeam',
    name: 'The Social Sunbeam',
    shortLabel: 'Warm • Chatty • Welcoming',
    emoji: '🌞',
    vibeTag: 'Open-door energy',
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
    shortLabel: 'Organised • Clear • Reliable',
    emoji: '📅',
    vibeTag: 'Systems & clarity',
    description:
        'You thrive when everyone knows the plan. Bills, chores, trash days – you like it written down and agreed, not guessed.',
    traits: [
      'Loves rota boards, shared calendars, or a simple system everyone respects',
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
    shortLabel: 'Flexible • Chill • Adaptable',
    emoji: '🦎',
    vibeTag: 'Go-with-the-flow',
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
    shortLabel: 'Lively • Spontaneous • Social',
    emoji: '🎉',
    vibeTag: 'House as a hub',
    description:
        'You see home as a shared space for fun – pre-games, game nights, friends dropping by. You bring the energy (and probably the speaker).',
    traits: [
      'Comfortable with later nights and music (within reasonable limits)',
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
    shortLabel: 'Soft • Present • Comfort-first',
    emoji: '🛋️',
    vibeTag: 'Home as a cocoon',
    description:
        'You spend a lot of time at home and want it to feel safe, comfy, and emotionally light. Candles, blankets, playlists – that’s your territory.',
    traits: [
      'Enjoys slow evenings, shared cooking, or silent co-existing',
      'Often decorates or adds little cozy touches to shared spaces',
      'Sensitive to tension and prefers kind, honest check-ins'
    ],
    bestWith:
        'People who respect the home as a comfort zone and don’t bring constant drama or chaos into the space.',
    trickyWith:
        'Very chaotic schedules, constant late-night noise, or roommates who treat home like a hotel with no shared responsibility.'
  }
]
</script>