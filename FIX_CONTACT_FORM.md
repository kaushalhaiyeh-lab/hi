# 🔧 Fix Contact Form - Add Environment Variables to Vercel

Your site is deployed but the contact form needs environment variables to work!

## ⚡ Quick Fix (2 minutes)

### Step 1: Go to Your Vercel Project

1. Go to https://vercel.com/dashboard
2. Click on your project (the one you just deployed)
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### Step 2: Add These 5 Variables

Click "Add New" for each variable:

#### Variable 1: SUPABASE_URL
- **Key**: `SUPABASE_URL`
- **Value**: Copy from your `.env` file (starts with `https://`)
- **Environment**: Production, Preview, Development (check all 3)

#### Variable 2: SUPABASE_ANON_KEY
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: Copy from your `.env` file (long JWT token starting with `eyJ`)
- **Environment**: Production, Preview, Development (check all 3)

#### Variable 3: PUBLIC_SANITY_PROJECT_ID
- **Key**: `PUBLIC_SANITY_PROJECT_ID`
- **Value**: Copy from your `.env` file
- **Environment**: Production, Preview, Development (check all 3)

#### Variable 4: PUBLIC_SANITY_DATASET
- **Key**: `PUBLIC_SANITY_DATASET`
- **Value**: `production`
- **Environment**: Production, Preview, Development (check all 3)

#### Variable 5: SANITY_API_TOKEN
- **Key**: `SANITY_API_TOKEN`
- **Value**: Copy from your `.env` file (starts with `sk`)
- **Environment**: Production, Preview, Development (check all 3)

### Step 3: Redeploy

After adding all variables:

1. Go to **Deployments** tab
2. Click the **three dots** (•••) on the latest deployment
3. Click **Redeploy**
4. Wait for the build to complete (~1-2 minutes)

### Step 4: Test Again

1. Visit your site
2. Go to the contact page
3. Submit a test message
4. It should work now! ✅

---

## 📋 Environment Variables Checklist

Make sure you added all 5:

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `PUBLIC_SANITY_PROJECT_ID`
- [ ] `PUBLIC_SANITY_DATASET`
- [ ] `SANITY_API_TOKEN`

---

## 🔍 How to Get Your Values

### From Your .env File

Open your `.env` file and copy the values:

```env
SUPABASE_URL=https://yfzrstnmqgyaturjinum.supabase.co
SUPABASE_ANON_KEY=sb_publishable_fKqja...
PUBLIC_SANITY_PROJECT_ID=n0affj5j
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skI5jNYpbYW69w00...
```

### Or Get Fresh Values

**Supabase**:
- Go to https://supabase.com/dashboard
- Select your project
- Settings → API
- Copy "Project URL" and "anon public" key

**Sanity**:
- Go to https://sanity.io/manage
- Select your project
- Settings → API
- Copy Project ID and create/copy API token

---

## 🆘 Still Not Working?

### Check Vercel Function Logs

1. Go to your Vercel project dashboard
2. Click **Functions** tab
3. Look for `/api/contact` function
4. Click to see error logs

### Common Issues

**"Missing Supabase environment variables"**
- Make sure you added `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Check for typos in variable names
- Make sure you selected all 3 environments (Production, Preview, Development)

**"Failed to fetch" or CORS error**
- Check your Supabase URL is correct
- Verify the anon key is the full JWT token

**"Table does not exist"**
- Make sure you ran the SQL schema in Supabase
- Check the table name is `contact_submissions`

---

## ✅ After Adding Variables

Your contact form will:
- ✅ Accept submissions
- ✅ Save to Supabase database
- ✅ Show success message
- ✅ Clear the form

You can view submissions in:
- Supabase Dashboard → Table Editor → contact_submissions

---

**Need help?** Let me know which step you're stuck on!
