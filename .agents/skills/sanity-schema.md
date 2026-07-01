---
name: sanity-schema
description: Use whenever creating, editing, or querying Sanity schema types or GROQ queries for this portfolio.
---

- All schemas live in /sanity/schemaTypes, one file per document type.
- Every schema must be registered in /sanity/schemaTypes/index.ts.
- GROQ queries live in /lib/queries.ts, never inline in components.
- Image fields always use `image().options({hotspot: true})`.
