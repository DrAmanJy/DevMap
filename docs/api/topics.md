# Topic and Progress Structures

The DevPath Tracker breaks its learning curriculum natively into logical boundaries.

## Target Structure Mapping

### The 19 Domains
1. Frontend Architecture
2. CSS Architecture
3. React Deep Dive
4. Next.js Foundations
5. State Management
6. Backend Architecture
7. Node.js Streams & Core
8. Relational Data (SQL)
9. Document Data (MongoDB)
10. Authentication Matrix
11. Authorization Protocols
12. API Design Patterns
13. Microservices Intros
14. System Architecture
15. Containerization (Docker)
16. CI/CD Operations
17. Cloud Engineering
18. Version Control
19. Performance Engineering

> *Specific topics definitions subject to tuning during Seed Data initialization.*

## Topics Contract Model Response

Requests to `/api/topics` yield arrays structured symmetrically enforcing strictly ordered displays.

```json
{
  "_id": "60d5ecb8b487b334542456e4",
  "name": "Frontend Architecture",
  "slug": "frontend-architecture",
  "icon": "🎨",
  "category": "frontend",
  "order": 1,
  "createdAt": "2024-03-14T00:00:00.000Z"
}
```
