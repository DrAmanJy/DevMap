# Development Coding Standards

All contributing engineers must strictly adhere to the following conventions to maintain repository integrity.

## 1. Code Formatting
- **Prettier**: Prettier is rigorously enforced via pre-commit hooks.
- **ESLint**: Custom `.eslint.config.mjs` rules deny building upon detection of unused variables or missing exhaustiveness checks on Enums.

## 2. Naming Conventions
- **Variables / Functions**: `camelCase`
- **React Components**: `PascalCase`
- **Constants / Environment Variables**: `UPPER_SNAKE_CASE`
- **File Names (Components)**: `PascalCase.tsx`
- **File Names (Utilities/Contexts)**: `camelCase.ts`

## 3. Git Workflow Commit Prefixing
All commits must begin with standard scoping tags:
- `feat:` A new client-facing or backend capability.
- `fix:` Patching a documented bug or crash.
- `docs:` Altering READMEs or the `/docs` structure.
- `refactor:` Changing implementation details without modifying the outward contract shape.
- `chore:` Dependency bumps, CI/CD pipeline modifications.
