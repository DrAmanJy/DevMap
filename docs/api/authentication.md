# Authentication Endpoints

Strict procedures handle mapping, validating, and establishing secure state connections. Security assumes no single attack vector compromise affects full system exposure.

---

## 1. Registration (`POST /api/auth/register`)
Stores a new unverified user and dispatches an OTP email.
- **Security Context**: Public.

| Field | Type | Rule |
| :--- | :--- | :--- |
| `name` | String | Required |
| `email`| String | Required, Valid format, Unique DB enforcement |
| `password`| String | Required, strong parsing |

**Returns**: `201 Created` - `userId`, instructions to check email.

---

## 2. Verify OTP (`POST /api/auth/verify-otp`)
Validates specific OTP mapping payload against user to trigger an activated DB state.
- **Security Context**: Public.

| Field | Type | Rule |
| :--- | :--- | :--- |
| `email`| String | Required |
| `otp` | String | Exactly 6 chars |

**Returns**: `200 OK` - Set HTTPOnly `refreshToken`, returns `accessToken` + `user` object inside the `data` entity.

---

## 3. Login (`POST /api/auth/login`)
Standard authentication via encrypted password checking.

| Field | Type | Rule |
| :--- | :--- | :--- |
| `email`| String | Required |
| `password` | String | Required |

**Returns**: `200 OK` - Re-issues HTTPOnly `refreshToken`, returns `accessToken` + `user`.

---

## 4. Refresh Token (`POST /api/auth/refresh`)
Issues new `accessToken` from unexpired database-valid `refreshToken` cookie payload.
- **Security Context**: Valid Token Cookie.

**Returns**: `200 OK` - Refreshed `accessToken` in payload body.

---

## 5. Logout (`POST /api/auth/logout`)
Permanently terminates the database state for the targeted `refreshToken` securing the logout state universally across that session ID.
- **Security Context**: Valid Token Cookie.

**Returns**: `200 OK` - Client instructed to scrub token cookies.

---

## 6. Profile Context (`GET /api/auth/me`)
Retrieves structured profile details masking sensitive hashes.
- **Security Context**: Secure Header (`Authorization: Bearer <accessToken>`).

**Returns**: `200 OK` - Bounded `user` entity representation without passwords/hashes.
