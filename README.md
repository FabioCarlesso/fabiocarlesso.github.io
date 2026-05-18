# fabiocarlesso.github.io

Personal developer portfolio — bilingual (EN/PT), dark mode, and an admin page to edit content without touching HTML.

- **Live**: https://fabiocarlesso.github.io/
- **About me / institutional**: https://fabiocarlesso.com/
- **GitHub**: https://github.com/FabioCarlesso

## Tech stack
- Plain HTML, CSS and JavaScript — no build step, no framework, no package manager
- [Quicksand](https://fonts.google.com/specimen/Quicksand) (Google Fonts) and [Font Awesome 6](https://fontawesome.com/) via CDN
- GitHub Pages for hosting, GitHub Actions for deploys

## Features
- Bilingual content with a topbar toggle (EN default, PT toggle, choice persisted)
- Light/dark theme toggle, falls back to system preference, no flash on load
- Single-source-of-truth content model (`data.js`) consumed by both the public page and the admin
- Admin page with auto-saved drafts and one-click export back to `data.js`
- Auto-deploy on every push to `main`

## Project structure
```
.
├── index.html              # Public page — shell, rendered from data.js
├── admin.html              # Content editor
├── data.js                 # Single source of truth (editable content)
├── assets/
│   ├── css/
│   │   ├── style.css       # Public styles + theme variables
│   │   └── admin.css       # Admin-only styles
│   ├── js/
│   │   ├── main.js         # Renders the public page from data.js
│   │   └── admin.js        # Admin form, draft persistence, export
│   └── img/favicon.svg
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deploy on push to main
└── .nojekyll               # Skip Jekyll processing
```

## Editing content

The site is data-driven. Anything you would want to change — name, taglines, about paragraphs, stack groups, projects, contact links — lives in `data.js`.

### Option A — admin UI (recommended)
1. Open https://fabiocarlesso.github.io/admin.html
2. Edit any field. Changes auto-save to your browser's `localStorage` as a draft (banner confirms).
3. Click **Preview** to open the public page rendered with the current draft.
4. Click **Export data.js** → **Copy** (or **Download**) to grab the regenerated file.
5. **Open on GitHub** opens the editor for `data.js` on `main`. Paste, commit, done.
6. The Pages workflow redeploys in ~30s.

Use **Reset draft** to discard local changes and reload from the live `data.js`.

### Option B — direct edit
Open `data.js` and edit the JS object. Same shape as the admin export.

## Data schema
```js
window.SITE_DATA = {
  profile: {
    name: "...",
    avatarInitials: "FC",
    tagline: { en: "...", pt: "..." },
    lead:    { en: "...", pt: "..." },
    heroLinks: [{ icon, label, url }, ...]
  },
  about: { en: ["paragraph 1", "..."], pt: ["..."] },
  stack: [
    { title: { en: "Languages", pt: "Linguagens" }, items: ["Java", "Python"] }
  ],
  projects: [{
    name, icon,
    description: { en, pt },
    chips: ["Java 21", "REST"],
    links: [{ icon, label, url }, ...]
  }],
  links: [{ icon, label, url }, ...],
  contacts: [{ icon, label, url }, ...]
};
```
`icon` strings are Font Awesome classes (e.g. `fa-brands fa-github`, `fa-solid fa-server`).

## Deploy

Each push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which uploads the repository as a Pages artifact and publishes it.

One-time setup on GitHub: **Settings → Pages → Source → GitHub Actions**.

## Local preview

No build needed. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

To preview a local admin draft on the public page, append `?draft=1`:

```
http://localhost:8000/index.html?draft=1
```

---

© Fabio Carlesso
