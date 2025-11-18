<!-- src/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Top nav -->
    <header class="border-b bg-white/80 backdrop-blur-sm">
      <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-sm font-semibold tracking-tight">
            Amigo Lease
          </span>
          <span class="text-[10px] px-1.5 py-0.5 rounded-full border border-gray-200 text-gray-500">
            beta
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-4 text-xs">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative px-2 py-1 rounded-full transition"
              :class="isActive(item.to)
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'"
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

        <!-- Right side -->
        <div class="flex items-center gap-2">
          <!-- Desktop: profile / auth -->
          <button
              v-if="userInitials"
              type="button"
              class="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-semibold"
              @click="goToProfile"
          >
            {{ userInitials }}
          </button>
          <button
              v-else-if="!isAuthPage"
              type="button"
              class="hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs border border-gray-300 text-gray-700 hover:bg-gray-100"
              @click="goToAuth"
          >
            Sign in
          </button>

          <!-- Mobile menu toggle -->
          <button
              type="button"
              class="sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-600"
              @click="mobileOpen = !mobileOpen"
          >
            ☰
          </button>
        </div>
      </div>

      <!-- Mobile dropdown nav -->
      <div
          v-if="mobileOpen"
          class="sm:hidden border-t bg-white"
      >
        <div class="max-w-5xl mx-auto px-4 py-3 space-y-2 text-sm">
          <NuxtLink
              v-for="item in visibleNavItems"
              :key="item.to"
              :to="item.to"
              class="relative block px-2 py-1 rounded-lg"
              :class="isActive(item.to)
              ? 'bg-gray-900 text-white'
              : 'text-gray-700 hover:bg-gray-100'"
              @click="mobileOpen = false"
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

          <button
              v-if="userInitials"
              type="button"
              class="mt-2 w-full flex items-center justify-between px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
              @click="goToProfile"
          >
            <span>Account</span>
            <span
                class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-[11px] font-semibold">
              {{ userInitials }}
            </span>
          </button>
          <button
              v-else-if="!isAuthPage"
              type="button"
              class="mt-2 w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
              @click="goToAuth"
          >
            Sign in
          </button>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot/>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-white">
      <div class="max-w-5xl mx-auto px-4 h-10 flex items-center justify-between text-[11px] text-gray-400">
        <span>© {{ year }} Amigo Lease</span>
        <span>Built with Nuxt & Supabase</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {useRouter, useRoute, useNuxtApp} from '#imports'
import type {ProfileRole} from '~/types/amigo'

const router = useRouter()
const route = useRoute()
const {$supabase} = useNuxtApp()

const mobileOpen = ref(false)
const year = new Date().getFullYear()

const baseNavItems = [
  {label: 'Home', to: '/' as const},
  {label: 'Matches', to: '/matches' as const},
  {label: 'Listings', to: '/listings' as const, requiresHost: true},
  {label: 'Chat', to: '/chat' as const}
] as const

const userInitials = ref<string | null>(null)
const userRole = ref<ProfileRole | null>(null)
const unreadCount = ref(0)
const isAuthPage = computed(() => route.path.startsWith('/auth'))

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

onMounted(async () => {
  const {data: {user}} = await $supabase.auth.getUser()
  if (!user) {
    userInitials.value = null
    userRole.value = null
    unreadCount.value = 0
    return
  }

  const {data} = await $supabase
      .schema('amigo')
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .maybeSingle()

  const profile = data as { full_name?: string | null; role?: ProfileRole | null } | null

  const name = profile?.full_name ?? user.email ?? ''
  if (name) {
    const parts = name.trim().split(' ')
    if (parts.length === 1) userInitials.value = parts[0][0]?.toUpperCase() ?? null
    else userInitials.value = (parts[0][0] + parts[1][0]).toUpperCase()
  }

  userRole.value = profile?.role ?? null

  await loadUnreadCount(user.id)
})

const visibleNavItems = computed(() => {
  const role = userRole.value
  return baseNavItems.filter((item) => {
    if (!('requiresHost' in item) || !item.requiresHost) return true
    return role === 'host' || role === 'both'
  })
})

const loadUnreadCount = async (userId: string) => {
  // 1) find all thread IDs where I'm a participant
  const {data: threads, error: threadsErr} = await $supabase
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
  const {data: msgs, error: msgErr} = await $supabase
      .schema('amigo')
      .from('messages')
      .select('id', {count: 'exact', head: true})
      .in('thread_id', threadIds)
      .neq('sender_profile_id', userId)
      .is('read_at', null)

  if (msgErr) {
    unreadCount.value = 0
    return
  }

  // Supabase returns count on the response meta; in Nuxt plugin it’s usually at `count`
  // but since we used head: true, data is null; the plugin still exposes `count` on meta.
  // If your client doesn’t expose it, fallback to 0.
  // @ts-ignore – meta typing depends on Supabase client version
  unreadCount.value = (msgs as any)?.length ?? 0
}

const goToProfile = () => {
  mobileOpen.value = false
  router.push('/settings/profile')
}

const goToAuth = () => {
  mobileOpen.value = false
  router.push('/auth')
}
</script>