import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for contact form submission
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
}

// Helper function to submit contact form
export async function submitContactForm(data: ContactSubmission) {
    const { data: result, error } = await supabase
        .from('contact_submissions')
        .insert([
            {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        ])
        .select();

    if (error) {
        throw error;
    }

    return result;
}
