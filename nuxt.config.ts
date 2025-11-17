// nuxt.config.ts
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/ui'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    app: {
        head: {
            title: 'AmigoLease — Find Your Perfect Roommate or Room',
            meta: [
                {
                    name: 'description',
                    content: 'Match with compatible roommates and discover rooms to rent near you. Safer profiles, smart filters, and verified listings.'
                },
                {property: 'og:title', content: 'AmigoLease'},
                {property: 'og:description', content: 'Roommate and room matching made simple.'},
                {property: 'og:image', content: '/og-image.jpg'},
                {property: 'og:type', content: 'website'},
                {name: 'twitter:card', content: 'summary_large_image'}
            ],
            link: [{rel: 'icon', href: '/favicon.ico'}]
        }
    },
    nitro: {
        prerender: {
            routes: ['/', '/privacy']
        }
    },
    runtimeConfig: {
        public: {
            appName: 'AmigoLease',
            contactEmail: 'hello@amigolease.com',
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY
        }
    },
    // tailwindcss: {
    //     viewer: false
    // },
    typescript: {
        strict: true
    }
})