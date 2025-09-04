import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/images': {
                target: 'https://image.tmdb.org/t/p',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/images/, ''),
            },
        },
    }

})
