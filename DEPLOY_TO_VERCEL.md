# 🚀 Deploy to Vercel - Complete Guide

Your project is now **ready to deploy** to Vercel! Follow this guide for a smooth deployment.

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure you have:

- [x] ✅ Supabase database set up with the schema
- [x] ✅ Sanity CMS project created
- [x] ✅ Environment variables ready
- [x] ✅ Build tested locally (just completed!)
- [x] ✅ Git repository initialized

---

## 🚀 Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

This is the easiest method for first-time deployment.

#### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for deployment"
   ```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "antigravity-cms")
   - Don't initialize with README (you already have files)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Import to Vercel

1. **Go to Vercel**: https://vercel.com/new
2. **Sign in** with your GitHub account
3. **Import your repository**:
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

#### Step 3: Configure Project

Vercel will auto-detect Astro. Just verify:
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `.vercel/output`
- **Install Command**: `npm install`

#### Step 4: Add Environment Variables

Click "Environment Variables" and add these:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

**Important:** Get these values from:
- **Supabase**: Dashboard → Settings → API
- **Sanity**: Dashboard → API → Tokens

#### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

---

### Method 2: Deploy via Vercel CLI

For developers who prefer the command line.

#### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

#### Step 2: Login

```bash
vercel login
```

#### Step 3: Deploy

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name?** antigravity-cms (or your choice)
- **Directory?** ./
- **Override settings?** No

#### Step 4: Add Environment Variables

```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add PUBLIC_SANITY_PROJECT_ID
vercel env add PUBLIC_SANITY_DATASET
vercel env add SANITY_API_TOKEN
```

For each command, paste the value when prompted.

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### Update Your Site URL

1. After deployment, you'll get a URL like `https://your-project.vercel.app`
2. Update `astro.config.mjs`:
   ```javascript
   site: 'https://your-project.vercel.app',
   ```
3. Commit and push the change (Vercel will auto-deploy)

### Configure Sanity CORS

1. Go to your Sanity dashboard: https://sanity.io/manage
2. Select your project
3. Go to **Settings** → **API** → **CORS Origins**
4. Add your Vercel URL: `https://your-project.vercel.app`
5. Allow credentials: ✅ Yes

### Test Your Deployment

1. **Visit your site**: `https://your-project.vercel.app`
2. **Test the contact form**: Go to `/contact` and submit a test message
3. **Check Supabase**: Verify the submission appears in your database
4. **Check all pages**: Home, About, Services, Blog, Contact

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

1. Make changes to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel automatically builds and deploys! 🎉

---

## 🌐 Custom Domain (Optional)

### Add a Custom Domain

1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `yourdomain.com`)
4. Follow Vercel's instructions to update your DNS

### Update Configuration

After adding a custom domain:

1. Update `astro.config.mjs`:
   ```javascript
   site: 'https://yourdomain.com',
   ```

2. Update Sanity CORS:
   - Add `https://yourdomain.com` to allowed origins

---

## 📊 Monitoring Your Deployment

### View Logs

1. Go to your Vercel dashboard
2. Select your project
3. Click on a deployment
4. View **Build Logs** and **Function Logs**

### Analytics

Vercel provides free analytics:
- Go to your project → **Analytics**
- See visitor stats, performance metrics, etc.

---

## 🆘 Troubleshooting

### Build Fails

**Check environment variables:**
- Make sure all required env vars are set in Vercel
- They should match your local `.env` file

**Check build logs:**
- Go to Vercel dashboard → Deployments → Click on failed deployment
- Read the error message in the build logs

### Contact Form Not Working

**Check Supabase connection:**
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly
- Check Supabase dashboard for errors

**Check function logs:**
- Go to Vercel dashboard → Functions
- Look for errors in the `/api/contact` function

### Sanity Content Not Loading

**Check CORS settings:**
- Make sure your Vercel URL is added to Sanity CORS origins

**Check environment variables:**
- Verify `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` are correct

### "Module not found" Errors

**Clear build cache:**
```bash
vercel --force
```

---

## 🎯 Environment Variables Reference

Here's a complete list of all environment variables you need:

| Variable | Required | Where to Get It | Example |
|----------|----------|-----------------|---------|
| `SUPABASE_URL` | ✅ Yes | Supabase → Settings → API | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | ✅ Yes | Supabase → Settings → API | `eyJhbGci...` |
| `PUBLIC_SANITY_PROJECT_ID` | ✅ Yes | Sanity → Settings → Project Details | `abc123xyz` |
| `PUBLIC_SANITY_DATASET` | ✅ Yes | Usually `production` | `production` |
| `SANITY_API_TOKEN` | ✅ Yes | Sanity → Settings → API → Tokens | `sk...` |

---

## 🚀 Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Repository imported to Vercel
- [ ] All environment variables added
- [ ] First deployment successful
- [ ] Site URL updated in `astro.config.mjs`
- [ ] Sanity CORS configured
- [ ] Contact form tested
- [ ] All pages working

---

## 📚 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Astro on Vercel**: https://docs.astro.build/en/guides/deploy/vercel/
- **Your Deployments**: https://vercel.com/dashboard

---

**Congratulations!** 🎉 Your site is now live on Vercel!

Your deployment URL: `https://your-project.vercel.app`
