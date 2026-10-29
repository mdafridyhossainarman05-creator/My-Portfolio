# MD Afridy Hossain Arman: Portfolio

React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Update your content
Everything is in `src/data/portfolio.ts`:
- `profile`: email, github, linkedin, photo (empty = placeholder / hidden)
- `experience`, `education`, `training`, `skills`: edit the text
- `projects`: add objects (title, description, tech, image, demo, repo)
- Put images in `public/` and reference them as `/file.jpg`
- Replace `public/favicon.svg` with your own icon

## Deploy (free)
Push to GitHub, then either:
- **Vercel**: Add New, Project, import the repo (framework: Vite), Deploy.
- **Cloudflare Pages**: Create project, connect GitHub, build command `npm run build`, output directory `dist`.

## Contact form
The form validates input and opens the visitor's email app (mailto) once `profile.email` is set. It does not send mail from a server. To store messages, connect Supabase later.

## Final checklist
- [ ] Fill in email, GitHub, LinkedIn, photo
- [ ] Confirm the SSC year (2029) and other dates
- [ ] Test on phone, tablet and desktop
- [ ] Tab through the site (keyboard focus visible)
- [ ] `npm run build` passes
