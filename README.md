# Sifat Hossain - React portfolio

A responsive, single-page portfolio built with React, TypeScript and Vite. Profile content comes from the supplied CV. Project graphics are architecture illustrations, not product screenshots.

## Local development

Requires Node.js 22 or later.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` for a production build and `npm run preview` to serve it locally. Deploy the generated `dist` folder to any static hosting service.

## Content

- Edit profile, projects, work history and contact links in `src\App.tsx`.
- Edit responsive styles in `src\styles.css`.
- Replace `public\MD-Sifat-Hossain-CV.pdf` to update the downloadable resume.
- The contact action opens the visitor's email client; there is no form backend.
- Google Fonts is optional; local sans-serif fallbacks keep the site usable without access to it.

## Browser checks

```powershell
npx playwright install chromium
npm test
```

The browser checks start their own local Vite server and cover desktop/mobile layouts, navigation, project filters, disclosures, contact links and the resume download.
