<template>
  <main
      class="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-black"
  >
    <!-- HERO -->
    <section class="relative flex items-center overflow-hidden">
      <!-- Soft background accent -->
      <div
          class="pointer-events-none absolute -top-24 -right-40 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl opacity-70 dark:bg-orange-500/20 dark:opacity-60"
          aria-hidden="true"
      ></div>

      <div class="relative w-full max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div class="grid gap-12 md:grid-cols-2 items-center">
          <!-- LEFT: TEXT -->
          <div class="space-y-6 fade-in-up">
            <!-- Eyebrow -->
            <div
                class="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full shadow-sm/10 dark:bg-orange-500/10 dark:border-orange-500/30"
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
              Find a roommate<br/>
              you’ll actually vibe with.
            </h1>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-md">
              Amigo Lease starts with a playful lifestyle quiz. We turn your routines,
              boundaries and budget into a compatibility score, then connect you with
              people and places that feel like an easy fit — whether you’re hosting or
              looking for a room.
            </p>

            <!-- Feature pills -->
            <div class="flex flex-wrap gap-2 pt-1 text-xs">
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 bg-white/70 backdrop-blur dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900/60"
              >
                Quiz-powered compatibility score
              </span>
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 bg-white/70 backdrop-blur dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900/60"
              >
                Hosts & seekers in one place
              </span>
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 bg-white/70 backdrop-blur dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900/60"
              >
                Habits, boundaries & budget aligned
              </span>
              <span
                  class="px-3 py-1 rounded-full border text-gray-700 border-gray-200 bg-white/70 backdrop-blur dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900/60"
              >
                Dealbreakers agreed upfront
              </span>
            </div>

            <!-- Primary actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                  type="button"
                  @click="goToOnboarding"
                  class="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors shadow-sm dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                Take the roommate quiz
              </button>

              <button
                  type="button"
                  @click="goToOnboarding"
                  class="w-full sm:w-auto px-4 py-2.5 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border-gray-300 bg-white/70 backdrop-blur dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900/60 dark:hover:bg-gray-800"
              >
                List my spare room
              </button>
            </div>

            <p class="text-xs text-gray-400 dark:text-gray-500">
              ~5 minutes · No long forms · Change your answers anytime
            </p>
          </div>

          <!-- RIGHT: VISUAL AREA -->
          <div class="flex justify-center fade-in-up-delayed">
            <img
                src="/images/handshake.gif"
                alt="Amigo Lease animation"
                class="w-full max-w-[460px]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: Sample matches with themed background -->
    <section
        class="py-12 md:py-16 bg-orange-50/80 dark:bg-orange-950/30 border-y border-orange-100 dark:border-orange-900"
    >
      <div class="max-w-5xl mx-auto px-6 space-y-6">
        <!-- Header -->
        <div class="space-y-1 fade-in-up">
          <p
              class="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide text-orange-700 uppercase dark:text-orange-300"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            Preview
          </p>
          <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50">
            See your matches and living style at a glance.
          </h2>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            These examples show how your matches and homes will appear once you complete the quiz.
          </p>
        </div>

        <!-- Cards -->
        <div
            class="mt-4 -mx-2 flex gap-4 overflow-x-auto pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible cards-reveal"
        >
          <!-- CARD 1 -->
          <article
              class="min-w-[260px] max-w-xs md:max-w-none bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900 rounded-2xl p-5 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.25)] flex flex-col gap-3
                   transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  You & Nana
                </h3>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  Osu · 2 bed · ₵3,000 each
                </p>
              </div>
              <div class="text-right">
                <p class="text-[10px] text-gray-400">Match</p>
                <p class="text-xl font-bold text-orange-600 dark:text-orange-400">
                  89%
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 text-[11px] leading-tight">
              <span
                  class="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:text-green-300"
              >
                Early risers
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                Quiet weeknights
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                Shared cleaning
              </span>
            </div>

            <p class="text-[11px] text-gray-600 dark:text-gray-300">
              Ideal for someone who prefers calm evenings, clear routines, and light hosting.
            </p>
          </article>

          <!-- CARD 2 -->
          <article
              class="min-w-[260px] max-w-xs md:max-w-none bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900 rounded-2xl p-5 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.25)] flex flex-col gap-3
                   transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Ensuite room in shared home
                </h3>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  East Legon · 3 bed · ₵2,400/mo
                </p>
              </div>
              <div class="text-right">
                <p class="text-[10px] text-gray-400">Fit score</p>
                <p class="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  84%
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 text-[11px]">
              <span
                  class="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:text-green-300"
              >
                Pet-friendly 🐾
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800"
              >
                No smoking 🚭
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800"
              >
                Cleaning rota
              </span>
            </div>

            <p class="text-[11px] text-gray-600 dark:text-gray-300">
              A bright ensuite with a host whose habits and dealbreakers line up with yours.
            </p>
          </article>

          <!-- CARD 3 -->
          <article
              class="min-w-[260px] max-w-xs md:max-w-none bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900 rounded-2xl p-5 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.25)] flex flex-col gap-3
                   transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  You & Kojo
                </h3>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  Haatso · 3 bed · ₵2,100 each
                </p>
              </div>
              <div class="text-right">
                <p class="text-[10px] text-gray-400">Match</p>
                <p class="text-xl font-bold text-orange-600 dark:text-orange-400">
                  78%
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 text-[11px]">
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800"
              >
                Weekend guests
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800"
              >
                Medium noise
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-300"
              >
                1 small flag
              </span>
            </div>

            <p class="text-[11px] text-gray-600 dark:text-gray-300">
              Great alignment on social energy & budget — just chat about sleep schedules.
            </p>
          </article>
        </div>

        <!-- CTA Row -->
        <div
            class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 fade-in-up-delayed"
        >
          <p class="text-[11px] text-gray-600 dark:text-gray-400">
            When you’re signed in, this section turns into real people and real homes based on your quiz.
          </p>
          <NuxtLink
              to="/matches"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-medium hover:bg-black transition dark:bg-white dark:text-black dark:hover:bg-gray-100 shadow-sm"
          >
            View my matches
            <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- SECTION: Built for how you live -->
    <section class="py-14 md:py-20 bg-white dark:bg-gray-950">
      <div class="max-w-5xl mx-auto px-6 space-y-10">

        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-50">
            Built for how you actually live.
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Not just rooms — real-life compatibility based on habits, boundaries and lifestyle.
          </p>
        </div>

        <!-- Cards -->
        <div class="grid gap-6 md:grid-cols-3">

          <!-- Card -->
          <article
              class="rounded-2xl p-5 text-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-200
               bg-gradient-to-br from-orange-500 to-rose-500 dark:from-orange-600 dark:to-rose-600 relative overflow-hidden"
          >
            <div class="text-4xl mb-3">🎯</div>
            <h3 class="text-base font-semibold">Quiz-powered matching</h3>
            <p class="text-xs text-white/95 leading-relaxed">
              We ask about routines, guests, noise, cleanliness and more —
              then turn it into a compatibility score that actually means something.
            </p>
          </article>

          <!-- Card -->
          <article
              class="rounded-2xl p-5 text-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-200
               bg-gradient-to-br from-orange-500 to-rose-500 dark:from-orange-600 dark:to-rose-600 relative overflow-hidden"
          >
            <div class="text-4xl mb-3">🏠</div>
            <h3 class="text-base font-semibold">Hosts & seekers together</h3>
            <p class="text-xs text-white/95 leading-relaxed">
              Whether you have a spare room or need one, you’re matched on both lifestyle
              and living conditions — not random ads or WhatsApp spams.
            </p>
          </article>

          <!-- Card -->
          <article
              class="rounded-2xl p-5 text-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-200
               bg-gradient-to-br from-orange-500 to-rose-500 dark:from-orange-600 dark:to-rose-600 relative overflow-hidden"
          >
            <div class="text-4xl mb-3">🚦</div>
            <h3 class="text-base font-semibold">Dealbreakers upfront</h3>
            <p class="text-xs text-white/95 leading-relaxed">
              Set non-negotiables like smoking, pets, visitors and bills so you
              only see matches that respect your boundaries.
            </p>
          </article>

        </div>

        <!-- CTA BUTTON -->
        <!-- CTA BUTTONS -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 fade-in-up">

          <!-- Primary CTA -->
          <button
              @click="goToOnboarding"
              class="relative px-7 py-3 rounded-full bg-black text-white text-sm font-medium shadow-sm
           hover:bg-gray-900 transition-all select-none
           dark:bg-white dark:text-black dark:hover:bg-gray-100
           group overflow-hidden"
          >
            <!-- Glow effect -->
            <span
                class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity
             bg-gradient-to-r from-orange-500 to-rose-500 blur-xl"
            ></span>

            <span class="relative z-10">Start now</span>
          </button>

          <!-- Secondary (Ghost) CTA -->
          <button
              @click="goToOnboarding"
              class="px-7 py-3 rounded-full border border-gray-300 bg-white/70 backdrop-blur text-sm font-medium
           text-gray-700 hover:bg-gray-100 transition-all select-none
           dark:text-gray-100 dark:border-gray-700 dark:bg-gray-900/60 dark:hover:bg-gray-800"
          >
            Take the lifestyle quiz
          </button>

        </div>

      </div>
    </section>

    <!-- SECTION: Quiz Summary & Personality Types -->
    <section
        class="relative pb-16 pt-16 bg-rose-50/80 dark:bg-rose-950/30 border-y border-rose-100 dark:border-rose-900 overflow-hidden"
    >
      <!-- Soft animated background blobs -->
      <div
          class="pointer-events-none absolute -top-24 -left-32 h-64 w-64 rounded-full bg-orange-200/60 blur-3xl opacity-70 dark:bg-orange-500/30 animate-blob"
      ></div>
      <div
          class="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-rose-200/70 blur-3xl opacity-60 dark:bg-rose-500/25 animate-blob-slow"
      ></div>

      <div class="relative max-w-5xl mx-auto px-6 space-y-10">
        <!-- Header -->
        <div class="space-y-2 fade-in-up">
          <p
              class="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase text-rose-700 dark:text-rose-300"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            Quiz Summary Sample
          </p>
          <h2 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50">
            What your vibe summary looks like after the quiz.
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 max-w-lg">
            This is an example of what someone sees when they match with you — a clear snapshot of your lifestyle,
            boundaries, and household preferences.
          </p>
        </div>

        <!-- 3-Column Layout -->
        <div class="grid gap-6 md:grid-cols-3">
          <!-- QUIZ SUMMARY CARD -->
          <article
              class="bg-white/95 dark:bg-gray-900/95 border border-rose-100/80 dark:border-rose-900 rounded-2xl p-5 shadow-sm flex flex-col gap-4 card-lift fade-in-up"
              style="animation-delay: 0.05s"
          >
            <p class="text-xs font-semibold text-rose-600 dark:text-rose-300 uppercase">
              Your Summary
            </p>

            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900 dark:text-gray-50">
                Lifestyle Compatibility Snapshot
              </h3>
              <span
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/40"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                82% match
              </span>
            </div>

            <p class="text-[11px] text-gray-600 dark:text-gray-300">
              Based on sample answers, this is the kind of quick overview your matches will see — a clean, friendly
              breakdown of your living style.
            </p>

            <div class="flex flex-wrap gap-1.5 text-[11px]">
              <span
                  class="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30"
              >
                Tidy & considerate
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              >
                Quiet weeknights
              </span>
              <span
                  class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300"
              >
                Low-drama household
              </span>
            </div>
          </article>

          <!-- PERSONALITY TYPE CARD -->
          <article
              class="bg-white/95 dark:bg-gray-900/95 border border-rose-100/80 dark:border-rose-900 rounded-2xl p-5 shadow-sm flex flex-col gap-3 card-lift fade-in-up"
              style="animation-delay: 0.15s"
          >
            <p class="text-xs font-semibold text-rose-600 dark:text-rose-300 uppercase">
              Personality Type
            </p>

            <h3 class="text-sm font-medium text-gray-900 dark:text-gray-50">
              “The Calm Weeknight Roommate”
            </h3>

            <p class="text-[11px] text-gray-600 dark:text-gray-300">
              You prefer peaceful evenings, shared respect for quiet hours, and maintaining a clean, comfy living space
              without stress.
            </p>

            <ul class="space-y-1 text-[11px] text-gray-600 dark:text-gray-300">
              <li>• Loves structure & predictable routines</li>
              <li>• Hosts rarely, but warmly</li>
              <li>• Works well with tidy, mindful roommates</li>
            </ul>
          </article>

          <!-- CATEGORY BREAKDOWN CARD -->
          <article
              class="bg-white/95 dark:bg-gray-900/95 border border-rose-100/80 dark:border-rose-900 rounded-2xl p-5 shadow-sm flex flex-col gap-4 card-lift fade-in-up"
              style="animation-delay: 0.25s"
          >
            <p class="text-xs font-semibold text-rose-600 dark:text-rose-300 uppercase">
              Category Breakdown
            </p>

            <div class="space-y-3 text-[11px]">
              <!-- Cleanliness -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Cleanliness</span>
                  <span class="font-semibold text-rose-600 dark:text-rose-300">High</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-gray-200/80 dark:bg-gray-800 overflow-hidden">
                  <div
                      class="h-full w-4/5 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 bar-fill"
                  ></div>
                </div>
              </div>

              <!-- Noise -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Noise Tolerance</span>
                  <span class="font-semibold text-rose-600 dark:text-rose-300">Low</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-gray-200/80 dark:bg-gray-800 overflow-hidden">
                  <div
                      class="h-full w-2/5 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 bar-fill"
                  ></div>
                </div>
              </div>

              <!-- Social -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Social Energy</span>
                  <span class="font-semibold text-rose-600 dark:text-rose-300">Medium</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-gray-200/80 dark:bg-gray-800 overflow-hidden">
                  <div
                      class="h-full w-1/2 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 bar-fill"
                  ></div>
                </div>
              </div>

              <!-- Sleep -->
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Sleep Schedule</span>
                  <span class="font-semibold text-rose-600 dark:text-rose-300">Early</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-gray-200/80 dark:bg-gray-800 overflow-hidden">
                  <div
                      class="h-full w-3/4 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 bar-fill"
                  ></div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- CTA BUTTONS -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2 fade-in-up-delayed">
          <button
              type="button"
              @click="goToOnboarding"
              class="w-full sm:w-auto px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            Start my compatibility quiz
          </button>
          <button
              type="button"
              @click="goToOnboarding"
              class="w-full sm:w-auto px-4 py-2 rounded-lg border text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border-gray-300 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            I’m ready to list my room
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {useRouter} from '#imports'

