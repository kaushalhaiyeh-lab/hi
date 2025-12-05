# 🔍 Debugging Contact Form 500 Error

You're getting a 500 Internal Server Error. Let's diagnose and fix it!

---

## 🚀 Quick Diagnosis

I've added a diagnostic endpoint to check your environment variables.

### Step 1: Deploy the Diagnostic Tool

```bash
git add .
git commit -m "Add diagnostic endpoint for debugging"
git push
```

Wait ~1 minute for Vercel to auto-deploy.

### Step 2: Check the Diagnostics

Visit this URL in your browser:
```
https://hi-fdah.vercel.app/api/diagnostics
```

This will show you which environment variables are set and which are missing.

### Step 3: Check Vercel Function Logs

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Click **Logs** tab (or **Functions** → `/api/contact`)
4. Look for the error message

The logs will show the exact error that's causing the 500.

---

## 🔧 Common Causes of 500 Error

### Issue 1: Environment Variables Not Set Correctly

**Symptoms**: Diagnostics show variables as "Missing"

**Fix**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Make sure you added:
   - `SUPABASE_URL` (not `PUBLIC_SUPABASE_URL`)
   - `SUPABASE_ANON_KEY` (not `PUBLIC_SUPABASE_ANON_KEY`)
3. Check all 3 environments (Production, Preview, Development)
4. Redeploy

### Issue 2: Supabase Table Doesn't Exist

**Symptoms**: Error message says "relation does not exist" or "table not found"

**Fix**:
1. Go to Supabase Dashboard → SQL Editor
2. Run the schema from `supabase/schema.sql`
3. Verify table exists in Table Editor

### Issue 3: Wrong Supabase URL or Key

**Symptoms**: Error about authentication or invalid API key

**Fix**:
1. Go to Supabase Dashboard → Settings → API
2. Copy the **Project URL** (should start with `https://`)
3. Copy the **anon public** key (long JWT token)
4. Update in Vercel environment variables
5. Redeploy

### Issue 4: CORS or Network Issue

**Symptoms**: Error about fetch failed or network error

**Fix**:
1. Check your Supabase project is active
2. Verify the URL is correct (no typos)
3. Make sure you're using the anon key, not the service role key

---

## 📋 Checklist

- [ ] Deployed the diagnostic endpoint
- [ ] Visited `/api/diagnostics` to check env vars
- [ ] Checked Vercel function logs for error details
- [ ] Verified all environment variables are set correctly
- [ ] Confirmed Supabase table exists
- [ ] Redeployed after fixing issues

---

## 🔍 What to Look For in Logs

In Vercel function logs, you'll see one of these errors:

**"Missing Supabase environment variables"**
→ Environment variables not set in Vercel

**"relation 'contact_submissions' does not exist"**
→ Need to run SQL schema in Supabase

**"Invalid API key"**
→ Wrong Supabase anon key

**"Failed to fetch"**
→ Wrong Supabase URL or network issue

---

## ✅ After Fixing

Once you fix the issue:

1. The diagnostics endpoint should show all variables as "✅ Set"
2. The contact form should work
3. Submissions should appear in Supabase

---

## 🆘 Still Stuck?

**Share with me**:
1. What does `/api/diagnostics` show?
2. What error appears in Vercel function logs?
3. Screenshot of your Vercel environment variables page

I'll help you fix it! 🚀
