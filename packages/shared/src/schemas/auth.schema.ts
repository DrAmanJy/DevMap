import { z } from 'zod';

const emailValidation = z
  .string({ error: 'Email is required' })
  .email({ message: 'Please enter a valid email address' })
  .toLowerCase();

const passwordValidation = z
  .string({ error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .max(32, 'Password cannot exceed 32 characters');
const otpValidation = z.object({
  code: z.string().nullable(),
  otpExpiresAt: z.date().nullable(),
  sendOTPAt: z.date().nullable(),
});
export const userSchema = z.object({
  _id: z.string(),
  name: z.string().min(3).max(16).trim(),
  email: emailValidation,
  password: z.string(),
  role: z.enum(['owner', 'admin', 'user']).default('user'),
  avatar: z.string().url().nullable(),
  isVerified: z.boolean().default(false),
  otp: otpValidation,
  otpAttempts: z.number().int().min(0).max(5),
  refreshToken: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const registerSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .min(3, 'Name must be at least 3 characters')
    .max(16, 'Name cannot exceed 16 characters')
    .trim(),
  email: emailValidation,
  password: passwordValidation,
});

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const otpSchema = z.object({
  email: emailValidation,
  code: z
    .string({ error: 'OTP code is required' })
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must only contain numbers'),
});

export const resendOtpSchema = z.object({
  email: emailValidation,
});

export type User = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
