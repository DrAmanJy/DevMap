# Learning Dashboard Feature

The core interface of the platform is the **Learning Dashboard**, aggregating the 19 critical Developer path topics into an actionable, gamified visualization.

## Primary Responsibilities
- Maps all topics retrieved from `/api/topics` sorting them by `category` and `order`.
- Projects a unified progress bar mapped against total subtopic completions dynamically calculated on the fly.
- Presents actionable links routing to deep-dive `TopicDetail` routes leveraging React Router parameterized paths.

## Design Constraints
- Dashboard data fetching relies absolutely on the `accessToken`; missing or expired tokens instantly bounce the UI back to `/login` via React Router's `Navigate`/`Redirect` mechanisms.
