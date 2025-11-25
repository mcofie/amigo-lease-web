<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white px-4 py-8">
    <div class="max-w-5xl mx-auto space-y-8">

      <!-- Header -->
      <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-white/10 dark:border-white/10">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-200">
              Roommate Archetypes
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Who are you on Amigo Lease?
          </h1>
          <p class="text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            Based on your quiz answers, we place you into a gentle archetype. It isn’t a box – just a starting point to understand your living style and who you might click with.
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-4 max-w-xs shadow-sm dark:bg-gray-900 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-900 mb-1 dark:text-white">
            How to use this
          </p>
          <p class="text-[11px] text-slate-500 leading-relaxed dark:text-slate-400">
            Think of these as vibes, not labels. You might be mostly one archetype, with a sprinkle of another.
          </p>
        </div>
      </header>

      <!-- Legend / chips -->
      <section
          class="rounded-2xl bg-white border border-slate-200 px-4 py-4 shadow-sm text-xs text-slate-600 flex flex-wrap gap-3 items-center dark:bg-gray-900 dark:border-slate-800 dark:text-slate-300"
      >
        <p class="font-bold text-slate-900 mr-1 dark:text-white">
          What we look at:
        </p>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🧽 Cleanliness
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🔈 Noise & Energy
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🛌 Sleep & Rhythm
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          🐾 Pets & Habits
        </span>
      </section>

      <!-- Archetype grid -->
      <section class="grid gap-6 md:grid-cols-2">
        <article
            v-for="type in archetypes"
            :key="type.key"
            class="group relative rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <!-- Accent Stripe -->
          <div class="h-1.5 w-full bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 dark:from-white dark:via-slate-300 dark:to-slate-500"/>

          <div class="p-6 space-y-5 flex-1 flex flex-col">
            <!-- Title row -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div
                    class="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform dark:bg-slate-800 dark:border-slate-700"
                >
                  <span>{{ type.emoji }}</span>
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 dark:text-slate-500">
                    {{ type.shortLabel }}
                  </p>
                  <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                    {{ type.name }}
                  </h2>
                </div>
              </div>

              <div class="text-right">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 dark:text-slate-500">
                  Vibe
                </p>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-white shadow-sm dark:bg-white dark:text-slate-900">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
                  <span>{{ type.vibeTag }}</span>
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
              {{ type.description }}
            </p>

            <!-- Traits -->
            <div class="space-y-2 bg-slate-50 rounded-xl p-4 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800">
              <p class="text-xs font-bold text-slate-900 uppercase tracking-wide dark:text-white">
                You’re probably:
              </p>
              <ul class="space-y-1.5">
                <li
                    v-for="t in type.traits"
                    :key="t"
                    class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <span class="mt-1 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600 flex-shrink-0"></span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>

            <!-- Fit row -->
            <div class="grid grid-cols-1 gap-3 pt-4 border-t border-slate-100 mt-auto dark:border-slate-800">
              <div class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50/50 transition-colors dark:hover:bg-emerald-900/10">
                <span class="text-lg mt-[-2px]">✅</span>
                <div>
                  <p class="text-xs font-bold text-slate-900 dark:text-slate-200">
                    Great fit with:
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {{ type.bestWith }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-50/50 transition-colors dark:hover:bg-rose-900/10">
                <span class="text-lg mt-[-2px]">⚠️</span>
                <div>
                  <p class="text-xs font-bold text-slate-900 dark:text-slate-200">
                    Tricky with:
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-snug">
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
          class="mt-4 rounded-3xl bg-white border border-dashed border-slate-300 p-6 text-center dark:bg-gray-900 dark:border-slate-700"
      >
        <p class="text-sm font-bold text-slate-900 mb-1 dark:text-white">
          Not a perfect fit?
        </p>
        <p class="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
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
 * - "quiet_nest_builder"
 * - "social_sunbeam"
 * - etc.
 */
const archetypes: Archetype[] = [
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
</script>