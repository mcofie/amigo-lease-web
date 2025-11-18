<template>
  <div
      class="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-black"
  >
    <!-- HERO -->
    <div class="flex items-center">
      <div class="relative w-full max-w-6xl mx-auto px-6 py-16">
        <!-- Background blob -->
        <div
            class="pointer-events-none absolute -top-20 -right-32 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl opacity-70 dark:bg-orange-500/20 dark:opacity-60"
        ></div>

        <div class="relative grid gap-12 md:grid-cols-2 items-center">
          <!-- LEFT: TEXT -->
          <div class="space-y-6 fade-in-up">
            <!-- Eyebrow -->
            <div
                class="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full dark:bg-orange-500/10 dark:border-orange-500/30"
            >
              <span class="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span class="text-orange-700 text-xs font-medium dark:text-orange-300">
                Roommates that match your real-life habits
              </span>
            </div>

            <!-- Headline -->
            <h1
                class="text-3xl md:text-4xl font-semibold leading-tight text-gray-900 dark:text-gray-50"
            >
              Find a roommate<br />
              you’ll actually vibe with.
            </h1>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-md">
              Amigo Lease is a roommate-matching app that starts with a playful
              lifestyle quiz. We turn your habits, boundaries, and budget into a
              compatibility score, then connect you with people and places that feel
              like an easy fit — whether you’re hosting or looking for a room.
            </p>

            <!-- Feature pills -->
            <div class="flex flex-wrap gap-2 pt-1 text-xs">
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 dark:text-gray-100 dark:border-gray-700"
              >
                Quiz-powered compatibility score
              </span>
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 dark:text-gray-100 dark:border-gray-700"
              >
                Hosts & seekers in one place
              </span>
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 dark:text-gray-100 dark:border-gray-700"
              >
                Habits, boundaries & budget aligned
              </span>
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 dark:text-gray-100 dark:border-gray-700"
              >
                Dealbreakers agreed upfront
              </span>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                  @click="goToOnboarding"
                  class="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                Take the roommate quiz
              </button>

              <button
                  @click="goToOnboarding"
                  class="w-full sm:w-auto px-4 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 transition border-gray-300 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                List my spare room
              </button>
            </div>

            <!-- Hint -->
            <p class="text-xs text-gray-400 dark:text-gray-500">
              ~5 minutes · No long forms · Change your answers anytime
            </p>
          </div>

          <!-- RIGHT: VISUAL AREA -->
          <div class="flex justify-center fade-in-up-delayed">
            <div class="w-full max-w-xs space-y-4">
              <!-- Mobile-first illustration -->
              <div
                  class="md:hidden bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-700 rounded-2xl shadow-sm p-4"
              >
                <div class="flex items-center justify-between mb-3">
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-100">
                    Your vibe snapshot
                  </p>
                  <span
                      class="px-2 py-0.5 rounded-full text-[10px] bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30"
                  >
                    Example
                  </span>
                </div>

                <!-- Simple phone-ish SVG -->
                <div class="flex justify-center">
                  <svg
                      viewBox="0 0 120 180"
                      class="h-40 w-auto text-gray-900 dark:text-gray-50"
                  >
                    <!-- phone body -->
                    <rect
                        x="16"
                        y="8"
                        rx="16"
                        ry="16"
                        width="88"
                        height="164"
                        class="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700"
                        stroke-width="2"
                    />

                    <!-- top notch -->
                    <rect
                        x="44"
                        y="14"
                        width="32"
                        height="4"
                        rx="2"
                        class="fill-gray-200 dark:fill-gray-700"
                    />

                    <!-- header bar -->
                    <rect
                        x="26"
                        y="26"
                        width="68"
                        height="12"
                        rx="6"
                        class="fill-orange-100 dark:fill-orange-500/20"
                    />
                    <rect
                        x="30"
                        y="29"
                        width="26"
                        height="6"
                        rx="3"
                        class="fill-orange-500/90 dark:fill-orange-400"
                    />

                    <!-- match pill -->
                    <rect
                        x="34"
                        y="52"
                        width="52"
                        height="10"
                        rx="5"
                        class="fill-gray-100 dark:fill-gray-800"
                    />
                    <rect
                        x="38"
                        y="54"
                        width="24"
                        height="6"
                        rx="3"
                        class="fill-gray-300 dark:fill-gray-600"
                    />

                    <!-- score circle -->
                    <circle
                        cx="46"
                        cy="88"
                        r="14"
                        class="fill-orange-100 dark:fill-orange-500/20"
                    />
                    <text
                        x="46"
                        y="92"
                        text-anchor="middle"
                        class="fill-orange-600 dark:fill-orange-300 text-[10px]"
                    >
                      82%
                    </text>

                    <!-- bars -->
                    <rect
                        x="70"
                        y="80"
                        width="20"
                        height="4"
                        rx="2"
                        class="fill-gray-200 dark:fill-gray-700"
                    />
                    <rect
                        x="70"
                        y="88"
                        width="26"
                        height="4"
                        rx="2"
                        class="fill-gray-200 dark:fill-gray-700"
                    />
                    <rect
                        x="70"
                        y="96"
                        width="16"
                        height="4"
                        rx="2"
                        class="fill-gray-200 dark:fill-gray-700"
                    />

                    <!-- chips -->
                    <rect
                        x="30"
                        y="120"
                        width="26"
                        height="8"
                        rx="4"
                        class="fill-gray-100 dark:fill-gray-800"
                    />
                    <rect
                        x="60"
                        y="120"
                        width="30"
                        height="8"
                        rx="4"
                        class="fill-gray-100 dark:fill-gray-800"
                    />
                    <rect
                        x="42"
                        y="132"
                        width="34"
                        height="8"
                        rx="4"
                        class="fill-gray-100 dark:fill-gray-800"
                    />
                  </svg>
                </div>

                <p class="mt-3 text-xs text-gray-600 dark:text-gray-300">
                  Your quiz answers become an easy-to-skim profile and compatibility
                  score so potential roommates can understand your living style at a glance.
                </p>
              </div>

              <!-- Desktop sample cards (hide on small screens) -->
              <div class="hidden md:block space-y-4">
                <!-- Sample Match Card -->
                <div
                    class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-700 rounded-2xl shadow-sm p-5 space-y-3"
                >
                  <p class="text-xs text-gray-500 dark:text-gray-400">Sample match</p>

                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                        You & Alex
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        East Legon · 2 bed · ₵2,500
                      </p>
                    </div>

                    <div class="text-right">
                      <p class="text-xs text-gray-500 dark:text-gray-400">Match score</p>
                      <p class="text-xl font-semibold text-orange-600 dark:text-orange-400">
                        82%
                      </p>
                    </div>
                  </div>

                  <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                    <li>✅ Both prefer calm evenings</li>
                    <li>✅ Similar cleanliness expectations</li>
                    <li>✅ Budgets in the same range</li>
                    <li>⚠️ They host friends slightly more often</li>
                  </ul>
                </div>

                <!-- How it works -->
                <div
                    class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-700 rounded-2xl shadow-sm p-5 space-y-3"
                >
                  <p class="font-medium text-sm text-gray-900 dark:text-gray-50">
                    How it works
                  </p>

                  <ol
                      class="list-decimal ml-4 text-xs text-gray-600 dark:text-gray-300 space-y-1"
                  >
                    <li>Take a quick lifestyle quiz (sleep, guests, cleanliness, etc.).</li>
                    <li>Set your budget, area and non-negotiables.</li>
                    <li>See roommates & rooms with a clear compatibility score.</li>
                    <li>Chat, then request a viewing when it feels right.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- END RIGHT -->
        </div>
      </div>
    </div>

    <!-- NEW SECTION: Sample matches & personality types -->
    <section class="pb-12 md:pb-16 border-t border-gray-100 dark:border-gray-800">
      <div class="max-w-5xl mx-auto px-6 pt-8 md:pt-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-50">
            See your matches and living style at a glance.
          </h2>
          <p class="hidden md:block text-[11px] text-gray-500 dark:text-gray-400">
            These are examples. Your results are based on your quiz.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
          <!-- Sample match cards -->
          <div class="space-y-3">
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Sample matches
            </p>

            <div class="space-y-3">
              <!-- Match 1 -->
              <div
                  class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-3"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                      You & Nana
                    </p>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400">
                      Osu · 2 bed · ₵3,000 each
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-[11px] text-gray-500 dark:text-gray-400">
                      Match score
                    </p>
                    <p class="text-lg font-semibold text-orange-600 dark:text-orange-400">
                      89%
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-1.5 text-[11px]">
                  <span
                      class="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30"
                  >
                    Both early risers
                  </span>
                  <span
                      class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  >
                    Quiet on weeknights
                  </span>
                  <span
                      class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  >
                    Shared cleaning schedule
                  </span>
                </div>

                <p class="text-[11px] text-gray-600 dark:text-gray-300">
                  You both prefer a calm home, like things tidy, and host friends once or
                  twice a month — not every weekend.
                </p>
              </div>

              <!-- Match 2 -->
              <div
                  class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-3"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                      You & Ama
                    </p>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400">
                      Haatso · 3 bed · ₵2,200 each
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-[11px] text-gray-500 dark:text-gray-400">
                      Match score
                    </p>
                    <p class="text-lg font-semibold text-orange-600 dark:text-orange-400">
                      76%
                    </p>
                  </div>
                </div>

                <ul class="text-[11px] text-gray-600 dark:text-gray-300 space-y-1">
                  <li>✅ Both okay with guests on weekends</li>
                  <li>✅ Similar “medium” cleanliness expectations</li>
                  <li>⚠️ You sleep earlier — they’re more of a night owl</li>
                </ul>
              </div>
            </div>

            <p class="text-[11px] text-gray-500 dark:text-gray-400">
              Your real matches will show why you’re compatible and highlight any areas
              to chat about before moving in.
            </p>
          </div>

          <!-- Personality / preference type cards -->
          <div class="space-y-3">
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Personality & living style types
            </p>

            <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <!-- Type 1 -->
              <div
                  class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 space-y-1.5"
              >
                <p class="text-[11px] font-semibold text-orange-600 dark:text-orange-300 uppercase">
                  Type example
                </p>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                  The Quiet Weeknight Person
                </p>
                <p class="text-[11px] text-gray-600 dark:text-gray-300">
                  Loves a peaceful space after work, prefers headphones for calls,
                  and mostly hosts friends out, not at home.
                </p>
              </div>

              <!-- Type 2 -->
              <div
                  class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 space-y-1.5"
              >
                <p class="text-[11px] font-semibold text-orange-600 dark:text-orange-300 uppercase">
                  Type example
                </p>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                  The Social Host
                </p>
                <p class="text-[11px] text-gray-600 dark:text-gray-300">
                  Enjoys having people over on weekends, likes shared dinners and game
                  nights, and is upfront about their hosting habits.
                </p>
              </div>

              <!-- Type 3 -->
              <div
                  class="bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 space-y-1.5"
              >
                <p class="text-[11px] font-semibold text-orange-600 dark:text-orange-300 uppercase">
                  Type example
                </p>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
                  The Organized Sharer
                </p>
                <p class="text-[11px] text-gray-600 dark:text-gray-300">
                  Loves labelled shelves, shared cleaning rotas, and clear rules around
                  bills and who buys what.
                </p>
              </div>
            </div>

            <p class="text-[11px] text-gray-500 dark:text-gray-400">
              During onboarding, we’ll place you into a mix of types based on your quiz
              answers — then use that to find roommates whose style won’t stress you out.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: Built for how you actually live -->
    <section class="py-12 md:py-16">
      <div class="max-w-5xl mx-auto px-6 space-y-6">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Built for how you actually live — not just where you sleep.
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
          Most platforms only ask for price and location. Amigo Lease goes deeper, so you
          don’t end up sharing a home with someone whose lifestyle clashes with yours.
        </p>

        <div class="grid gap-4 md:grid-cols-3">
          <div
              class="bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-2"
          >
            <p class="text-xs font-semibold text-orange-600 dark:text-orange-300 uppercase">
              Quiz-powered matching
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
              Compatibility score that actually means something
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-300">
              We ask about routines, social energy, guests, noise, cleanliness and more,
              then turn it into a simple score and “why this works” breakdown.
            </p>
          </div>

          <div
              class="bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-2"
          >
            <p class="text-xs font-semibold text-orange-600 dark:text-orange-300 uppercase">
              Hosts & seekers
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
              One flow for rooms & roommates
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-300">
              Whether you have a spare room or need one, we match you on both the person
              and the place — not just a long list of random ads.
            </p>
          </div>

          <div
              class="bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-2"
          >
            <p class="text-xs font-semibold text-orange-600 dark:text-orange-300 uppercase">
              Dealbreakers upfront
            </p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
              No more awkward “I wish I’d known”
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-300">
              Set clear non-negotiables around smoking, pets, visitors and bills so you
              only see matches that respect your boundaries.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: Why Amigo Lease vs random listings -->
    <section class="pb-16">
      <div class="max-w-5xl mx-auto px-6 space-y-6">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Why not just use random listings or WhatsApp groups?
        </h2>

        <div
            class="grid gap-4 md:grid-cols-2 text-xs bg-white/80 dark:bg-gray-900/80 border border-gray-200/70 dark:border-gray-800 rounded-2xl overflow-hidden"
        >
          <div class="p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
            <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Typical listings & groups
            </p>
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• Long chats just to learn basic habits</li>
              <li>• No signal if you’ll clash on lifestyle</li>
              <li>• Scattered info across random screenshots</li>
              <li>• Easy to waste time viewing the wrong places</li>
            </ul>
          </div>

          <div class="p-4 bg-orange-50/50 dark:bg-orange-500/5">
            <p class="text-[11px] font-semibold text-orange-700 dark:text-orange-300 uppercase mb-2">
              Amigo Lease
            </p>
            <ul class="space-y-1 text-gray-800 dark:text-gray-100">
              <li>• Clear compatibility score before you chat</li>
              <li>• Lifestyle, budget & boundaries aligned upfront</li>
              <li>• One profile for both you and your space</li>
              <li>• Focus your energy on a few strong matches</li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <button
              @click="goToOnboarding"
              class="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            Start my compatibility quiz
          </button>
          <button
              @click="goToOnboarding"
              class="w-full sm:w-auto px-4 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 transition border-gray-300 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            I’m ready to list my room
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

const goToOnboarding = () => {
  router.push('/onboarding/role')
}
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.7s ease-out forwards;
  animation-delay: 0.05s;
}

.fade-in-up-delayed {
  opacity: 0;
  animation: fade-in-up 0.7s ease-out forwards;
  animation-delay: 0.15s;
}
</style>