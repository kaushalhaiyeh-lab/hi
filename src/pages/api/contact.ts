import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Missing Supabase credentials',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create a fresh client for this request
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Try to insert
        const { data: result, error } = await supabase
            .from('contact_submissions')
            .insert([{
                name: data.name,
                email: data.email,
                message: data.message,
            }])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            return new Response(JSON.stringify({
                success: false,
                error: 'Failed to submit form. Please try again later.',
                debug: {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                }
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.',
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Failed to submit form. Please try again later.',
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
