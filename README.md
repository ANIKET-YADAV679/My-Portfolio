# Aniket Yadav — Developer Portfolio

A premium, responsive personal portfolio built with React + Vite.

## ✨ Features

- Dark, elegant developer aesthetic
- Responsive desktop/tablet/mobile layout
- Animated hero and page sections
- About, skills, projects and contact sections
- Project filtering
- Dedicated project detail pages
- GitHub, LinkedIn and LeetCode links
- Accessible mobile navigation
- SEO metadata
- Vercel-ready SPA routing
- No backend required

## 🛠️ Stack

- React
- Vite
- React Router
- Framer Motion
- Lucide React
- CSS

## 🚀 Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## 📦 Push to a new GitHub repository

```bash
git init
git add .
git commit -m "feat: build premium developer portfolio"
git branch -M main
git remote add origin YOUR_NEW_REPOSITORY_URL
git push -u origin main
```

## ▲ Vercel

Import the GitHub repository into Vercel.

Vercel should detect Vite automatically.

- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` keeps React routes working after refresh.

## ✏️ Update your portfolio

Most personal content is in `src/data.js`.

Add or update:
- profile text
- skills
- projects
- repository URLs
- social links

Project pages are generated from the project data, so adding a project does not require creating a new component.
