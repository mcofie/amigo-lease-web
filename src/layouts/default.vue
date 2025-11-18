<!-- src/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Top nav -->
    <header class="border-b bg-white/80 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
              class="h-7 w-7 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-[11px] font-semibold text-white shadow-sm"
          >
            AL
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-sm font-semibold tracking-tight text-gray-900">
              Amigo Lease
            </span>
            <span class="text-[10px] text-gray-400">
              Find the friend in your roommate
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-1 text-xs bg-gray-100 rounded-full px-1 py-0.5">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative px-3 py-1 rounded-full transition text-[11px]"
              :class="isActive(item.to)
              ? 'bg-gray-900 text-white shadow-sm'
              : 'text-gray-600 hover:bg-white hover:text-gray-900'"
          >
            <span>{{ item.label }}</span>

            <!-- Unread badge for Chat -->
            <span
                v-if="item.to === '/chat' && unreadCount > 0"
                class="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-orange-500 text-[10px] text-white flex items-center justify-center"
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
                class="inline-flex items-center gap-2 text-[11px] text-gray-700 hover:text-gray-900"
                @click="toggleAccountMenu"
            >
              <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold shadow-sm"
              >
                {{ userInitials }}
              </span>
              <span class="hidden md:inline">
                Account
              </span>
              <span class="text-[10px] text-gray-400" v-if="userRoleLabel">
                · {{ userRoleLabel }}
              </span>
            </button>

            <button
                v-else-if="!isAuthPage"
                type="button"
                class="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs border border-gray-300 text-gray-700 hover:bg-gray-100"
                @click="goToAuth"
            >
              Sign in
            </button>
          </div>

          <!-- Mobile menu toggle -->
          <button
              type="button"
              class="sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-600 bg-white"
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
          class="hidden sm:block border-t border-gray-100 bg-white/95 backdrop-blur-sm"
      >
        <div class="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between text-[11px]">
          <div class="flex items-center gap-2 text-gray-500">
            <span class="font-medium text-gray-700">Signed in</span>
            <span class="text-gray-400">·</span>
            <button
                type="button"
                class="underline decoration-dotted hover:text-gray-800"
                @click="goToProfile"
            >
              View profile
            </button>
            <button
                v-if="canSeeListings"
                type="button"
                class="underline decoration-dotted hover:text-gray-800"
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
          class="sm:hidden border-t bg-white/95 backdrop-blur-sm"
      >
        <div class="max-w-5xl mx-auto px-4 py-3 space-y-2 text-sm">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative block px-2 py-1.5 rounded-lg"
              :class="isActive(item.to)
              ? 'bg-gray-900 text-white'
              : 'text-gray-700 hover:bg-gray-100'"
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
      <slot/>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-white/90 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between text-[11px] text-gray-400">
        <div class="flex items-center gap-2">
          <span>© {{ year }} Amigo Lease</span>
          <span class="hidden sm:inline">•</span>
          <span class="hidden sm:inline">Made for roommates who actually vibe</span>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/matches" class="hover:text-gray-700">
            Matches
          </NuxtLink>
          <NuxtLink to="/chat" class="hover:text-gray-700">
            Chat
          </NuxtLink>
          <span class="hidden sm:inline text-gray-300">|</span>
          <span class="hidden sm:inline text-gray-400">
            Built with Nuxt & Supabase
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
  const { data: { user } } = await $supabase.auth.getUser()
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

  const profile = data as { full_name?: string | null; role?: ProfileRole | null } | null

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