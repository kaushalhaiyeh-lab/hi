# 🔍 Policies Exist But Still Failing - Let's Check the Details

The policies are already created, but they're not working. This means the policy **definition** might be wrong.

---

## 🚀 Step 1: Check Policy Details in Supabase

1. Go to **Authentication** → **Policies**
2. Find `contact_submissions` table
3. Click on **"Allow anonymous inserts"** policy
4. Check these details:

**Should be**:
- **Command**: `INSERT`
- **Roles**: `anon` (or `public`)
- **USING expression**: (empty or none)
- **WITH CHECK expression**: `true`

**Screenshot or copy what you see!**

---

## 🔧 Step 2: Fix the Policy

The issue might be that the policy is set to `public` instead of `anon`, or the expression is wrong.

### **Delete and Recreate the Policy**

1. In **Authentication** → **Policies**
2. Find the "Allow anonymous inserts" policy
3. Click the **trash icon** to delete it
4. Click **"New Policy"**
5. Select **"Create a policy from scratch"**
6. Fill in EXACTLY:
   - **Policy name**: `Allow anonymous inserts`
   - **Policy command**: `INSERT`
   - **Target roles**: Select **`anon`** (NOT `public`, NOT `authenticated`)
   - **USING expression**: Leave empty
   - **WITH CHECK expression**: Type `true`
7. Click **"Review"** then **"Save policy"**

---

## 🎯 Step 3: Alternative - Use This Exact SQL

If the UI doesn't work, try this SQL that explicitly targets the `anon` role:

```sql
-- First, drop the existing policy
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;

-- Create new policy with explicit anon role
CREATE POLICY "Allow anonymous inserts"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);
```

---

## 🔍 Step 4: Verify the Policy is Correct

Run this SQL to see the exact policy definition:

```sql
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions' 
  AND policyname = 'Allow anonymous inserts';
```

**You should see**:
- `cmd`: `INSERT`
- `roles`: `{anon}`
- `qual`: `NULL`
- `with_check`: `true`

---

## 🆘 If Still Not Working - Check Table Schema

The table might be in the wrong schema. Run this:

```sql
SELECT schemaname, tablename 
FROM pg_tables 
WHERE tablename = 'contact_submissions';
```

**Should show**: `schemaname: public`

If it shows a different schema, the policies might be on the wrong table!

---

## 📸 What to Share

Please share:
1. What **roles** are selected in the policy (anon, public, authenticated?)
2. What the **WITH CHECK expression** shows
3. Result of the SQL query checking the policy details

This will tell me exactly what's wrong! 🚀
