import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use /sreeethnicfinds/ base for GitHub Pages, and / for local dev or Vercel/Netlify
const isSubpathDeploy = !process.env.VERCEL && !process.env.NETLIFY;
const base = process.env.NODE_ENV === 'production' && isSubpathDeploy ? '/sreeethnicfinds/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
