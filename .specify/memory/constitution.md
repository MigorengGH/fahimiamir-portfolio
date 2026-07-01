# Project Constitution

This is a personal portfolio site maintained by one developer, meant to run long-term at zero cost.

## Principles

1. **All page content (projects, about, skills, experience) lives in Sanity — never hardcode content in JSX/TSX.**

2. **Data fetching uses `next-sanity` + GROQ only — no ad-hoc REST calls to Sanity.**

3. **Images always go through Sanity's image CDN (`@sanity/image-url`) — no local static images for CMS-managed content.**

4. **Stay within free tiers: Vercel Hobby, Sanity Free plan. Flag anything that risks exceeding quotas.**

5. **Every new content type requires a schema file in `/sanity/schemaTypes` before any component references it.**
