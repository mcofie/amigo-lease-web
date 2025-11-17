import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#111827', // near-black
                    accent: '#4F46E5'   // indigo-600
                }
            }
        }
    },
    plugins: []
}