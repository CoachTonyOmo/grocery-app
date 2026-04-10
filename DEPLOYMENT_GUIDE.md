# 🚀 Deployment Guide
## Smart Grocery – Lean & Fit Over 40
### How to Put Your App on the Internet (No Developer Experience Needed)

---

## What You're About to Do

By the end of this guide, your app will be live at a free URL like:
**`https://your-username.github.io/grocery-app`**

Your customers and members can visit that link on their phone and add it to their home screen — just like a real app. No App Store. No fees.

**Total time:** About 30–45 minutes the first time.
**Cost:** Free (GitHub Pages is free to host).

---

## What You'll Need

- A computer (Mac or Windows — either works)
- An internet connection
- An email address (for creating accounts)
- The `grocery-app.zip` file you downloaded

That's it. No coding knowledge required.

---

## PART 1 — Install the Tools (One Time Only)

### Step 1 — Install Node.js

Node.js is the engine that runs your app. You only install this once.

1. Go to **https://nodejs.org**
2. Click the big green button that says **"LTS"** (the recommended version)
3. Download the installer and open it
4. Click **Next** through all the steps and click **Install**
5. When it's done, click **Finish**

**✅ To verify it worked:**
- On **Mac:** Open the app called **Terminal** (search for it with Spotlight — press `⌘ Space` and type "Terminal")
- On **Windows:** Press the **Windows key**, type **"Command Prompt"**, and open it

Type this and press Enter:
```
node --version
```
You should see something like `v20.11.0` — any number is fine. If you see a number, it worked!

---

### Step 2 — Create a Free GitHub Account

GitHub is where your app will be hosted for free.

1. Go to **https://github.com**
2. Click **Sign up**
3. Enter your email, create a password, and choose a username
   - Your username will be part of your app's URL, so pick something clean like `coachtonyO` or `lf40coaching`
4. Verify your email address when GitHub sends you a confirmation email
5. Sign in to your new account

---

### Step 3 — Create a New Repository (Your App's Home on GitHub)

A "repository" is just a folder on GitHub that holds your app.

