# Progress Mapping API

These endpoints handle modifying and querying the curriculum status mapping.

*(Endpoints definition subject to final scope mapping pending UI/UX layout alignment).*

## Topics Dashboard (`GET /api/topics`)
Retrieves index mapping summaries structure. Calculates percent progression on the fly without DB modifications.
- **Auth context**: Requires Valid Bearer Token string.

```json
{
  "success": true,
  "data": {
    "topics": [
      {
        "id": "abc...",
        "name": "Frontend",
        "slug": "frontend",
        "icon": "🎨",
        "category": "frontend",
        "order": 1,
        "progress": {
          "total": 45,
          "done": 10,
          "percent": 22
        }
      }
    ]
  }
}
```

## Deep Topic Detail (`GET /api/topics/:slug`)
Recursively embeds detailed `SubTopic` lists segmented natively into groups (`required`, `advanced`, `optional`).

## Patch Subtopic Progression (`PATCH /api/subtopics/:id`)
Granular update endpoint strictly locked against arbitrary payload injections. Evaluates logic changes on `status`, injecting a `completedAt` timestamp strictly if transition equates to `done`, stripping it otherwise.

```json
// Example Modifying Status Request
{
  "status": "done"
}
```

```json
// Example Modifying Notes Draft Request
{
  "notes": "React Query avoids context propagation re-renders..."
}
```
