# DevPath Tracker

![Version](https://img.shields.io/badge/version-1.0.0--planning-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB.svg?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248.svg?logo=mongodb)
![Workspace](https://img.shields.io/badge/Monorepo-pnpm%20workspaces-F69220.svg)

DevPath Tracker is a comprehensive, full-stack web application designed to empower developers by tracking learning progression at a highly granular, subtopic level across 19 critical software engineering domains. 

By distilling the complexities of full-stack development into an organized, metric-driven curriculum, DevPath Tracker provides a definitive pathway to professional mastery, backed by secure APIs and strict data validation.

---

## 📖 Comprehensive Documentation

The repository maintains an extensive, highly structured documentation matrix meticulously divided by architectural domain:

### 🏗️ Architecture Models
-   **[System Overview](./docs/architecture/system-overview.md)**: High-level architectural context bridging the React Client and Node API.
-   **[Frontend Architecture](./docs/architecture/frontend-architecture.md)**: Vite optimizations, React component trees, and client state orchestration.
-   **[Backend Architecture](./docs/architecture/backend-architecture.md)**: Express routing lifecycles within a monorepo workspace.
-   **[Database Design](./docs/architecture/database-design.md)**: Logical relationships between scalable entities.

### 🔌 API Reference
-   **[API Overview](./docs/api/api-overview.md)**: Standard output payloads and strict HTTP constraints.
-   **[Authentication Contracts](./docs/api/authentication.md)**: Security matrix detailing OTP generation and Dual-Token JWT flow constraints.
-   **[Progression State Modifiers](./docs/api/progress.md)**: Subtopic mutation layers and Dashboard calculations.
-   **[Tracked Topics](./docs/api/topics.md)**: Payload structural definitions for the 19 core curriculum domains.
-   **[REST Concepts](./docs/api/concepts.md)**: Noun-driven resource mutation protocols.
-   **[Technologies Glossary](./docs/api/technologies.md)**: Core dependency dictionary logic.

### 🗄️ Database Schemas
-   **[Collection Schema Details](./docs/database/schema.md)**: Detailed mapping of Mongoose schemas and strict Zod validation layers.

### 🌟 Features Documentation
-   **[Authentication Flow (OTP/JWT)](./docs/features/authentication-flow.md)**: Visual sequence diagrams mapping session lifecycles.
-   **[Learning Dashboard Mapping](./docs/features/learning-dashboard.md)**: Core UI integration rules and percent-aggregation math.
-   **[Progress Modification Rules](./docs/features/progress-tracking.md)**: Strict transition constraints governing completion states.
-   **[Periodic Revision Engine (Future)](./docs/features/revision-system.md)**: Spaced repetition automated chron capabilities.

### 💻 Development Setup
-   **[Local Workspace Initialization](./docs/development/project-setup.md)**: Workspace bridging execution logic (pnpm).
-   **[Environment Variables Registry](./docs/development/environment-variables.md)**: Secure `.env` infrastructural mapping requirements.
-   **[Code Standardization](./docs/development/coding-standards.md)**: Stringent ESLint/Prettier code conformance thresholds.
-   **[Branching & PR Strategy](./docs/development/branching-strategy.md)**: Trunk-based automated integration limits.

---

## 🎯 Core Technical Constraints
-   **Monorepo E2E Types**: Native integrations sharing Zod validation across `apps` and `packages` workspaces.
-   **JWT / OTP Lifecycle**: Cryptographically secure, explicitly expiring credential issuance.
-   **Single Source of Truth**: Progress aggregation is driven implicitly by the API to circumvent potentially stale caching logic.

## 📄 License
MIT License.
