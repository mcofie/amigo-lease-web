<template>
  <main
      class="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-gray-950 dark:text-white"
  >
    <!-- HERO -->
    <section class="relative flex items-center overflow-hidden pt-10 pb-20 lg:pt-24">
      <!-- Modern Mesh Gradients (Warmer Tones) -->
      <div
          class="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-orange-500/20 blur-[120px] opacity-60 dark:bg-orange-600/10"
          aria-hidden="true"
      ></div>
      <div
          class="absolute top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-rose-500/20 blur-[120px] opacity-60 dark:bg-rose-600/10"
          aria-hidden="true"
      ></div>

      <div class="relative w-full max-w-6xl mx-auto px-6">
        <div class="grid gap-16 lg:grid-cols-2 items-center">
          <!-- LEFT: TEXT -->
          <div class="space-y-8 fade-in-up max-w-xl">
            <!-- Eyebrow -->
            <div
                class="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-orange-200 px-4 py-2 rounded-full shadow-sm shadow-orange-500/10 dark:bg-white/5 dark:border-white/10"
            >
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <span class="text-orange-700 text-xs font-bold tracking-wide uppercase dark:text-orange-200">
                Match Habits, Not Just Rooms
              </span>
            </div>

            <!-- Headline -->
            <h1
                class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] dark:text-white"
            >
              Find a roommate<br />
              you <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-600 to-amber-500 dark:from-orange-400 dark:via-rose-400 dark:to-amber-300">actually vibe</span> with.
            </h1>

            <!-- Description -->
            <p class="text-lg md:text-xl text-slate-600 leading-relaxed dark:text-slate-400">
              Amigo Lease turns your routines, boundaries, and budget into a
              <strong class="text-slate-900 dark:text-white">compatibility score</strong>. Connect with people and places
              that feel like home—without the awkward interviews.
            </p>

            <!-- Feature pills -->
            <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                ✨ Quiz-powered matching
              </span>
              <span class="px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                🏡 Verified lifestyles
              </span>
              <span class="px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                🛡️ Dealbreakers upfront
              </span>
            </div>

            <!-- Primary actions -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                  type="button"
                  @click="goToOnboarding"
                  class="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-rose-600 px-8 font-bold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <span class="mr-2 text-lg">Take the Quiz</span>
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button
                  type="button"
                  @click="goToOnboarding"
                  class="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                List my place
              </button>
            </div>

            <!-- Social Proof -->
            <div class="flex items-center gap-4 pt-4">
              <div class="flex -space-x-4">
                <img class="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 object-cover" src="https://i.pravatar.cc/100?img=12" alt="User">
                <img class="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 object-cover" src="https://i.pravatar.cc/100?img=32" alt="User">
                <img class="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 object-cover" src="https://i.pravatar.cc/100?img=47" alt="User">
                <div class="w-10 h-10 rounded-full border-4 border-white bg-orange-50 flex items-center justify-center text-xs font-bold text-orange-700 dark:border-slate-900 dark:bg-slate-800 dark:text-orange-400">
                  +2k
                </div>
              </div>
              <div>
                <div class="flex gap-0.5 text-amber-400">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Trusted by happy roommates</p>
              </div>
            </div>
          </div>

          <!-- RIGHT: VISUAL AREA -->
          <div class="relative flex justify-center fade-in-up-delayed perspective-1000">
            <!-- Decorative blob -->
            <div class="absolute inset-0 bg-gradient-to-tr from-orange-400 to-rose-500 rounded-full blur-[80px] opacity-30 scale-90 animate-pulse-slow dark:opacity-20"></div>

            <!-- Image Container -->
            <div class="relative w-full max-w-[420px] transform transition-transform hover:scale-[1.02] duration-500 group">
              <!-- Glass ring -->
              <div class="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-b from-white/60 to-white/0 border border-white/30 blur-sm"></div>

              <img
                  src="/images/handshake.gif"
                  alt="Amigo Lease match"
                  class="relative rounded-[2rem] shadow-2xl shadow-orange-900/20 border-4 border-white dark:border-slate-800 dark:shadow-black/50 w-full h-auto"
              />

              <!-- Floating Badge: Match Score -->
              <div class="absolute top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float delay-100 dark:bg-slate-800 dark:border-slate-700">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  94%
                </div>
                <div>
                  <p class="text-xs text-slate-500 font-semibold uppercase tracking-wide dark:text-slate-400">Compatibility</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">Perfect Match</p>
                </div>
              </div>

              <!-- Floating Badge: Vibe -->
              <div class="absolute -bottom-6 -left-6 bg-white p-3 pr-5 rounded-full shadow-xl border border-slate-100 flex items-center gap-3 animate-float dark:bg-slate-800 dark:border-slate-700">
                <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg">
                  🌿
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">Chill & Tidy</p>
                  <p class="text-[10px] text-slate-500 font-medium dark:text-slate-400">Verified Vibe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: ARCHETYPES TEASER (NEW) -->
    <section class="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 relative overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none dark:from-orange-900/10"></div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span class="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider dark:bg-orange-900/30 dark:text-orange-400">
              Know Thyself
            </span>
          <h2 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            What’s your roommate <span class="text-orange-600 dark:text-orange-500">archetype?</span>
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            Are you a <strong>Social Sunbeam</strong> or a <strong>Quiet Nest-Builder</strong>? Discover your living style and find people who complement it perfectly.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Arch Card 1 -->
          <div class="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-orange-500/30">
            <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🕯️</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2 dark:text-white">The Quiet Nest-Builder</h3>
            <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
              Home is a sanctuary. You value peace, cozy evenings, and a tidy space to recharge.
            </p>
          </div>

          <!-- Arch Card 2 -->
          <div class="group relative bg-white rounded-3xl p-8 border-2 border-orange-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 dark:bg-slate-800 dark:border-orange-500/30">
            <div class="absolute top-4 right-4 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide dark:bg-orange-900/50 dark:text-orange-300">Popular</div>
            <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🦎</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2 dark:text-white">The Easygoing Chameleon</h3>
            <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
              Flexible and chill. You can vibe with almost anyone as long as there's mutual respect.
            </p>
          </div>

          <!-- Arch Card 3 -->
          <div class="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-orange-500/30">
            <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎉</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2 dark:text-white">The Party Pulse</h3>
            <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
              Home is a hub. You love hosting dinners, game nights, and keeping the energy high.
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <button
              @click="goToArchetypes"
              class="inline-flex items-center gap-2 text-sm font-bold text-slate-900 border-b-2 border-slate-900 hover:text-orange-600 hover:border-orange-600 transition-colors pb-0.5 dark:text-white dark:border-white dark:hover:text-orange-400 dark:hover:border-orange-400"
          >
            Explore all 6 archetypes
            <span class="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION: Sample matches -->
    <section
        class="py-24 bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-slate-800"
    >
      <div class="max-w-6xl mx-auto px-6 space-y-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="max-w-2xl space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              See your matches at a glance.
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-400">
              No hidden surprises. See compatibility scores, dealbreakers, and vibe checks upfront.
            </p>
          </div>
          <button
              @click="goToMatches"
              class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
          >
            View Live Demo
          </button>
        </div>

        <!-- Cards Grid -->
        <div class="grid gap-6 md:grid-cols-3 cards-reveal">
          <!-- CARD 1 -->
          <article class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700 group">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors dark:text-white">
                  You & Nana
                </h3>
                <p class="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                  Osu · 2 bed · ₵3,000
                </p>
              </div>
              <div class="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg font-bold text-sm border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
                89%
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">Early risers</span>
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">Quiet nights</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
              Ideal for someone who prefers calm evenings, clear routines, and light hosting.
            </p>
          </article>

          <!-- CARD 2 -->
          <article class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700 group">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors dark:text-white">
                  Shared Home
                </h3>
                <p class="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                  East Legon · ₵2,400
                </p>
              </div>
              <div class="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg font-bold text-sm border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                92%
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">Pet-friendly 🐾</span>
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">No smoking</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
              A bright ensuite with a host whose habits line up with yours.
            </p>
          </article>

          <!-- CARD 3 -->
          <article class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer dark:bg-gray-900 dark:border-slate-800 dark:hover:border-slate-700 group">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors dark:text-white">
                  You & Kojo
                </h3>
                <p class="text-xs font-medium text-slate-500 mt-1 dark:text-slate-400">
                  Haatso · 3 bed · ₵2,100
                </p>
              </div>
              <div class="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg font-bold text-sm border border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                78%
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">Social</span>
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">1 Flag</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
              Great alignment on budget — just check on sleep schedules.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION: Final CTA -->
    <section class="py-24 bg-white dark:bg-gray-950">
      <div class="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Ready to find your <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">roommate soulmate?</span>
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Join thousands of roommates who found their perfect match. No awkward interviews, just good vibes.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
              @click="goToOnboarding"
              class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white text-base font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-200 dark:bg-white dark:text-slate-900"
          >
            Start Compatibility Quiz
          </button>
          <button
              @click="goToOnboarding"
              class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 text-slate-900 text-base font-bold hover:bg-slate-200 transition-all duration-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            List Your Room
          </button>
        </div>

        <p class="text-xs text-slate-400 dark:text-slate-500">
          Free to join · No credit card required
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

const goToOnboarding = () => {
  router.push('/onboarding/role')
}

const goToArchetypes = () => {
  router.push('/archetypes')
}

const goToMatches = () => {
  router.push('/matches')
}
</script>

<style scoped>
/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 0.5; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-glow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.fade-in-up-delayed {
  opacity: 0;
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}

.cards-reveal > article {
  opacity: 0;
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.cards-reveal > article:nth-child(1) { animation-delay: 0.1s; }
.cards-reveal > article:nth-child(2) { animation-delay: 0.2s; }
.cards-reveal > article:nth-child(3) { animation-delay: 0.3s; }

.perspective-1000 {
  perspective: 1000px;
}
</style>