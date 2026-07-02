# Project Architecture Rules

## Data Management
This project uses **Sanity CMS** as the single source of truth for all dynamic portfolio data. 
- Do NOT use static data files (like `lib/portfolio-data.ts`) for updating or managing content.
- If you need to add or modify data fields (e.g. adding a new property to a project or blog post), you MUST:
  1. Update the Sanity schema definitions in `sanity/schemaTypes/`.
  2. Update the GROQ queries in `sanity/lib/queries.ts`.
  3. Update the corresponding frontend component props to expect the shape of the Sanity data.
- The `app/page.tsx` file is configured as a Server Component that fetches data via `sanityFetch` and passes it to client components (e.g. `<HomeClient>`).

## Component Guidelines
- UI components should remain dumb and receive data via props.
- For animations and styling, adhere to the modern "Glow + Halftone" aesthetic established in the `AnimatedBackground` component.
- Ensure all components are responsive and use Tailwind CSS for styling.
