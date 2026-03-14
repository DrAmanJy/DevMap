# Technologies Glossary

A quick reference for the precise stack dependencies driving the API Layer.

## Core Packages
- `express`: The underlying HTTP server orchestration web framework.
- `mongoose`: The ODM (Object Data Modeling) library mapping Node objects to MongoDB documents natively.
- `bcrypt`: C++ based binding handling mathematically secure hashing algorithms.
- `jsonwebtoken`: Mentoring and verifying the stateless Auth JWT string structures.
- `nodemailer`: Dispatching secure authenticated SMTP email sequences.
- `dotenv`: Exposing the `.env` configuration file into the Node global `process.env`.
- `cors`: Express middleware securing browser-enforced resource origins.
- `cookie-parser`: Middleware unlocking encoded Cookie parsing mapped safely into the `req.cookies` object.

## Development Tools
- `nodemon`: Employs file-watching natively triggering automated server process restarts during local development.
- `typescript` (Future Migration): Anticipated adoption mapping strict TS compiler behaviors into the application structure.
