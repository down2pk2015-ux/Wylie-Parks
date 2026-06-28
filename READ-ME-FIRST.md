# Wylie Parks Work Orders — Put it online (PC + phone app)

Everything you need is in this folder. Keep all the files together; don't rename them.

```
index.html            ← the app
manifest.webmanifest  ← makes it installable
sw.js                 ← lets it work offline
icon-192.png / icon-512.png / icon-512-maskable.png  ← app icons
```

---

## Step 1 — Put it online (do this first)

You need the folder hosted at a web address. Pick ONE option.

### Easiest: Netlify Drop (no account login needed to start)
1. Go to **https://app.netlify.com/drop**
2. Drag this whole **folder** onto the page.
3. It gives you a live address like `https://something-random.netlify.app` — that's your app URL.
4. (Optional) Make a free account to rename it to something like `wylie-parks.netlify.app`.

### Or: GitHub Pages (the way you've published before)
1. Make a new repository, upload all the files in this folder to it.
2. Repo **Settings → Pages → Deploy from branch → main / root → Save**.
3. After a minute your URL is `https://YOURNAME.github.io/REPONAME/`.

> Your app URL works in any browser on PC and phone right away.

---

## Step 2 — Install it on a PC

1. Open your app URL in **Chrome or Edge** on the computer.
2. Click the **install icon** in the address bar (a little monitor/⊕ icon), or menu **⋮ → Install Wylie Parks…**
3. It installs as a desktop app with the Wylie "W" icon and opens in its own window.

---

## Step 3 — Make it an Android app (phone)

The quickest no-code way:

1. Go to **https://www.pwabuilder.com**
2. Paste your app URL and click **Start**. It will detect the manifest, icons, and offline support (all already built in).
3. Click **Package For Stores → Android**.
4. Download the package:
   - **APK** = install straight onto a phone for testing (enable “install unknown apps”).
   - **AAB** = the file you upload to the Google Play Store.
5. For Google Play you'll need a **Play Console** account ($25 one-time). PWABuilder also gives you an `assetlinks.json` file and a fingerprint — put that file in a `.well-known` folder at your site so the app opens without a browser bar. (Same step you did for IronVale.)

---

## Important to know before a real rollout
- **Data is per-device.** Each person's orders, hours, and time-off are stored on their own phone/computer — they do **not** sync between devices yet. Two people will not see the same board. A shared cloud account (Firebase/Supabase) is the upgrade that makes everyone share one live system.
- Passwords are a **basic device lock**, not full security, and also don't sync between devices yet.
- To update the app later, just replace these files at the same URL.
