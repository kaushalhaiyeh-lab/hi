# ⚡ Quick Deploy to Vercel

**Your project is ready to deploy!** ✅ Build tested successfully.

---

## 🚀 Fastest Way to Deploy (5 Minutes)

### Step 1: Push to GitHub (2 min)

```bash
git init
git add .
git commit -m "Ready for deployment"
```

Create a repo at https://github.com/new, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel (2 min)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel auto-detects Astro ✅
4. Click **"Deploy"**

### Step 3: Add Environment Variables (1 min)

In Vercel dashboard, add these environment variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

**Done!** 🎉 Your site is live at `https://your-project.vercel.app`

---

## 📋 Environment Variables Checklist

Copy these from your `.env` file to Vercel:

- [ ] `SUPABASE_URL` - From Supabase Dashboard → Settings → API
- [ ] `SUPABASE_ANON_KEY` - From Supabase Dashboard → Settings → API
- [ ] `PUBLIC_SANITY_PROJECT_ID` - From Sanity Dashboard
- [ ] `PUBLIC_SANITY_DATASET` - Usually `production`
- [ ] `SANITY_API_TOKEN` - From Sanity Dashboard → API → Tokens

---

## ✅ Post-Deployment

After deployment:

1. **Update Sanity CORS**:
   - Go to Sanity Dashboard → Settings → API → CORS
   - Add your Vercel URL: `https://your-project.vercel.app`

2. **Test your site**:
   - Visit all pages
   - Submit a test contact form
   - Check Supabase for the submission

3. **Update site URL** in `astro.config.mjs`:
   ```javascript
   site: 'https://your-project.vercel.app',
   ```

---

## 🔄 Auto-Deploy on Push

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel builds and deploys automatically! 🚀

---

## 📚 Need More Help?

See the complete guide: **`DEPLOY_TO_VERCEL.md`**

---

**That's it!** Your site is production-ready. 🎉
