import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage } from 'http';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  build: {
    outDir: 'docs',
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
      '/api/courses': {
        target: 'https://ansheeka.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/courses/, '/webhook/15e4d662-3f98-48d0-9f50-68838769ecac/chat'),
        secure: false,
        timeout: 30000,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to courses endpoint:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from courses endpoint:', req.url, 'Status:', proxyRes.statusCode);
          });
        }
      },
      '/api/preferences': {
        target: 'https://ansheeka.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/preferences/, '/webhook/250eb06b-049f-4d0b-a299-1af238292432/chat'),
        secure: false,
        timeout: 60000,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req: ExtendedRequest, _res) => {
            console.log('Sending Request to preferences endpoint:', req.url);
            if (req.body) {
              console.log('Request body:', req.body);
              const bodyData = JSON.stringify(req.body);
              proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
              proxyReq.write(bodyData);
            }
          });
          proxy.on('proxyRes', (proxyRes: IncomingMessage, req, _res) => {
            console.log('Received Response from preferences endpoint:', req.url, 'Status:', proxyRes.statusCode);
            let body = '';
            proxyRes.on('data', function(chunk) {
              body += chunk;
            });
            proxyRes.on('end', function() {
              console.log('Response body:', body);
            });
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
