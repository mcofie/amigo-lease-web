<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-gray-50">

      <!-- Top Bar -->
      <header class="w-full border-b bg-white/80 backdrop-blur">
        <UContainer class="flex items-center justify-between py-4">
          <div class="flex items-center gap-2">
            <span class="text-lg font-semibold">Amigo Lease</span>
            <UBadge variant="soft" color="primary" size="xs">beta</UBadge>
          </div>

          <UButton
              color="primary"
              variant="soft"
              size="sm"
              @click="goToOnboarding"
          >
            Get started
          </UButton>
        </UContainer>
      </header>

      <!-- Hero Section -->
      <main class="flex-1 flex items-center">
        <UContainer class="py-12">
          <div class="grid gap-12 md:grid-cols-2 items-center">

            <!-- Left: Hero Text -->
            <div class="space-y-5">
              <h1 class="text-3xl md:text-4xl font-semibold leading-tight">
                Find the friend<br/>
                in your next roommate.
              </h1>

              <p class="text-sm text-gray-600">
                Amigo Lease uses playful quizzes and smart matching to connect you
                with people you’ll actually enjoy living with — not just whoever is
                available.
              </p>

              <!-- Feature Pills -->
              <div class="flex flex-wrap gap-2 mt-1">
                <UBadge color="primary" variant="outline" size="xs">
                  Lifestyle-based matches
                </UBadge>
                <UBadge color="secondary" variant="outline" size="xs">
                  Quiz-powered profiles
                </UBadge>
                <UBadge color="error" variant="outline" size="xs">
                  Hosts & seekers
                </UBadge>
              </div>

              <!-- Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 pt-4">
                <UButton
                    color="primary"
                    variant="solid"
                    size="md"
                    class="sm:w-auto w-full"
                    @click="goToOnboarding"
                >
                  Start the quiz
                </UButton>

                <UButton
                    color="gray"
                    variant="outline"
                    size="md"
                    class="sm:w-auto w-full"
                    @click="goToOnboarding"
                >
                  I already have a place
                </UButton>
              </div>
            </div>

            <!-- Right: Sample Cards -->
            <div class="hidden md:flex justify-center">
              <div class="w-full max-w-xs space-y-4">

                <!-- Sample Match Card -->
                <UCard class="shadow-sm">
                  <template #header>
                    <p class="text-xs text-gray-500">Sample match</p>
                  </template>

                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">You & Alex</p>
                      <p class="text-xs text-gray-500">
                        East Legon · 2 bed · ₵2,500
                      </p>
                    </div>

                    <div class="text-right">
                      <p class="text-xs text-gray-500">Match score</p>
                      <p class="text-lg font-semibold text-primary-600">82%</p>
                    </div>
                  </div>

                  <ul class="text-xs text-gray-600 space-y-1 mt-3">
                    <li>✅ Both prefer calm evenings</li>
                    <li>✅ Similar cleanliness levels</li>
                    <li>⚠️ They host friends slightly more often</li>
                  </ul>
                </UCard>

                <!-- How It Works -->
                <UCard>
                  <template #header>
                    <p class="font-medium text-sm">How it works</p>
                  </template>

                  <ol class="list-decimal ml-4 text-xs text-gray-600 space-y-1">
                    <li>Take a quick lifestyle quiz</li>
                    <li>Tell us your dealbreakers</li>
                    <li>See roommates & rooms that fit your vibe</li>
                  </ol>
                </UCard>

              </div>
            </div>

          </div>
        </UContainer>
      </main>

      <!-- Footer -->
      <footer class="border-t bg-white/80 backdrop-blur py-4 text-xs text-gray-500">
        <UContainer class="flex justify-between">
          <span>© {{ year }} Amigo Lease</span>
          <span>Built with Nuxt & Supabase</span>
        </UContainer>
      </footer>

    </div>
  </UApp>
</template>

<script setup lang="ts">
const router = useRouter()
const year = new Date().getFullYear()

const goToOnboarding = () => {
  router.push('/onboarding/role')
}
</script>