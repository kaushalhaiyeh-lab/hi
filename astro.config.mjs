// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com', // Update this with your actual domain after deployment
    integrations: [react(), tailwind()],
    output: 'server', // Enable server-side rendering for API routes and dynamic content
    adapter: vercel(),
});
