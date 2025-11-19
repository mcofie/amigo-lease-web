<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Top nav -->
    <header
        class="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-400 text-white shadow-sm"
    >
      <div
          class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4"
      >
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
              class="h-7 w-7 rounded-xl bg-white/10 flex items-center justify-center text-[11px] font-semibold text-white shadow-sm"
          >
            AL
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-sm font-semibold tracking-tight text-white">
              Amigo Lease
            </span>
            <span class="text-[10px] text-orange-100/90">
              Find the friend in your roommate
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav
            class="hidden sm:flex items-center gap-1 text-xs bg-white/10 rounded-full px-1 py-0.5 backdrop-blur-sm border border-white/15"
        >
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative px-3 py-1 rounded-full transition text-[11px]"
              :class="
              isActive(item.to)
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-orange-50/90 hover:bg-white/10 hover:text-white'
            "
          >
            <span>{{ item.label }}</span>

            <!-- Unread badge for Chat -->
            <span
                v-if="item.to === '/chat' && unreadCount > 0"
                class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-black/80 text-[10px] text-white flex items-center justify-center"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Right side: account + mobile toggle -->
        <div class="flex items-center gap-2">
          <!-- Desktop: account -->
          <div class="hidden sm:flex items-center gap-2">
            <button
                v-if="userInitials"
                type="button"
                class="inline-flex items-center gap-2 text-[11px] text-orange-50/95 hover:text-white"
                @click="toggleAccountMenu"
            >
              <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-black/70 text-white text-xs font-semibold shadow-sm border border-white/20"
              >
                {{ userInitials }}
              </span>
              <span class="hidden md:inline">Account</span>
              <span class="text-[10px] text-orange-100/90" v-if="userRoleLabel">
                · {{ userRoleLabel }}
              </span>
            </button>

            <button
                v-else-if="!isAuthPage"
                type="button"
                class="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs border border-white/40 text-white hover:bg-white/10"
                @click="goToAuth"
            >
              Sign in
            </button>
          </div>

          <!-- Mobile menu toggle -->
          <button
              type="button"
              class="sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-white bg-white/10"
              @click="mobileOpen = !mobileOpen"
          >
            <span v-if="!mobileOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>

      <!-- Desktop account dropdown -->
      <div
          v-if="accountOpen && userInitials"
          class="hidden sm:block bg-white/95 backdrop-blur-sm"
      >
        <div
            class="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between text-[11px]"
        >
          <div class="flex items-center gap-2 text-gray-500">
            <span class="font-medium text-gray-800">Signed in</span>
            <span class="text-gray-300">·</span>
            <button
                type="button"
                class="underline decoration-dotted hover:text-gray-900"
                @click="goToProfile"
            >
              View profile
            </button>
            <button
                v-if="canSeeListings"
                type="button"
                class="underline decoration-dotted hover:text-gray-900"
                @click="goToListings"
            >
              My listings
            </button>
          </div>
          <button
              type="button"
              class="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-200 text-[11px] text-gray-700 hover:bg-gray-100"
              @click="logout"
          >
            <span>Log out</span>
            <span>↩</span>
          </button>
        </div>
      </div>

      <!-- Mobile dropdown nav -->
      <div
          v-if="mobileOpen"
          class="sm:hidden bg-white/95 backdrop-blur-sm shadow-sm"
      >
        <div class="max-w-5xl mx-auto px-4 py-3 space-y-2 text-sm">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative block px-2 py-1.5 rounded-lg"
              :class="
              isActive(item.to)
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            "
              @click="handleMobileNavClick"
          >
            <span>{{ item.label }}</span>

            <!-- Unread badge for Chat (mobile) -->
            <span
                v-if="item.to === '/chat' && unreadCount > 0"
                class="absolute top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-orange-500 text-[10px] text-white flex items-center justify-center"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </NuxtLink>

          <!-- Mobile account block -->
          <div class="pt-2 border-t border-gray-100 mt-2 space-y-2">
            <button
                v-if="userInitials"
                type="button"
                class="w-full flex items-center justify-between px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
                @click="goToProfileFromMobile"
            >
              <span class="flex flex-col text-left">
                <span>Account</span>
                <span v-if="userRoleLabel" class="text-[10px] text-gray-400">
                  {{ userRoleLabel }}
                </span>
              </span>
              <span
                  class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 text-white text-[11px] font-semibold"
              >
                {{ userInitials }}
              </span>
            </button>

            <button
                v-if="userInitials"
                type="button"
                class="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-[11px] text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                @click="logoutFromMobile"
            >
              <span>Log out</span>
              <span>↩</span>
            </button>

            <button
                v-else-if="!isAuthPage"
                type="button"
                class="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
                @click="goToAuthFromMobile"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-950 text-gray-300">
      <div
          class="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px]"
      >
        <!-- Left: brand + tagline -->
        <div class="flex items-start gap-2">
          <div
              class="h-7 w-7 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-[10px] font-semibold text-white shadow-sm"
          >
            AL
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-gray-100">
              © {{ year }} Amigo Lease
            </span>
            <span class="text-[10px] text-gray-400">
              Built for roommates who actually vibe — not just share rent.
            </span>
          </div>
        </div>

        <!-- Right: page links -->
        <div
            class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] md:justify-end"
        >
          <NuxtLink to="/" class="hover:text-white"> Home </NuxtLink>
          <NuxtLink to="/onboarding/role" class="hover:text-white">
            Quiz
          </NuxtLink>
          <NuxtLink to="/matches" class="hover:text-white">
            Matches
          </NuxtLink>
          <NuxtLink to="/listings" class="hover:text-white">
            Listings
          </NuxtLink>
          <NuxtLink to="/chat" class="hover:text-white"> Chat </NuxtLink>
          <NuxtLink to="/settings/profile" class="hover:text-white">
            Profile
          </NuxtLink>

          <span class="hidden sm:inline text-gray-600">|</span>

          <span class="text-gray-500">
            Made with Nuxt &amp; Supabase
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute, useNuxtApp } from '#imports'
import type { ProfileRole } from '~/types/amigo'

