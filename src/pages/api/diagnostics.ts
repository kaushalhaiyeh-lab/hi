import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: {
            SUPABASE_URL: process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing',
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
            PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
            PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
            PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID ? '✅ Set' : '❌ Missing',
            PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET ? '✅ Set' : '❌ Missing',
            SANITY_API_TOKEN: process.env.SANITY_API_TOKEN ? '✅ Set' : '❌ Missing',
            NODE_ENV: process.env.NODE_ENV || 'not set',
        },
        supabaseUrlPreview: process.env.SUPABASE_URL ? process.env.SUPABASE_URL.substring(0, 30) + '...' : 'Not set',
    };

    return new Response(JSON.stringify(diagnostics, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
