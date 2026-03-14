# Project Setup

Guide for initializing the DevPath Tracker development environment.

## 1. Prerequisites
- **Node.js**: v18+ (Required for backend capabilities)
- **MongoDB**: Local URI or Cloud Atlas URI (Required for data persistence)
- **Git**: (Required for version control)

## 2. Directory Initialization

This project utilizes a structured mono-repo-like structure for cognitive organization of the Backend API and the React Client SPA.

```bash
git clone https://github.com/your-username/devpath-tracker.git
cd devpath-tracker
```

## 3. Backend (API) Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## 4. Frontend (Client) Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

> **Note:** The backend API defaults strictly to `http://localhost:5000`, while the Vite frontend defaults strictly to `http://localhost:5173`. Ensure your `.env` explicitly matches these CORS tunneling architectures.
