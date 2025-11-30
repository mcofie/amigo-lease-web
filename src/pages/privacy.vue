<template>
  <div class="min-h-screen bg-gray-50 px-4 py-10">
    <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">
      <!-- Header -->
      <header class="space-y-2">
        <p class="text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
          Legal
        </p>
        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
          Privacy Policy
        </h1>
        <p class="text-xs text-gray-500">
          Last updated: {{ lastUpdated }}
        </p>
      </header>

      <!-- Intro -->
      <section class="space-y-2 text-sm text-gray-700">
        <p>
          This Privacy Policy explains how <span class="font-semibold">Amigo Lease</span> (“we”, “us”, or “our”)
          collects, uses, and protects your information when you use our platform and services (“Service”).
        </p>
        <p>
          By using Amigo Lease, you agree to this Policy. If you do not agree, please stop using the Service.
        </p>
      </section>

      <!-- 1. Data we collect -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          1. Information We Collect
        </h2>

        <h3 class="text-sm font-semibold text-gray-800 mt-2">
          a) Information you provide
        </h3>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Account details (such as name and email address).</li>
          <li>Profile information and roommate preferences.</li>
          <li>Quiz answers and vibe-related info.</li>
          <li>Listings you create as a host.</li>
          <li>Messages you send through the platform.</li>
        </ul>

        <h3 class="text-sm font-semibold text-gray-800 mt-3">
          b) Information collected automatically
        </h3>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Device and browser type.</li>
          <li>IP address and general location (city/region level).</li>
          <li>Usage data (pages visited, actions taken in the app).</li>
          <li>Cookies and similar technologies used for login and analytics.</li>
        </ul>

        <p class="text-gray-700 mt-2">
          We <span class="font-semibold">do not sell</span> your personal data.
        </p>
      </section>

      <!-- 2. How we use it -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          2. How We Use Your Information
        </h2>
        <p class="text-gray-700">
          We use your information to:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Create and manage your account.</li>
          <li>Match you with compatible roommates and show relevant listings.</li>
          <li>Enable chat and communication between users.</li>
          <li>Improve and personalise the Service.</li>
          <li>Monitor abuse, fraud, or suspicious activity.</li>
          <li>Send important updates about your account or the platform.</li>
        </ul>
      </section>

      <!-- 3. Sharing -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          3. When We Share Your Information
        </h2>
        <p class="text-gray-700">
          We share your data only when necessary, including:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>
            With other users, to show your profile, preferences, and listings as part of matching
            and messaging features.
          </li>
          <li>
            With trusted service providers (for example, hosting, analytics, authentication)
            that help us run the Service.
          </li>
          <li>
            When required by law, or to protect our rights, users, or the public.
          </li>
        </ul>
        <p class="text-gray-700">
          We do not share your personal information with third-party advertisers or data brokers.
        </p>
      </section>

      <!-- 4. Visibility -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          4. What Other Users Can See
        </h2>
        <p class="text-gray-700">
          Depending on how you use Amigo Lease, other users may see:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Your first name and profile photo (if you upload one).</li>
          <li>Your city and general area (e.g. neighbourhood).</li>
          <li>Summaries of your vibe or preference profile.</li>
          <li>Your listings and basic details about the space, if you are a host.</li>
        </ul>
        <p class="text-gray-700">
          We do not publicly show your full email address, password, or private contact details.
        </p>
      </section>

      <!-- 5. Security -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          5. Data Security
        </h2>
        <p class="text-gray-700">
          We use reasonable technical and organisational measures to protect your information.
          However, no online service is completely risk-free. Please keep your password safe
          and contact us if you notice suspicious activity on your account.
        </p>
      </section>

      <!-- 6. Your rights -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          6. Your Choices & Rights
        </h2>
        <p class="text-gray-700">
          Depending on your location, you may have rights over your personal data. In general, you can:
        </p>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Access or update your profile information in the app.</li>
          <li>Delete your account at any time.</li>
          <li>Contact us to request access to, correction of, or deletion of your data.</li>
        </ul>
      </section>

      <!-- 7. Children -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          7. Children’s Privacy
        </h2>
        <p class="text-gray-700">
          Amigo Lease is intended for users who are 18 or older. We do not knowingly collect personal data from
          children under 18. If you believe a minor has provided us with personal information, please contact us
          so we can delete it.
        </p>
      </section>

      <!-- 8. Changes -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          8. Changes to This Policy
        </h2>
        <p class="text-gray-700">
          We may update this Privacy Policy from time to time. If we make significant changes, we’ll take reasonable
          steps to notify you (for example, by email or in-app notice). Your continued use of the Service after the
          changes take effect means you accept the updated Policy.
        </p>
      </section>

      <!-- 9. Contact -->
      <section class="space-y-1 text-sm">
        <h2 class="text-base font-semibold text-gray-900">
          9. Contact Us
        </h2>
        <p class="text-gray-700">
          If you have questions or requests about this Policy or how we handle your data, contact us at:
        </p>
        <p class="text-gray-800 font-medium">
          privacy@amigolease.com
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy - Amigo Lease',
  description: 'Read our Privacy Policy to understand how we collect, use, and protect your data.',
})
const lastUpdated = '{{ insert date }}' // e.g. '19 November 2025'

definePageMeta({
  layout: 'default',
  title: 'Privacy Policy – Amigo Lease'
})
</script>