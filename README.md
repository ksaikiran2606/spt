# SPT Solutions – Premium AI Services Website

Enterprise-grade marketing site for SPT Solutions: dark futuristic theme, 3D hero, services carousel, AI chat, recommendation flow, contact & booking, and admin dashboard.

## Tech stack

- **Core:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, CSS variables
- **Animations:** Framer Motion, GSAP-ready, Three.js (R3F)
- **Backend:** Next.js API Routes, Prisma (PostgreSQL)
- **AI:** OpenAI API (chat + recommendation)

## Getting started

1. **Clone and install**
   ```bash
   cd spt-solutions
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`
   - Set `DATABASE_URL` for leads/booking (PostgreSQL)
   - Set `OPENAI_API_KEY` for chat and AI recommendation

3. **Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` – App Router pages and API routes
- `src/components/` – Layout (Navbar, Footer), home sections, chat, UI
- `src/lib/` – Services data, Prisma client, utils
- `prisma/schema.prisma` – DB schema (Lead, Conversation, Appointment, AdminUser)

## Features

- **Home:** Full-screen hero with Three.js particle background, services carousel (infinite scroll), value proposition, footer
- **Navbar:** Sticky, services dropdown, mobile hamburger
- **Services:** Dynamic `/services/[slug]` pages with hero, description, how it works, benefits, use cases, CTA
- **AI Chat:** Floating widget; POST `/api/chat` with OpenAI
- **Recommendation:** Multi-step form; POST `/api/recommendation` returns AI-suggested services
- **Contact:** Multi-step-ready form; POST `/api/contact` (stores lead, optional Resend email)
- **Book demo:** Date/time + service; POST `/api/booking`
- **Admin:** `/admin` – password login, view leads, export CSV (GET `/api/admin/leads`)

## Deployment (Vercel)

1. Push to GitHub and import in Vercel
2. Add env vars: `DATABASE_URL`, `OPENAI_API_KEY`, etc.
3. Use Vercel Postgres or external PostgreSQL; run `prisma db push` or migrations
4. Optional: Cloudflare in front for CDN

## Performance & SEO

- Lazy loading for 3D (Canvas only on hero)
- Meta tags and OpenGraph in layout and service pages
- `sitemap.ts` and `robots.ts` for SEO
- Add `NEXT_PUBLIC_GA_ID` and a GA component for analytics

## Env summary

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | For leads/booking/admin | PostgreSQL connection |
| `OPENAI_API_KEY` | For chat & recommendation | OpenAI API |
| `ADMIN_PASSWORD` | For /admin | Simple auth |
| `RESEND_*` / `CONTACT_EMAIL` | Optional | Contact form email |
| `NEXT_PUBLIC_SITE_URL` | Optional | Sitemap, OG URLs |
