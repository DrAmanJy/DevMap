# Environment Variables

This document maps all required `.env` configuration keys required to successfully launch DevPath Tracker instances.

> **Security Warning:** NEVER commit your actual `.env` file to version control. Always utilize `.env.example` to track required keys.

## Backend (.env)

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Designated Node listener port. |
| `NODE_ENV` | `development` | Dictates strict CORS, logging verbs, and Cookie tunneling protocols. |
| `MONGO_URI` | `mongodb://localhost:27017/devpath` | Connection bridging string for Mongoose instance. |
| `JWT_ACCESS_SECRET` | `uuid_v4_string` | Cryptographic signature map for short-lived 15m stateless payloads. |
| `JWT_REFRESH_SECRET` | `uuid_v4_string` | Cryptographic signature map for 7d long-lived DB validated cookies. |
| `ACCESS_TOKEN_EXPIRY` | `15m` | Token string literal expiry mapping. |
| `REFRESH_TOKEN_EXPIRY` | `7d` | Token string literal expiry mapping. |
| `EMAIL_USER` | `youremail@gmail.com` | Verified SMTP dispatch address for SendGrid/Nodemailer. |
| `EMAIL_PASS` | `app_specific_password_xyz` | Exclusively generated App Password bypassing 2FA requirements for the SMTP transporter. |
| `CLIENT_URL` | `http://localhost:5173` | Defines explicit whitelist permission for Express `cors(...)` middleware matching. |

## Frontend (.env)

Vite explicitly utilizes the `VITE_` prefix to securely expose variables matching that naming scheme statically into the client compilation bundle.

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | The base URL routing strictly all Axios/Fetch calls originating from the React SPA payload to the API layer. |
