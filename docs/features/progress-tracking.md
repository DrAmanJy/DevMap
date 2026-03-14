# Progress Tracking State Modifiers

DevPath Tracker relies uniquely on specific enumerations representing completion state vectors mapped against the curriculum logic mapping.

## State Transitions
Subtopics hold an explicitly mapped scalar enumeration defining progress natively:

1. `not_started`: Default state of initialization representing an unseen educational bucket.
2. `in_progress`: The state triggered upon starting an associated `resource` video/doc.
3. `done`: Validating the user explicitly completes the topic knowledge mapping. 

## Business Logic Enforcements

*   **Timestamp Logic Event**: Transitioning a state payload to `done` injects a precise database trigger generating a static Date into the `completedAt` property strictly.
*   **Timestamp Recission Event**: If a user downgrades the progress from `done` natively to any other enumeration natively, the API immediately sweeps the document zeroing and removing the `.completedAt` timestamp mapping.
