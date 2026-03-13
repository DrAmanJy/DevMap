import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDb from './lib/mongoDb.js';

const PORT = Number(process.env.PORT) || 3001;

const app: Application = express();

// --- Middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json({ limit: '2kb' }));
app.use(cookieParser());

// --- Health Check ---
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      'Critical: Server failed to start due to DB connection error.',
    );
    process.exit(1);
  }
})();
