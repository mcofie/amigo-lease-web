<template>
  <div class="min-h-screen bg-gray-50 px-4 py-10">
    <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">
      <!-- Header -->
      <header class="space-y-2">
        <p class="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
          Legal
        </p>
        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
          Terms of Service
        </h1>
        <p class="text-xs text-gray-500">
          Last updated: {{ lastUpdated }}
        </p>
      </header>

      <!-- Intro -->
      <section class="space-y-2 text-sm text-gray-700">
        <p>
          Welcome to <span class="font-semibold">Amigo Lease</span> (“we”, “us”, or “our”). These Terms of Service
          (“Terms”) explain what you can expect from us and what we expect from you when you use the Amigo Lease
          platform and services (the “Service”).
        </p>
        <p>
          By creating an account, accessing, or using Amigo Lease, you agree to these Terms. If you don’t agree,
          please don’t use the Service.
        </p>
      </section>

      <!-- 1. What Amigo Lease does -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          1. What Amigo Lease Does
        </h2>
        <p class="text-gray-700">
          Amigo Lease helps people find compatible roommates, explore listings, and connect with hosts or seekers
          through quizzes, preferences, and chat. We provide a matching and discovery platform —
          <span class="font-semibold">we do not own, manage, inspect, or guarantee any property</span>.
        </p>
      </section>

      <!-- 2. Your account -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          2. Your Account
        </h2>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>You must provide accurate and truthful information.</li>
          <li>You are responsible for all activity that happens under your account.</li>
          <li>Keep your login details secure and do not share your password.</li>
          <li>
            We may suspend or close accounts that violate these Terms, harm other users, or misuse the platform.
          </li>
        </ul>
      </section>

      <!-- 3. Your responsibilities -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          3. Your Responsibilities
        </h2>
        <p class="text-gray-700">
          When using Amigo Lease, you agree to:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Use the Service lawfully and respectfully.</li>
          <li>Post only accurate, up-to-date information.</li>
          <li>Not harass, abuse, or scam other users.</li>
          <li>Not upload harmful, offensive, or illegal content.</li>
        </ul>
        <p class="text-gray-700">
          Hosts are solely responsible for their listings and communication with potential roommates.
          Seekers are responsible for verifying any property, contract terms, safety, and suitability.
        </p>
      </section>

      <!-- 4. Matching & messaging -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          4. Matching & Messaging
        </h2>
        <p class="text-gray-700">
          Our quizzes and matching system help estimate compatibility, but
          <span class="font-semibold">we do not guarantee any particular match, outcome, or agreement</span>.
          Always use your own judgment, meet people safely, and verify all information independently.
        </p>
      </section>

      <!-- 5. Payments -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          5. Payments & Agreements Between Users
        </h2>
        <p class="text-gray-700">
          Amigo Lease currently does not process rent or other payments between users. Any rental agreement or
          financial arrangement is strictly between the host and the seeker. We are not a party to those agreements.
        </p>
      </section>

      <!-- 6. Content -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          6. Content You Submit
        </h2>
        <p class="text-gray-700">
          You keep ownership of the content you submit (such as listings, profile information, and messages).
          You grant Amigo Lease a limited license to use, display, and process this content within the Service
          to operate and improve the platform.
        </p>
        <p class="text-gray-700">
          You agree not to upload:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Content that infringes on someone else’s rights.</li>
          <li>Offensive, hateful, or sexually explicit content.</li>
          <li>Deceptive, fraudulent, or misleading information.</li>
        </ul>
      </section>

      <!-- 7. Availability -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          7. Service Availability
        </h2>
        <p class="text-gray-700">
          We work to keep Amigo Lease reliable, but we can’t guarantee:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Uninterrupted operation of the Service.</li>
          <li>Access to all features at all times.</li>
          <li>The absence of bugs, delays, or errors.</li>
        </ul>
        <p class="text-gray-700">
          We may modify, pause, or discontinue features or the Service at any time.
        </p>
      </section>

      <!-- 8. Liability -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          8. Limitation of Liability
        </h2>
        <p class="text-gray-700">
          To the maximum extent permitted by law, Amigo Lease and its owners, team, and partners are not liable for:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Disputes, communications, or agreements between users.</li>
          <li>Property conditions, safety, legality, or accuracy of listings.</li>
          <li>Losses or damages arising from using or being unable to use the Service.</li>
        </ul>
        <p class="text-gray-700">
          You use Amigo Lease at your own risk and are responsible for your own decisions.
        </p>
      </section>

      <!-- 9. Ending use -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          9. Ending Your Use
        </h2>
        <p class="text-gray-700">
          You may stop using Amigo Lease or delete your account at any time.
          We may suspend or terminate access if you violate these Terms, harm other users,
          or misuse the platform.
        </p>
      </section>

      <!-- 10. Changes -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          10. Changes to These Terms
        </h2>
        <p class="text-gray-700">
          We may update these Terms from time to time. If we make important changes, we’ll take reasonable
          steps to let you know (for example, via email or in-app notices). Your continued use of the Service
          after changes take effect means you accept the updated Terms.
        </p>
      </section>

      <!-- 11. Contact -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          11. Contact Us
        </h2>
        <p class="text-gray-700">
          If you have questions about these Terms, you can contact us at:
        </p>
        <p class="text-gray-800 font-medium">
          support@amigolease.com
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service - Amigo Lease',
  description: 'Read our Terms of Service to understand the rules and regulations for using Amigo Lease.',
})
const lastUpdated = '{{ insert date }}' // e.g. '19 November 2025'

definePageMeta({
  layout: 'default', // or 'onboarding'/'legal' if you have one
  title: 'Terms of Service – Amigo Lease'
})
</script>