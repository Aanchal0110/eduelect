import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/eduelect/' : '/',
  build: {
    outDir: '../../docs',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/chat': {
        target: 'https://ayush6.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/webhook/15e4d662-3f98-48d0-9f50-68838769ecac/chat'),
        secure: false,
        timeout: 30000,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from:', req.url, 'Status:', proxyRes.statusCode);
          });
        }
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
