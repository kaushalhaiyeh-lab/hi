import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const GET: APIRoute = async () => {
    try {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            return new Response(JSON.stringify({
                error: 'Missing environment variables',
                supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
                supabaseAnonKey: supabaseAnonKey ? 'Set' : 'Missing',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Try to query the table
        const { data, error, count } = await supabase
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true });

        if (error) {
            return new Response(JSON.stringify({
                status: 'error',
                error: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
                supabaseUrl: supabaseUrl.substring(0, 30) + '...',
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Try to insert a test record
        const { data: insertData, error: insertError } = await supabase
            .from('contact_submissions')
            .insert([{
                name: 'Test User',
                email: 'test@example.com',
                message: 'Test message from verification endpoint',
            }])
            .select();

        if (insertError) {
            return new Response(JSON.stringify({
                status: 'table_exists_but_insert_failed',
                tableRecordCount: count,
                insertError: insertError.message,
                insertErrorCode: insertError.code,
                insertErrorDetails: insertError.details,
                insertErrorHint: insertError.hint,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({
            status: 'success',
            message: 'Supabase connection working perfectly!',
            tableRecordCount: count,
            testInsertSuccess: true,
            insertedRecord: insertData,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            status: 'exception',
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
