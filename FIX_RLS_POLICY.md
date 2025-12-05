# ✅ SOLUTION: Fix RLS Policy in Supabase

## 🎯 The Problem

Your verification shows:
```json
"insertError": "new row violates row-level security policy"
```

**Translation**: The `contact_submissions` table exists, but Row Level Security is blocking anonymous users from inserting data.

---

## 🚀 Quick Fix (2 minutes)

### Step 1: Go to Supabase SQL Editor

1. Open https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New query**

### Step 2: Run This SQL

Copy and paste this SQL code:

```sql
-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow service role to view all" ON contact_submissions;

-- Create policy to allow anonymous inserts (for the contact form)
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to view all (for admin dashboard)
CREATE POLICY "Allow service role to view all" ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);
```

### Step 3: Click "Run"

You should see: "Success. No rows returned"

### Step 4: Test the Contact Form

1. Go to https://hi-fdah.vercel.app/contact
2. Fill out the form
3. Submit
4. You should see: **"Thank you for your message!"** ✅

---

## 🔍 What This Does

The SQL above creates two security policies:

1. **Allow anonymous inserts**: Lets anyone submit the contact form
2. **Allow service role to view**: Only you (as admin) can read submissions

This is the correct security setup for a contact form!

---

## ✅ Verify It Works

After running the SQL, test the verification endpoint again:

```
https://hi-fdah.vercel.app/api/verify-supabase
```

You should now see:
```json
{
  "status": "success",
  "message": "Supabase connection working perfectly!",
  "testInsertSuccess": true
}
```

---

## 📊 View Submissions

After the form works, view submissions in:
- Supabase Dashboard → **Table Editor** → **contact_submissions**

---

**That's it!** Run the SQL above and your contact form will work perfectly! 🎉