const router = useRouter()
const route = useRoute()
const { $supabase } = useNuxtApp()

const mobileOpen = ref(false)
const accountOpen = ref(false)
const year = new Date().getFullYear()

interface NavItem {
  label: string
  to: string
  requiresHost?: boolean
}

const baseNavItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Matches', to: '/matches' },
  { label: 'Listings', to: '/listings', requiresHost: true },
  { label: 'Chat', to: '/chat' }
]

const userInitials = ref<string | null>(null)
const userRole = ref<ProfileRole | null>(null)
const unreadCount = ref(0)
const isAuthPage = computed(() => route.path.startsWith('/auth'))

const userRoleLabel = computed(() => {
  if (!userRole.value) return null
  if (userRole.value === 'seeker') return 'Looking for a place'
  if (userRole.value === 'host') return 'Hosting'
  if (userRole.value === 'both') return 'Host & seeker'
  return null
})

const canSeeListings = computed(() => {
  return userRole.value === 'host' || userRole.value === 'both'
})

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

onMounted(async () => {
  const {
    data: { user }
  } = await $supabase.auth.getUser()
  if (!user) {
    userInitials.value = null
    userRole.value = null
    unreadCount.value = 0
    return
  }

  const { data } = await $supabase
      .schema('amigo')
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .maybeSingle()

  const profile = data as {
    full_name?: string | null
    role?: ProfileRole | null
  } | null

  const name = profile?.full_name ?? user.email ?? ''
  if (name) {
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      userInitials.value = parts[0][0]?.toUpperCase() ?? null
    } else {
      userInitials.value = (parts[0][0] + parts[1][0]).toUpperCase()
    }
  }

  userRole.value = profile?.role ?? null

  await loadUnreadCount(user.id)
})

const visibleNavItems = computed(() => {
  const role = userRole.value
  return baseNavItems.filter((item) => {
    if (!item.requiresHost) return true
    return role === 'host' || role === 'both'
  })
})

const loadUnreadCount = async (userId: string) => {
  // 1) find all thread IDs where I'm a participant
  const { data: threads, error: threadsErr } = await $supabase
      .schema('amigo')
      .from('chat_threads')
      .select('id, profile_one_id, profile_two_id')
      .or(`profile_one_id.eq.${userId},profile_two_id.eq.${userId}`)

  if (threadsErr || !threads || threads.length === 0) {
    unreadCount.value = 0
    return
  }

  const threadIds = threads.map((t: any) => t.id)

  // 2) count messages in those threads, not sent by me, with read_at null
  const { count, error: msgErr } = await $supabase
      .schema('amigo')
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .in('thread_id', threadIds)
      .neq('sender_profile_id', userId)
      .is('read_at', null)

  if (msgErr) {
    unreadCount.value = 0
    return
  }

  unreadCount.value = count ?? 0
}

const toggleAccountMenu = () => {
  accountOpen.value = !accountOpen.value
}

const goToProfile = () => {
  accountOpen.value = false
  router.push('/settings/profile')
}

const goToListings = () => {
  accountOpen.value = false
  router.push('/listings')
}

const goToAuth = () => {
  router.push('/auth')
}

// Mobile helpers
const handleMobileNavClick = () => {
  mobileOpen.value = false
  accountOpen.value = false
}

const goToProfileFromMobile = () => {
  mobileOpen.value = false
  accountOpen.value = false
  router.push('/settings/profile')
}

const goToAuthFromMobile = () => {
  mobileOpen.value = false
  router.push('/auth')
}

const logout = async () => {
  await $supabase.auth.signOut()
  userInitials.value = null
  userRole.value = null
  unreadCount.value = 0
  accountOpen.value = false
  mobileOpen.value = false
  router.push('/')
}

const logoutFromMobile = async () => {
  await logout()
}
</script>