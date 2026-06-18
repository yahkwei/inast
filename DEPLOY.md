# Deploy Inast (free)

The site is ready to deploy. Pick **one** option below.

---

## Option A — GitHub Pages (recommended, free)

### 1. Create a GitHub repo
1. Go to [github.com/new](https://github.com/new)
2. Name it e.g. `inast` (or any name)
3. Leave it **empty** (no README)
4. Create the repository

### 2. Push this project
In PowerShell, from the `ghost` folder:

```powershell
git init
git add .
git commit -m "Initial commit — Inast site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/inast.git
git push -u origin main
```

Replace `YOUR_USERNAME` and repo name with yours.

### 3. Enable GitHub Pages
1. Open your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Wait ~1–2 minutes for the workflow to finish

Your site will be live at:
`https://YOUR_USERNAME.github.io/inast/`

(If the repo is named `YOUR_USERNAME.github.io`, it lives at the root URL instead.)

---

## Option B — Vercel (free, custom URL like `inast.vercel.app`)

1. Sign up at [vercel.com](https://vercel.com) (GitHub login works)
2. From the `ghost` folder run:

```powershell
npm run deploy:vercel
```

3. Follow the browser login prompt once
4. Vercel gives you a live URL immediately

`vercel.json` is already configured for client-side routing.

---

## Option C — Netlify (free)

1. Sign up at [netlify.com](https://netlify.com)
2. **Add new site** → **Import an existing project** → connect GitHub repo  
   OR drag-and-drop the `dist` folder after running `npm run build`
3. Build command: `npm run build`  
   Publish directory: `dist`

`netlify.toml` is already configured.

---

## After deploy

1. Submit a test form on **Contact** — activate FormSubmit via the email sent to `ghostarchives9@gmail.com` (first time only)
2. Click through all pages and order forms to confirm routing works
