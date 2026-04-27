# 🌷 Tulip Gift — A Special Surprise from Matt & Amanda

A personalized gift announcement website for Dutch tulip bulbs, built with pure HTML, CSS, and JavaScript. No frameworks, no build step — just open a file and it works.

---

## 📁 Project Structure

```
tulip-gift/
├── index.html              ← Root landing (if someone hits the base URL)
├── css/
│   └── styles.css          ← Shared styles for all pages
├── js/
│   └── petals.js           ← Floating tulip petal animation
├── mom/
│   └── index.html          ← /mom  — Mother's Day (warm coral theme)
├── maw/
│   └── index.html          ← /maw  — Mother's Day (lavender theme)
├── courtney/
│   └── index.html          ← /courtney — Birthday (teal & yellow theme)
├── brittney/
│   └── index.html          ← /brittney — Birthday (hot pink theme)
└── pages/
    └── care-guide.html     ← Tulip care guide (coming soon / expand later)
```

---

## 🚀 Hosting on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/tulip-gift/`

Each person's page will be at:
- `/tulip-gift/mom/`
- `/tulip-gift/maw/`
- `/tulip-gift/courtney/`
- `/tulip-gift/brittney/`

---

## ✏️ Customizing Messages

Each page has a `<div class="card">` section with the personal message. Just edit the text inside the `<p class="message">` tags.

---

## 🎨 Color Themes

Each page has its own `:root` CSS variables at the top of its `<style>` block. Change `--accent`, `--heading`, and `--bg` to retheme a page instantly.

| Page     | Theme              |
|----------|--------------------|
| /mom     | Warm coral & red   |
| /maw     | Soft lavender      |
| /courtney| Teal & golden      |
| /brittney| Hot pink & magenta |

---

Made with 💛 by Matt & Amanda
