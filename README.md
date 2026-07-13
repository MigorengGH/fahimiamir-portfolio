# Fahimi Amir Portfolio Website

A state-of-the-art personal portfolio website built with **Next.js**, **Sanity CMS**, and **TailwindCSS**. Features an editorial dark/light theme, interactive thermodynamic grid background, smooth transitions, and dynamic content management.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **CMS**: Sanity (Embedded Sanity Studio for real-time editing)
- **Styling**: TailwindCSS 4, Custom HSL Color Tokens, Framer Motion for rich micro-animations
- **Graph Knowledge Base**: Graphify (Persistent AST-based codebase graph indexing)

## 📁 Sections & Features

1. **Hero Landing Page**: Clean editorial layout with animated name reveal, thermodynamic grid, and hover effects.
2. **Profile Sidebar**: Unified profile card (avatar, email, location, resume download) driven by Sanity profile settings.
3. **About Section**: Interactive service cards mapping skills and areas of expertise.
4. **Resume Section**: Detailed professional history, education, certifications, and visual skill domain lists.
5. **Projects Section** (formerly Portfolio): A comprehensive gallery of software, web, data analytics, and video projects with filtering, sorting, grid/list view toggles, image sliders, and inline PDF view for documents.
6. **Blog & Awards**: Grid of award achievements and extracurricular highlights.

---

## 🛠️ Getting Started

### 1. Environment Setup
Create a `.env.local` file in the root of the project with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_READ_TOKEN="your_read_token"
```

### 2. Local Installation & Development
Install the dependencies and start the Turbopack development server:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

---

## ✍️ Content Management (Sanity Studio)

All page content (projects, certifications, awards, profile, about description) is fully managed via Sanity Studio. You can edit content in real-time by navigating to `/studio` on your local host (requires a Sanity login/editor permission).

- **Schemas**: Registered in `sanity/schemaTypes`
- **Structure Resolver**: Configured in `sanity/structure.ts`
- **Data Queries**: All queries live in `lib/queries.ts` using GROQ

---

## 🕸️ Codebase Graph (Graphify)

This repository is integrated with **Graphify** to index code structure and dependencies.
To rebuild the local AST graph manually:

```bash
graphify extract . --code-only
graphify cluster-only .
```

A post-commit git hook is installed to automatically update the knowledge graph on every commit.
