import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

type AnyError = Error & {
  statusCode?: number;
  code?: string | number;
  keyValue?: Record<string, unknown>;
  name?: string;
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const isProd = process.env.NODE_ENV === 'production';
  const error = err as AnyError;

  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'Something went wrong on the server';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  }

  if (error instanceof ZodError) {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    const firstIssue = error.issues?.[0];
    message =
      (typeof firstIssue?.message === 'string' && firstIssue.message) ||
      'Invalid input data';
  }

  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof (error as AnyError).code === 'number' &&
    (error as AnyError).code === 11000 &&
    'keyValue' in error &&
    (error as AnyError).keyValue != null
  ) {
    statusCode = 409;
    errorCode = 'DUPLICATE_RESOURCE';
    const keyValue = (error as AnyError).keyValue as Record<string, unknown>;
    const field = Object.keys(keyValue)[0];
    message = `An account with that ${field} already exists.`;
  }

  // 4. JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorCode = 'INVALID_TOKEN';
    message = 'Your session token is invalid. Please log in again.';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    errorCode = 'TOKEN_EXPIRED';
    message = 'Your session has expired. Please log in again.';
  }

  if (!isProd) {
    console.error('ErrorHandler:', {
      path: req.path,
      method: req.method,
      statusCode,
      errorCode,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  const responseBody: {
    success: false;
    error: {
      code: string;
      message: string;
      stack?: string;
    };
  } = {
    success: false,
    error: {
      code: String(errorCode),
      message,
    },
  };

  if (!isProd && error instanceof Error && error.stack) {
    responseBody.error.stack = error.stack;
  }

  res.status(statusCode).json(responseBody);
};
