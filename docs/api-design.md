# API Specification: Authentication

```markdown
**Base URL:** `/api/v1/auth`  
**Content-Type:** `application/json`
```

## 1. Global Response Contract

Every API response strictly adheres to this standard structure to ensure predictable client-side parsing.

**Success Response (2xx)**

```json
{
  "success": true,
  "message": "Optional human-readable success message",
  "data": { ... }
}
```

**Error Response (4xx, 5xx)**

```json
{
  "success": false,
  "error": {
    "code": "SNAKE_CASE_ERROR_CODE",
    "message": "Actionable human-readable error message"
  }
}
```

---

## 2. Endpoints

### Register User

Creates a new user account (status: unverified) and triggers an OTP email.

- **POST** `/register`
- **Auth Required:** No

**Request Body:**

```json
{
  "name": "Raj Developer",
  "email": "raj@example.com",
  "password": "StrongPassword123!"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "Registration successful. Please check your email for the verification code.",
  "data": {
    "userId": "65f1e8a2b3c4d5e6f7a8b9c0"
  }
}
```

---

### Verify OTP

Validates the 6-digit code sent to the user's email to activate the account.

- **POST** `/verify-otp`
- **Auth Required:** No

**Request Body:**

```json
{
  "email": "raj@example.com",
  "code": "123456"
}
```

**Success Response (200 OK):**

> **Note:** Issues tokens only after successful verification. `refreshToken` is set via `httpOnly` cookie.

```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": {
      "id": "65f1e8a2b3c4d5e6f7a8b9c0",
      "name": "Raj Developer",
      "email": "raj@example.com",
      "isVerified": true
    },
    "accessToken": "eyJhbGci..."
  }
}
```

**Error Responses:**
| Status | Code | Message |
| :--- | :--- | :--- |
| `400` | `INVALID_OTP` | The code provided is incorrect. |
| `410` | `OTP_EXPIRED` | The code has expired. Please request a new one. |

---

### Resend OTP

Generates a new code if the previous one expired or was lost.

- **POST** `/resend-otp`
- **Auth Required:** No

**Request Body:**

```json
{ "email": "raj@example.com" }
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "New verification code sent to your email."
}
```

---

Authenticates a user and issues new access and refresh tokens.

- **POST** `/login`
- **Auth Required:** No

**Request Body:**

```json
{
  "email": "raj@example.com",
  "password": "StrongPassword123!"
}
```

**Success Response (200 OK):**

> **Note:** `refreshToken` is automatically attached via an `httpOnly` cookie.

```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "user": {
      "id": "clt12xyz0000008l6...",
      "name": "Raj Developer",
      "email": "raj@example.com"
    },
    "accessToken": "eyJhbGci..."
  }
}
```

**Error Responses:**

| Status | Code                  | Message                          |
| ------ | --------------------- | -------------------------------- |
| `400`  | `VALIDATION_ERROR`    | Email and password are required. |
| `401`  | `INVALID_CREDENTIALS` | Email or password is incorrect.  |

> 🔒 **Security Note:** To prevent enumeration attacks, the API deliberately obscures whether the email or password was the invalid field.

---

### Refresh Session

Issues a new `accessToken` using a valid `refreshToken`.

- **POST** `/refresh`
- **Auth Required:** No (Relies on valid `httpOnly` cookie)

**Request Body:**
_(Empty body. The server reads the `refreshToken` directly from the incoming request cookies)._

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci..."
  }
}
```

**Error Responses:**

| Status | Code            | Message                                        |
| ------ | --------------- | ---------------------------------------------- |
| `401`  | `TOKEN_MISSING` | Refresh token cookie is missing.               |
| `403`  | `TOKEN_INVALID` | Refresh token is invalid, expired, or revoked. |

---

### Logout User

Revokes the current refresh token and clears client cookies.

- **POST** `/logout`
- **Auth Required:** No (Relies on valid `httpOnly` cookie)

**Request Body:**
_(Empty body. The server reads the cookie, invalidates it in the database, and clears it from the client)._

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Get Current Profile

Retrieves the profile data of the currently authenticated user.

- **GET** `/me`
- **Auth Required:** Yes (`Authorization: Bearer <accessToken>`)

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clt12xyz0000008l6...",
      "name": "Raj Developer",
      "email": "raj@example.com",
      "createdAt": "2026-03-13T00:00:00Z"
    }
  }
}
```

**Error Responses:**

| Status | Code           | Message                                       |
| ------ | -------------- | --------------------------------------------- |
| `401`  | `UNAUTHORIZED` | Access token is missing, invalid, or expired. |

---

## 3. Token & Security Strategy

| Token Type     | Lifespan   | Client Storage              | Server Storage         |
| -------------- | ---------- | --------------------------- | ---------------------- |
| `accessToken`  | 15 minutes | Memory / React State        | ❌ None (Stateless)    |
| `refreshToken` | 7 days     | `httpOnly`, `secure` Cookie | ✅ MongoDB (Hashed)    |
| `OTP Code`     | 10 minutes | Email                       | ✅ MongoDB (TTL Index) |

> 🔒 **Security Note:** In MongoDB, we use a **TTL (Time To Live) Index** on the `VerificationToken` collection. This automatically deletes the OTP document from the database the second it expires, keeping your database clean without extra code.
