# ⚡ QUICK FIX - Run These 2 SQL Commands Separately

The issue is that the policies aren't being created. Let's do it step-by-step.

---

## 🚀 Copy & Paste These ONE AT A TIME

### **Step 1: Run This First**

Go to Supabase → SQL Editor → New Query

**Paste and run**:
```sql
CREATE POLICY "Allow anonymous inserts" 
ON contact_submissions
FOR INSERT 
TO anon
WITH CHECK (true);
```

Click **"Run"**. Wait for success message.

---

### **Step 2: Run This Second**

In a **new query**, paste and run:
```sql
CREATE POLICY "Allow service role to view all" 
ON contact_submissions
FOR SELECT 
TO service_role
USING (true);
```

Click **"Run"**. Wait for success message.

---

## ✅ Verify It Worked

After running both, check:

```
https://hi-fdah.vercel.app/api/verify-supabase
```

Should show:
```json
{
  "status": "success",
  "testInsertSuccess": true
}
```

---

## 🆘 If You Get an Error

**Error: "policy already exists"**
- Good! The policy is there. Try the other one.

**Error: "permission denied"**
- You might not have admin access. Check your Supabase role.

**Error: "relation does not exist"**
- The table name is wrong. Make sure it's `contact_submissions`

---

**Try these 2 commands separately and let me know what happens!**
