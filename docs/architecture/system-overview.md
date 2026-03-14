# System Architecture Overview

This document provides a high-level overview of the DevPath Tracker architecture.

## High-Level Architecture Diagram

```mermaid
graph TD
    Client[React Client SPA (Vite)] --> |HTTPS / REST API| API[Node.js Express Server]
    API --> |Mongoose ODM| DB[(MongoDB Database)]
    API --> |SMTP| Email[Email Service - Nodemailer]

    subgraph "Frontend Layer (Vercel)"
        Client
        AuthCtx[Authentication Context]
        ReactQuery[Data Fetching & State]
        Tailwind[Tailwind CSS Styling]
        Client -.-> AuthCtx
        Client -.-> ReactQuery
        Client -.-> Tailwind
    end

    subgraph "Backend Layer (Render)"
        API
        Auth[Auth Controllers]
        Topics[Topic/Subtopic Controllers]
        JWT[JWT Utility]
        API -.-> Auth
        API -.-> Topics
        API -.-> JWT
    end
```

## System Components

1.  **Frontend (Client)**: A React Single Page Application (SPA). It handles the presentation layer, routing (React Router), and global state management, communicating with the backend exclusively via RESTful JSON APIs.
2.  **Backend (API Server)**: A Node.js Express application acting as the core brain. It manages business logic, secure authentication flows, route protection, and database interfacing.
3.  **Database**: A MongoDB instance storing all persistent application state. Accessed via Mongoose to provide strict schema validation at the application level.
4.  **External Services**: Email provider used solely for dispatching OTPs during the registration and verification flows.
