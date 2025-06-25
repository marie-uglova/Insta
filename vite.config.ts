import { defineConfig } from 'vite'
import path from 'path';
import alias from '@rollup/plugin-alias'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
        alias({
            entries: {
                '@components': path.resolve(__dirname, 'src/components/'),
                '@pages': path.resolve(__dirname, 'src/pages/'),
                '@redux': path.resolve(__dirname, 'src/redux/'),
                '@api': path.resolve(__dirname, 'src/api/'),
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/styles/variables.scss";`
            }
        }
    }
})
