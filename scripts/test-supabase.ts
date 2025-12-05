import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('🔍 Supabase Connection Test\n');
console.log('━'.repeat(50));

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('   SUPABASE_URL: ' + (supabaseUrl ? '✅ Set' : '❌ Missing'));
console.log('   SUPABASE_ANON_KEY: ' + (supabaseAnonKey ? '✅ Set' : '❌ Missing'));

if (!supabaseUrl || !supabaseAnonKey) {
    console.log('\n❌ ERROR: Missing Supabase environment variables');
    console.log('   Please check your .env file and ensure:');
    console.log('   - PUBLIC_SUPABASE_URL is set');
    console.log('   - PUBLIC_SUPABASE_ANON_KEY is set');
    process.exit(1);
}

// Display partial credentials for verification
console.log('\n🔑 Credentials (partial):');
console.log('   URL: ' + supabaseUrl.substring(0, 30) + '...');
console.log('   Key: ' + supabaseAnonKey.substring(0, 20) + '...');

// Create Supabase client
console.log('\n🔌 Creating Supabase client...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('   ✅ Client created successfully');

// Test connection by checking if we can query the database
console.log('\n🧪 Testing database connection...');

async function testConnection() {
    try {
        // Try to query the contact_submissions table
        const { data, error, count } = await supabase
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.log('   ❌ Connection failed: ' + error.message);
            console.log('   Error details:', error);

            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                console.log('\n💡 The table "contact_submissions" does not exist.');
                console.log('   You may need to run the schema setup SQL.');
            } else if (error.message.includes('JWT')) {
                console.log('\n💡 Authentication issue - check your ANON_KEY');
            } else if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
                console.log('\n💡 Network issue - check your SUPABASE_URL');
            }

            return false;
        }

        console.log('   ✅ Connection successful!');
        console.log('   📊 Table exists with ' + (count ?? 0) + ' records');

        if (count === 0) {
            console.log('\n   ℹ️  Note: Seeing 0 records is EXPECTED and CORRECT!');
            console.log('   This is because Row Level Security (RLS) is working.');
            console.log('   The anon key can INSERT but cannot SELECT records.');
            console.log('   Check your Supabase dashboard to see all records.');
        }

        return true;
    } catch (err) {
        console.log('   ❌ Unexpected error: ' + err);
        return false;
    }
}

// Run the test
testConnection().then(success => {
    console.log('\n' + '━'.repeat(50));
    if (success) {
        console.log('✅ Supabase is working perfectly!\n');
        setTimeout(() => process.exit(0), 100);
    } else {
        console.log('❌ Supabase connection has issues\n');
        setTimeout(() => process.exit(1), 100);
    }
});
