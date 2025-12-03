// nuxt.config.ts
export default defineNuxtConfig({
    srcDir: 'src/',
    typescript: {
        strict: true,
        typeCheck: true
    },
    modules: ['@nuxt/ui'],
    css: ['~/assets/css/main.css'],   // ✅ IMPORTANT

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
            posthogPublicKey: 'phc_is230XlvYV94NtCaEofDBRdKjMypkmAi1xi1Cu7gcQ',
            posthogHost: 'https://us.i.posthog.com',
            posthogDefaults: '2025-11-30'
        }
    },

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' }
            ]
        }
    },

    vite: {
        server: {
            fs: {
                allow: ['..']
            }
        }
    }
})