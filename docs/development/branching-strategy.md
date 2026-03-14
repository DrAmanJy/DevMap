# Branching Strategy Outline

This project strictly adheres to a trunk-based development strategy mapping to standard Git Flow principles.

- **`main`**: The primary branch matching production. All commits merging into this branch map securely and directly to live deployments.
- **`dev`**: The staging integration branch.
- **Feature Branches**: `feat/description-hash` - For new components and API routes.
- **Bugfix Branches**: `fix/description-hash` - For patching live documented issues.

A Pull Request to `main` must pass all CI/CD hook execution (Prettier, ESLint, dry-build validation) before merging permissions unlock.
