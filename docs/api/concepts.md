# REST & Core Conceptual API Models

This document enforces strict RESTful interpretations implemented across the DevPath Node/Express Backend ecosystem.

## Resources Over Actions

The API strictly favors standard HTTP verb mapping against Nouns over custom Verbs, excepting edge authentication lifecycle cases.

**Allowed Structure:**
- `GET /api/topics` (Retrieve All)
- `GET /api/topics/react` (Retrieve Specific)
- `PATCH /api/subtopics/1234` (Partially Mutate Specific)

**Prohibited Structure:**
- `POST /api/topics/getReact`
- `POST /api/subtopics/changeNotes`

## Pagination Constraints (Future)

To guarantee scalability, query limits must be natively enforced. The query engine expects standardized variables to manipulate Mongoose `.skip()` and `.limit()` chains if collections eclipse the current 19-domain constraint mapping.

## Patch Strategy
Only fields provided strictly within the `PATCH` payload are processed for modification; absent fields retain their extant document state natively omitting the need for full document replacements (`PUT`).
