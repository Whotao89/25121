# Deployment Instructions

## Build locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the app:
   ```bash
   npm run build
   ```
3. Preview locally (Vite):
   ```bash
   npm run preview
   ```

---

## Deploy to Vercel (recommended for simplicity)
1. Create an account at https://vercel.com and install Vercel CLI if desired.
2. From your project root run:
   ```bash
   vercel
   ```
3. Set environment variables in Vercel dashboard (use the same `VITE_...` keys from `.env`).
4. Push to Git (Vercel can auto-deploy from GitHub/GitLab/Bitbucket).

---

## Deploy to Netlify
1. Create an account at https://app.netlify.com
2. Link your repo and set build command: `npm run build` and publish directory: `dist`
3. Add `VITE_...` env vars in Netlify site settings.

---

## Deploy to Firebase Hosting (since project already uses Firebase)
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```
   - Choose `dist` (or `build`) as the public directory when asked (`dist` for Vite)
   - Configure as a single-page app (rewrite all URLs to /index.html)
2. Add your env vars to your CI or use a build step that reads from `.env`.
3. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## Notes
- Keep your Firebase rules secure before production. For quick dev tests you can temporarily allow read/write, but lock it down for production.
- Remember to add `christmas.mp3` (optional audio) to `public/` if you use the built-in audio toggle.
