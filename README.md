# 🛒 Smart Grocery – Lean & Fit Over 40

A mobile-first grocery shopping app built with **React + Vite**, based on the Lean & Fit Over 40 Smart Grocery Shopping Guide.

![LF40 Grocery App](./public/cart.svg)

## ✨ Features

- ✅ **Interactive Checklist** — tap to check items off your list
- 🛒 **In Cart Section** — checked items move to a collapsible "In Cart" panel
- 🔍 **Search** — instantly filter items by name
- 📂 **Category Filter** — filter by Protein, Carbs, Veggies, Fats, or Pantry
- ➕ **Add Custom Items** — add your own items to any category
- 📤 **Share List** — copy your full list to clipboard for sharing
- 💾 **Persisted State** — your progress is saved automatically via `localStorage`
- 🏷️ **Smart Tags** — items tagged as Meal Prep, Freezer-Friendly, or Budget-Friendly

## 🗂️ Categories

| Category | Items |
|----------|-------|
| 🥩 Protein | Animal-based, plant-based, and supplements |
| 🌾 Carbs | Whole grains, beans & legumes, and fruit |
| 🥦 Veggies | All fresh and frozen vegetables |
| 🥑 Fats | Plant-based and animal-based healthy fats |
| 🧂 Pantry | Oils, canned goods, spices, condiments, and dry staples |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/grocery-app.git
cd grocery-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to **Netlify**, **Vercel**, or **GitHub Pages**.

## 🌐 Deploy to GitHub Pages

1. Install the GitHub Pages plugin:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/grocery-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Add `base` to `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/grocery-app/',
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
grocery-app/
├── public/
│   └── cart.svg
├── src/
│   ├── data.js       # All grocery items data
│   ├── App.jsx       # Main app + all components
│   ├── App.css       # Component styles
│   ├── index.css     # Global styles & design tokens
│   └── main.jsx      # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design

- **Dark theme** with lime green (`#c8f135`) brand accent
- **Fonts**: Bebas Neue (display) + DM Sans (body)
- **Mobile-first**: max-width 430px, safe-area insets, touch-optimized
- **Category colors**: each macronutrient category has a distinct color

## 📄 License

© CTO Health, LLC and Lean & Fit Over 40. All rights reserved.  
App implementation by Coach Tony O.
