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
                { rel: 'icon', href: 'data:,' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Asimovian&display=swap' }
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