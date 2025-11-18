// tailwind.config.ts
import type { Config } from 'tailwindcss'
import ui from '@nuxt/ui/tailwind.config'

export default {
    presets: [ui],
    content: [
        './src/app.{js,ts,vue}',
        './src/components/**/*.{vue,js,ts}',
        './src/layouts/**/*.{vue,js,ts}',
        './src/pages/**/*.{vue,js,ts}',
        './src/plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {}
    },
    plugins: []
} satisfies Config