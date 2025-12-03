<template>
  <section class="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -left-64 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 -right-64 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span class="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider dark:bg-orange-900/30 dark:text-orange-400">
          Simple Process
        </span>
        <h2 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          How Amigo Lease works
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          From "stranger" to "roommate" in four simple steps. No ghosting, no guessing.
        </p>
      </div>

      <div class="grid md:grid-cols-4 gap-8 relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-orange-200 via-rose-200 to-orange-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 -z-10"></div>

        <!-- Step 1 -->
        <div class="relative flex flex-col items-center text-center group">
          <div class="w-24 h-24 rounded-3xl bg-white border-2 border-orange-100 shadow-lg flex items-center justify-center text-4xl mb-6 relative z-10 group-hover:scale-110 group-hover:border-orange-300 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:border-orange-500/50">
            📝
            <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">1</div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3 dark:text-white">Take the Quiz</h3>
          <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
            Answer 15 quick questions about your habits, boundaries, and lifestyle.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="relative flex flex-col items-center text-center group">
          <div class="w-24 h-24 rounded-3xl bg-white border-2 border-orange-100 shadow-lg flex items-center justify-center text-4xl mb-6 relative z-10 group-hover:scale-110 group-hover:border-orange-300 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:border-orange-500/50">
            🧩
            <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">2</div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3 dark:text-white">Get Matched</h3>
          <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
            Our algorithm finds people who match your vibe and budget perfectly.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="relative flex flex-col items-center text-center group">
          <div class="w-24 h-24 rounded-3xl bg-white border-2 border-orange-100 shadow-lg flex items-center justify-center text-4xl mb-6 relative z-10 group-hover:scale-110 group-hover:border-orange-300 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:border-orange-500/50">
            💬
            <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">3</div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3 dark:text-white">Chat Safely</h3>
          <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
            Break the ice with our guided prompts. No phone numbers needed yet.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="relative flex flex-col items-center text-center group">
          <div class="w-24 h-24 rounded-3xl bg-white border-2 border-orange-100 shadow-lg flex items-center justify-center text-4xl mb-6 relative z-10 group-hover:scale-110 group-hover:border-orange-300 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:border-orange-500/50">
            🏠
            <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">4</div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3 dark:text-white">Move In</h3>
          <p class="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
            Sign the lease and start your new chapter with a friend, not a stranger.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
