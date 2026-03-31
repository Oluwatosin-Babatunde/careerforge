# 🚀 CareerForge - Gemini API Deployment Guide

**Use Google Gemini instead of Anthropic Claude API**

This version uses **Gemini 1.5 Flash** (free tier available) instead of Claude.

---

## 📋 **Prerequisites**

- GitHub account
- Netlify account (free)
- Google AI Studio account (free) - https://aistudio.google.com/

---

## **STEP 1: Get Your Gemini API Key** ⏱️ 2 minutes

1. Go to: **[Google AI Studio](https://aistudio.google.com/)**

2. **Sign in** with your Google account

3. **Click "Get API Key"** (top right)

4. **Click "Create API Key"**

5. **Copy the key** - it looks like: `AIzaSy...`
   - ⚠️ Save it somewhere safe
   - This is your **GEMINI_API_KEY**

---

## **STEP 2: Upload Files to GitHub**

1. Go to your **careerforge** repo: https://github.com/Oluwatosin-Babatunde/careerforge

2. **Replace the function file:**
   - Navigate to: `netlify/functions/`
   - Delete `claude-proxy.js` (if it exists)
   - Upload `gemini-proxy.js` (from this package)

3. **Update `index.html`:**
   - Find this line:
     ```javascript
     const response = await fetch("/.netlify/functions/claude-proxy", {
     ```
   - Replace with:
     ```javascript
     const response = await fetch("/.netlify/functions/gemini-proxy", {
     ```
   - Save and commit

4. **Your folder structure should be:**
   ```
   careerforge/
   ├── index.html (updated to use gemini-proxy)
   ├── netlify.toml
   └── netlify/
       └── functions/
           └── gemini-proxy.js
   ```

---

## **STEP 3: Add Gemini API Key to Netlify**

1. **In Netlify**, go to your site

2. **Click "Site configuration"** → **"Environment variables"**

3. **Add a new variable:**
   ```
   Key:   GEMINI_API_KEY
   Value: AIzaSy... (your key from Step 1)
   ```

4. **Click "Save"**

5. **Trigger redeploy:**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

---

## **STEP 4: Test Your Site**

1. Go to: https://thecareerforge.netlify.app/

2. Paste a job description and resume

3. Click "Analyze & Optimize"

4. **Should work now!** ✨

---

## **✅ Why Gemini?**

### **Advantages:**
- ✅ **FREE tier** available (60 requests/minute)
- ✅ **No credit card required** for API key
- ✅ **Fast responses** (Gemini 1.5 Flash is optimized for speed)
- ✅ **Good quality** for resume optimization
- ✅ **Easy setup** - single API key, no complicated auth

### **Gemini API Limits (Free Tier):**
- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day

**Perfect for personal use!**

---

## **💰 Cost Comparison**

| Provider | Free Tier | Paid |
|----------|-----------|------|
| **Gemini 1.5 Flash** | ✅ 1,500 requests/day FREE | $0.075 per 1M input tokens |
| **Claude Sonnet 4** | ❌ No free tier | $3 per 1M input tokens |

**For CareerForge use:** Gemini free tier = unlimited resume optimizations! 🎉

---

## **🔧 Troubleshooting**

**Error: "GEMINI_API_KEY not configured"**
- Go back to Step 3
- Make sure key name is exactly: `GEMINI_API_KEY`
- Redeploy after adding key

**Error: "API key invalid"**
- Get a new key from Google AI Studio
- Make sure you copied the entire key

**Function not deploying**
- Check `netlify/functions/gemini-proxy.js` exists
- Check deploy logs in Netlify for errors

---

## **📞 Need Help?**

- Google AI Studio: https://aistudio.google.com/
- Gemini API Docs: https://ai.google.dev/docs

---

**Made with ❤️ by Oluwatosin Agbaakin**

[Back to Main README](README.md)
