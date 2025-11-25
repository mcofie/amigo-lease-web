<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
    <!-- Top nav -->
    <header
        class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
              class="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform"
          >
            AL
          </div>
          <div class="flex flex-col leading-none">
            <span class="text-sm font-bold text-slate-900 tracking-tight">
              Amigo Lease
            </span>
            <span class="text-[10px] font-medium text-slate-500 mt-0.5">
              Find the friend in your roommate
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              :class="isActive(item.to) ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'"
          >
            {{ item.label }}

            <!-- Unread badge -->
            <span
                v-if="item.to === '/chat' && unreadCount > 0"
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Right side: account + mobile toggle -->
        <div class="flex items-center gap-3">
          <!-- Desktop: account -->
          <div class="hidden md:flex items-center gap-3">
            <template v-if="userInitials">
              <div class="relative">
                <button
                    type="button"
                    class="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                    @click="toggleAccountMenu"
                >
                  <div class="h-8 w-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {{ userInitials }}
                  </div>
                  <div class="flex flex-col items-start">
                    <span class="text-xs font-semibold text-slate-700 leading-none">Account</span>
                    <span v-if="userRoleLabel" class="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                      {{ userRoleLabel }}
                    </span>
                  </div>
                  <svg class="w-4 h-4 text-slate-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                      v-if="accountOpen"
                      class="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white border border-slate-100 shadow-xl py-2 z-50 origin-top-right"
                  >
                    <div class="px-4 py-2 border-b border-slate-50 mb-1">
                      <p class="text-xs font-medium text-slate-500">Signed in as</p>
                      <p class="text-sm font-bold text-slate-900 truncate">{{ userName || 'User' }}</p>
                    </div>

                    <button @click="goToProfile" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2">
                      <span>👤</span> Profile
                    </button>
                    <button v-if="canSeeListings" @click="goToListings" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2">
                      <span>🏠</span> My Listings
                    </button>

                    <div class="border-t border-slate-50 my-1"></div>

                    <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2">
                      <span>🚪</span> Log out
                    </button>
                  </div>
                </transition>
              </div>
            </template>

            <template v-else-if="!isAuthPage">
              <button
                  type="button"
                  class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
                  @click="goToAuth"
              >
                Log in
              </button>
              <button
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10"
                  @click="goToAuth"
              >
                Sign up
              </button>
            </template>
          </div>

          <!-- Mobile menu toggle -->
          <button
              type="button"
              class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              @click="mobileOpen = !mobileOpen"
          >
            <span v-if="!mobileOpen" class="text-xl">☰</span>
            <span v-else class="text-xl">✕</span>
          </button>
        </div>
      </div>

      <!-- Mobile dropdown -->
      <div
          v-if="mobileOpen"
          class="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md shadow-lg absolute w-full left-0 top-16"
      >
        <div class="px-4 py-4 space-y-1">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="block px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="isActive(item.to) ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
              @click="handleMobileNavClick"
          >
            <div class="flex items-center justify-between">
              <span>{{ item.label }}</span>
              <span
                  v-if="item.to === '/chat' && unreadCount > 0"
                  class="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold"
              >
                {{ unreadCount }} new
              </span>
            </div>
          </NuxtLink>

          <div class="border-t border-slate-100 my-2 pt-2">
            <template v-if="userInitials">
              <button
                  class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  @click="goToProfileFromMobile"
              >
                <div class="h-8 w-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  {{ userInitials }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">My Profile</p>
                  <p class="text-xs text-slate-500">{{ userRoleLabel || 'Manage account' }}</p>
                </div>
              </button>
              <button
                  class="w-full text-left px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                  @click="logoutFromMobile"
              >
                Log out
              </button>
            </template>

            <template v-else-if="!isAuthPage">
              <button
                  class="w-full text-center py-3 rounded-xl bg-slate-900 text-white text-sm font-bold mt-2"
                  @click="goToAuthFromMobile"
              >
                Sign in / Sign up
              </button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 w-full flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-12">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <!-- Left: brand + tagline -->
        <div class="flex items-start gap-4">
          <div class="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-900">
            AL
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm font-bold text-slate-900">© {{ year }} Amigo Lease</span>
            <span class="text-xs text-slate-500 max-w-[280px] leading-relaxed">
              Built for roommates who actually vibe — not just share rent.
            </span>
          </div>
        </div>

        <!-- Right: links -->
        <div class="flex flex-wrap items-center gap-6 md:gap-8 text-sm font-medium text-slate-500">
          <NuxtLink to="/" class="hover:text-slate-900 transition-colors">Home</NuxtLink>
          <NuxtLink to="/matches" class="hover:text-slate-900 transition-colors">Matches</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-slate-900 transition-colors">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-slate-900 transition-colors">Terms</NuxtLink>
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
const userName = ref<string | null>(null)
const userRole = ref<ProfileRole | null>(null)
const unreadCount = ref(0)
const isAuthPage = computed(() => route.path.startsWith('/auth'))

const userRoleLabel = computed(() => {
  if (!userRole.value) return null
  if (userRole.value === 'seeker') return 'Seeker'
  if (userRole.value === 'host') return 'Host'
  if (userRole.value === 'both') return 'Host & Seeker'
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
    userName.value = null
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
  userName.value = name

  if (name) {
    const trimmed = name.trim()
    if (!trimmed) {
      userInitials.value = null
    } else {
      const parts = trimmed.split(/\s+/).filter(Boolean)
      const first = parts[0]?.[0]
      const second = parts[1]?.[0]
      if (first && second) {
        userInitials.value = (first + second).toUpperCase()
      } else if (first) {
        userInitials.value = first.toUpperCase()
      } else {
        userInitials.value = null
      }
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
  const { data: threads, error: threadsErr } = await $supabase
      .schema('amigo')
      .from('chat_threads')
      .select('id')
      .or(`profile_one_id.eq.${userId},profile_two_id.eq.${userId}`)

  if (threadsErr || !threads || threads.length === 0) {
    unreadCount.value = 0
    return
  }

  const threadIds = threads.map((t: any) => t.id)

  const { count, error: msgErr } = await $supabase
      .schema('amigo')
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .in('thread_id', threadIds)
      .neq('sender_profile_id', userId)
      .is('read_at', null)

  if (!msgErr) {
    unreadCount.value = count ?? 0
  }
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
  userName.value = null
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