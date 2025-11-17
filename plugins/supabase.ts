// src/plugins/supabase.ts
import {defineNuxtPlugin} from '#app'
import {createClient, SupabaseClient} from '@supabase/supabase-js'

/**
 * TODO later:
 * Replace `Database` with generated types from:
 * supabase gen types typescript ...
 */
export interface Database extends Record<string, never> {
}

declare module '#app' {
    interface NuxtApp {
        $supabase: SupabaseClient<Database>
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $supabase: SupabaseClient<Database>
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const supabase = createClient<Database>(
        config.public.supabaseUrl,
        config.public.supabaseAnonKey,
        {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        }
    )

    return {
        provide: {
            supabase
        }
    }
})