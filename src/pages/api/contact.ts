import type { APIRoute } from 'astro';
import { submitContactForm } from '@/lib/supabaseClient';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Missing required fields',
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Invalid email address',
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        // Submit to Supabase
        await submitContactForm({
            name: data.name,
            email: data.email,
            message: data.message,
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.',
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            supabaseUrl: process.env.SUPABASE_URL ? 'Set' : 'Missing',
            supabaseKey: process.env.SUPABASE_ANON_KEY ? 'Set' : 'Missing',
        });

        return new Response(
            JSON.stringify({
                success: false,
                error: 'Failed to submit form. Please try again later.',
                debug: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
};
