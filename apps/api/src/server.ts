import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDb from './lib/mongoDb.js';
import routes from './routes/index.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './utils/AppError.js';

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

// --- Status Check ---
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api/v1', routes);

// Handle unknown routes (Express 5 / path-to-regexp v8 requires a named wildcard)
app.all('/{*any}', () => {
  throw new AppError(
    'The requested path does not exist on this server.',
    404,
    'NOT_FOUND',
  );
});

app.use(errorHandler);

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