const router = useRouter()

const goToOnboarding = () => {
  router.push('/onboarding/role')
}
</script>

<style scoped>
/* Base fade-in animation */
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

/* Elements that fade in */
.fade-in-up,
.fade-in-up-delayed {
  opacity: 0;
  animation: fade-in-up 0.7s ease-out forwards;
}

/* Staggered timings */
.fade-in-up {
  animation-delay: 0.05s;
}

.fade-in-up-delayed {
  animation-delay: 0.2s;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .fade-in-up-delayed,
  .cards-reveal > article {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .bar-fill {
    animation: none !important;
    transform: scaleX(1) !important;
  }
}

/* Horizontal cards reveal */
.cards-reveal > article {
  opacity: 0;
  transform: translateY(10px);
  animation: fade-in-up 0.6s ease-out forwards;
}

.cards-reveal > article:nth-child(2) {
  animation-delay: 0.08s;
}

.cards-reveal > article:nth-child(3) {
  animation-delay: 0.16s;
}

/* Blob animations */
@keyframes blob {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-6px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 14s ease-in-out infinite;
}

.animate-blob-slow {
  animation: blob 20s ease-in-out infinite;
}

/* Card hover */
.card-lift {
  transition: transform 0.18s ease-out,
  box-shadow 0.18s ease-out,
  background-color 0.18s ease-out,
  border-color 0.18s ease-out;
}

.card-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
}

/* Animated bar fill */
@keyframes bar-fill-in {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.bar-fill {
  transform-origin: left center;
  transform: scaleX(0);
  animation: bar-fill-in 0.6s ease-out forwards;
}
</style>