import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({mode}:{mode:string}) => {
    process.env = loadEnv(mode, process.cwd());

    return defineConfig({
        base: "/frontend",
        server: {
            host: true,
            port: 3000,
            proxy: {
                "/api": {
                    target: "http://localhost:8000",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                }
            },
        },
        plugins: [
            react(),
            tsconfigPaths()
        ]
    })
}