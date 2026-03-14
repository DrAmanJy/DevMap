# Revision System (Future Roadmap)

While not currently scoped for the version 1 MVP launch, the architecture establishes the groundwork for a spaced-repetition revision system natively integrated into the topics model.

## Planned Implementation Strategy

- **New Subtopic Property**: A `requiresRevision` boolean flag mapped to Subtopics, automatically triggered `true` via a chron job based on the `completedAt` timestamp eclipsing a 30-day threshold.
- **Dedicated Route**: A specialized UI view fetching specifically `status: done` and `requiresRevision: true` items.

*Note: Database schemas and frontend models explicitly map `completedAt` to support this chronological future feature deployment.*
