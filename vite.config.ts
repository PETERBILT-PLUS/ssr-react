import { defineConfig } from 'vite'; // Import defineConfig from Vite
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  plugins: [vercel()],
});