1. Once signed in to GitHub, click the **green "New"** button (or go to **https://github.com/new**)
2. Under **"Repository name"** type: `grocery-app`
   > ⚠️ Use exactly this name — it must match what's in the code
3. Make sure **"Public"** is selected
4. **Do NOT** check any of the "Initialize this repository" boxes
5. Click **"Create repository"**

You'll see a mostly empty page — that's normal. Leave this tab open.

---

## PART 2 — Set Up the App Files

### Step 4 — Unzip the App

1. Find the `grocery-app.zip` file you downloaded
2. **Unzip it:**
   - **Mac:** Double-click the zip file — it creates a `grocery-app` folder automatically
   - **Windows:** Right-click the zip file → "Extract All" → click "Extract"
3. You should now have a folder called `grocery-app`

---

### Step 5 — Update Your GitHub Username in the Code

You need to tell the app who owns it. Open these files in a basic text editor (Notepad on Windows, TextEdit on Mac).

#### File 1: `package.json`

1. Navigate into the `grocery-app` folder
2. Find the file called `package.json`
3. Open it with a text editor (right-click → "Open with" → Notepad/TextEdit)
4. Find this line:
   ```
   "homepage": "https://YOUR-GITHUB-USERNAME.github.io/grocery-app",
   ```
5. Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username
   - Example: `"homepage": "https://coachtonyO.github.io/grocery-app",`
6. Save and close the file

---

## PART 3 — Open a Terminal in Your App Folder

This is the part that looks scary but is very simple — you're just typing a few commands.

### On Mac:
1. Open **Terminal** (search with `⌘ Space`, type "Terminal")
2. Type `cd ` (with a space after it) — don't press Enter yet
3. Drag the `grocery-app` folder from Finder into the Terminal window
4. The path fills in automatically — now press **Enter**

### On Windows:
1. Open the `grocery-app` folder in File Explorer
2. Click in the address bar at the top (where it shows the folder path)
3. Type `cmd` and press **Enter** — a black Command Prompt window opens in that folder

**✅ You should see something like:**
```
username@computer grocery-app %
```
or on Windows:
```
C:\Users\YourName\grocery-app>
```

---

## PART 4 — Install & Deploy

### Step 6 — Install the App's Dependencies

Type this command and press **Enter**:
```
npm install
```

You'll see a lot of text scroll by — this is normal. It's downloading everything the app needs. Wait until it stops and you see the cursor blinking again.

> ⏱️ This takes 1–3 minutes depending on your internet speed.

---

### Step 7 — Connect to Your GitHub Repository

Now you'll link your folder to the GitHub repository you created. Run these commands **one at a time**, pressing Enter after each:

```
git init
```
```
git add .
```
```
git commit -m "Initial commit"
```
```
git branch -M main
```

Now go back to your GitHub tab from Step 3. You'll see a section that says **"…or push an existing repository from the command line"**. Copy the line that starts with `git remote add origin` — it'll look like:

```
git remote add origin https://github.com/YOUR-USERNAME/grocery-app.git
```

Paste that into your terminal and press **Enter**.

Then run:
```
git push -u origin main
```

> 💡 GitHub may ask for your username and password here. Use your GitHub username and password. On some systems it opens a browser window to log in — just sign in there.

---

### Step 8 — Deploy the App to GitHub Pages

This is the magic step that puts your app on the internet:

```
npm run deploy
```

You'll see text scroll by ending with something like `Published`. 

> ⏱️ This takes 1–2 minutes.

---

### Step 9 — Turn On GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/grocery-app`
2. Click the **Settings** tab (gear icon, near the top right)
3. In the left sidebar, click **Pages**
4. Under **"Branch"**, change the dropdown from `None` to **`gh-pages`**
5. Make sure the folder dropdown shows **`/ (root)`**
6. Click **Save**

---

### Step 10 — Wait & Visit Your App! 🎉

GitHub takes **2–5 minutes** to publish your app after the first deploy.

Your app will be live at:
```
https://YOUR-USERNAME.github.io/grocery-app
```

Open that URL on your phone and you should see your app!

---

## PART 5 — How Customers Install It on Their Phone

Share this URL with your customers and members. Here's what they do:

### On iPhone (Safari):
1. Open the link in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (the box with an arrow pointing up) at the bottom
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top right
5. The app icon appears on their home screen ✅

### On Android (Chrome):
1. Open the link in **Chrome**
2. A banner may automatically appear saying **"Add to Home Screen"** — tap it
3. If no banner: tap the **three dots menu** (⋮) in the top right → "Add to Home screen"
4. Tap **"Add"** ✅

---

## PART 6 — Updating the App in the Future

When you get an updated version of the app from your developer:

1. Replace the files in your `grocery-app` folder with the new files
2. Open Terminal/Command Prompt in the `grocery-app` folder (same as Part 3)
3. Run these commands:
   ```
   git add .
   git commit -m "Update app"
   git push
   npm run deploy
   ```
4. Done! Everyone gets the update automatically within a few minutes — no action needed from your customers.

---

## Troubleshooting

**"npm is not recognized" or "command not found"**
→ Node.js didn't install correctly. Go back to Step 1 and reinstall it. Restart your terminal after installing.

**"Permission denied" errors on Mac**
→ Type `sudo npm install` instead and enter your Mac login password when asked.

**App shows a blank white page**
→ The `base` path in `vite.config.js` might not match your repo name. Make sure the repo on GitHub is named exactly `grocery-app`.

**"fatal: remote origin already exists"**
→ Run `git remote remove origin` then try the `git remote add origin...` command again.

**App deployed but looks wrong or shows old version**
→ Clear your browser cache: on mobile, close and reopen the browser. On desktop press `Ctrl+Shift+R` (Windows) or `⌘+Shift+R` (Mac).

**Still stuck?**
→ Take a screenshot of the error message and share it with your developer. The error text tells exactly what went wrong.

---

## Optional: Use a Custom Domain

If you want the app to live at your own URL like `app.leanfitover40.com` instead of the GitHub URL:

1. Go to **Settings → Pages** in your GitHub repository
2. Under **"Custom domain"** enter your domain (e.g. `app.leanfitover40.com`)
3. Log in to wherever you bought your domain (GoDaddy, Namecheap, etc.)
4. Add a **CNAME record** pointing to `YOUR-USERNAME.github.io`
5. GitHub will automatically set up HTTPS (the padlock) within 24 hours

This step is optional — the free GitHub URL works perfectly fine for sharing with members.

---

## Quick Reference — Commands You'll Use

| What | Command |
|------|---------|
| Install dependencies (first time only) | `npm install` |
| Deploy / update the live app | `npm run deploy` |
| Save + push code changes to GitHub | `git add . && git commit -m "update" && git push` |

---

*Guide created for Lean & Fit Over 40 — Coach Tony O*
