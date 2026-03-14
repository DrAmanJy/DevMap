# API Overview

The DevPath Tracker utilizes a RESTful JSON architecture for communication between the Vite/React SPA client and the Node.js/Express system.

**Base URL**: `/api`

## Contract Enforcement

All communication to and from clients is standardized.

**Success Output Schema:**
```json
{
  "success": true,
  "message": "Human readable context (optional)",
  "data": { 
    // Payload Entity Structure
  }
}
```

**Error Output Schema:**
```json
{
  "success": false,
  "error": {
    "code": "SNAKE_CASE_ERROR",
    "message": "Human readable, actionable error message"
  }
}
```

### Content Delivery
- **Incoming**: `application/json` (unless defined as multipart for future attachments).
- **Outgoing**: `application/json` payload structures.

### Standard Response Codes
- `200 OK`: General successful queries and modifications.
- `201 Created`: Explicitly for creation mapping (e.g., User Registration).
- `400 Bad Request`: Validation failure on the incoming Request Body structure.
- `401 Unauthorized`: Lacking a valid `accessToken` or failed password evaluation.
- `403 Forbidden`: Authenticated, but lacking specific context permissions.
- `404 Not Found`: Resource ID mapped does not point to an active Document.
- `500 Internal Server Error`: Unhandled system exceptions.
