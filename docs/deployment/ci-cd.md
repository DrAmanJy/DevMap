# Continuous Integration / Continuous Deployment (CI/CD)

The repository integrates automated testing and deployment validation sequences via GitHub Actions to ensure application robustness prior to pushing to Render or Vercel.

## Workflow Triggers

Action pipelines trigger strictly on the following events:
- Open Pull Request targeting `main`.
- Direct Push targeting `main`.

## Typical Pipeline Sequence

1. **Environment Setup**: Provisions Ubuntu-latest VM mapped with Node.js LTS.
2. **Dependency Resolution**: `npm ci` executes grabbing deterministic packages mapped strictly to `package-lock.json`.
3. **Lint Verification**: ESLint verifies file code conformance to static architecture rules.
4. **Format Verification**: Prettier enforces formatting configurations preventing aesthetic drift.
5. **Dry Run Build**: The frontend Vite configuration compiles to ensure syntax compatibility. Note: The backend Express implementation compiles natively and does not demand bundling steps.
6. **Deployment Webhook**: On `main` merge events, Webhooks dispatch signals safely triggering respective Render/Vercel platform pull/build configurations.
