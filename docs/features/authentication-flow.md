# Authentication Flow Diagram

This document delineates the exact sequence of events that encompass the authentication security strategy of DevPath Tracker.

## Registration & Verification Flow

```mermaid
sequenceDiagram
    participant User
    participant Client as React SPA 
    participant API as Node/Express
    participant DB as MongoDB
    participant Email as Nodemailer/SMTP

    User->>Client: Enters Name, Email, Password
    Client->>API: POST /api/auth/register
    API->>API: Hash Password (bcrypt)
    API->>DB: Save User {isVerified: false}
    API->>API: Generate 6-digit OTP
    API->>DB: Save Hashed OTP with TTL (10m)
    API->>Email: Send OTP email
    Email-->>User: Delivers Code
    API-->>Client: 201 Created (Instructions)

    User->>Client: Enters OTP + Email
    Client->>API: POST /api/auth/verify-otp
    API->>DB: Fetch User & Hashed OTP
    API->>API: Verify active OTP (bcrypt.compare)
    
    alt OTP Invalid or Expired
        API-->>Client: 400 or 410 Error
    else OTP Valid
        API->>DB: Update User {isVerified: true}
        API->>API: Generate Access Token (15m)
        API->>API: Generate Refresh Token (7d)
        API->>DB: Save Hashed Refresh Token
        API-->>Client: 200 OK + Auth Cookie + Access Token
        Client->>Client: Cache Access Token, redirect to Dashboard
    end
```

## Session Hydration (Refresh) Flow

```mermaid
sequenceDiagram
    participant Client as React SPA (Vite)
    participant API as Node/Express
    participant DB as MongoDB

    Note over Client: Access Token Expired (15m)
    Client->>API: POST /api/auth/refresh (Sends httpOnly Cookie)
    API->>API: Extract & Verify Cookie Signature
    
    alt Token Invalid / Missing
        API-->>Client: 401/403 Error (Trigger Auto-Logout)
    else Token Valid
        API->>DB: Find User by ID
        API->>API: Compare Hashed DB Token vs Cookie Token
        
        alt Hash Mismatch (Token Revoked)
             API-->>Client: 403 Forbidden
        else Hash Match
             API->>API: Mint new Access Token (15m)
             API-->>Client: 200 OK + New Access Token
             Client->>Client: Cache, resume interrupted requests
        end
    end
```
