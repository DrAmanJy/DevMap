# Frontend Architecture

The frontend is a strictly typed application leveraging Vite with React for extreme performance and component-based organization.

## State Management Approach

- **Server State (Async)**: Handled entirely by a sophisticated data-fetching library (e.g., React Query or similar paradigms). Caches, invalidates, and rest-fetches `Topics`, `Subtopics`, and `Auth` session statuses based on key mutations automatically without manual global store orchestration.
- **Local State (Ephemeral)**: Handled by React `useState` / `useReducer` for UI toggles, modal visibility, and client-side form drafts.

## React Component Hierarchy (Example)

```mermaid
graph TD
    App[App Wrapper (Providers)] --> Router[React Router]
    
    Router --> AuthLayer[Auth Protected Route Layer]
    Router --> PublicLayer[Public Routes]
    
    AuthLayer --> Navbar[Navbar]
    AuthLayer --> Dashboard[Dashboard (All Topics)]
    AuthLayer --> Detail[TopicDetail (/:slug)]
    
    PublicLayer --> Login[Login View]
    PublicLayer --> Register[Register View]
    PublicLayer --> Verify[OTP Verify View]
    
    Dashboard --> TopicCard[Topic Summary Card]
    Detail --> SubTopicList[Subtopic List Component (Grouped by Level)]
    
    SubTopicList --> SubTopicItem[Subtopic Entry]
    SubTopicItem --> StatusBtn[Status Toggle Button]
    SubTopicItem --> ResourceList[Attached Resources View]
```

## Styling Strategy

The project utilizes **Tailwind CSS**, adopting a strictly "Utility-First" ideology over traditional BEM CSS files. This enforces style colocation with the markup structure and removes dead CSS bloat during post-processing. Responsive breakpoints (`sm`, `md`, `lg`) are handled inline.
