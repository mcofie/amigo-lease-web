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
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY
        }
    }
})