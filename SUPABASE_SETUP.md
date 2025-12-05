# Supabase Setup Guide

This guide will help you connect your project to Supabase.

## 📋 Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js 18+ installed

## 🚀 Quick Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Choose a name (e.g., "Antigravity CMS")
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to initialize (~2 minutes)

### Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll find two important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon/Public Key**: A long JWT token starting with `eyJ...`

### Step 3: Update Your Environment Variables

1. Open your `.env` file (create one if it doesn't exist by copying `.env.example`)
2. Update these values with your actual Supabase credentials:

```env
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
SUPABASE_URL=https://azeggawdlkcigqqiwczv.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase/schema.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" to execute the query

This will create:
- A `contact_submissions` table to store contact form data
- Row Level Security policies for data protection
- Some sample data for testing

### Step 5: Test the Connection

Run the test script to verify everything is working:

```bash
npx tsx scripts/test-supabase.ts
```

You should see:
```
✅ Supabase is working perfectly!
```

If you see errors, check:
- Your `.env` file has the correct credentials
- The database schema was successfully applied
- Your Supabase project is active

## 🔧 What's Configured

### Files Created/Modified

1. **`src/lib/supabaseClient.ts`** - Supabase client initialization
2. **`supabase/schema.sql`** - Database schema with contact form table
3. **`scripts/test-supabase.ts`** - Connection test script
4. **`.env.example`** - Environment variable template

### Features Enabled

- ✅ Contact form submissions stored in Supabase
- ✅ Row Level Security (RLS) enabled
- ✅ Anonymous users can submit forms
- ✅ Type-safe database operations

## 📝 Using Supabase in Your Code

### Submit Contact Form

The contact form is already integrated. When users submit the form at `/contact`, their data is automatically saved to Supabase.

```typescript
import { submitContactForm } from '@/lib/supabaseClient';

// Submit a contact form
await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!'
});
```

### Query Submissions (Admin)

To view submissions, you'll need to authenticate. For now, you can view them in the Supabase dashboard:

1. Go to **Table Editor** → **contact_submissions**
2. View all submissions

## 🔒 Security Notes

- The **Anon Key** is safe to use in client-side code
- Row Level Security (RLS) protects your data
- Only anonymous inserts are allowed (no reads/updates/deletes)
- For admin features, you'll need to implement authentication

## 🎯 Next Steps

1. ✅ Set up your Supabase project
2. ✅ Add credentials to `.env`
3. ✅ Run the database schema
4. ✅ Test the connection
5. 🚀 Deploy your site and test the contact form

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check that your `.env` file exists and has the correct variable names
- Variable names should be `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### "Table does not exist"
- Run the SQL schema in the Supabase SQL Editor
- Make sure you're connected to the correct project

### "JWT expired" or "Invalid API key"
- Your anon key might be incorrect
- Copy it again from Settings → API in Supabase dashboard

### Connection test fails
- Verify your Supabase project is active
- Check your internet connection
- Ensure the URL doesn't have trailing slashes

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

Need help? Check the [Supabase Discord](https://discord.supabase.com/) or [GitHub Discussions](https://github.com/supabase/supabase/discussions).
