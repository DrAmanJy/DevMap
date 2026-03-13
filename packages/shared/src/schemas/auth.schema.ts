import { z } from 'zod';

const emailValidation = z
  .string({ error: 'Email is required' })
  .email({ message: 'Please enter a valid email address' });

const passwordValidation = z
  .string({ error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .max(32, 'Password cannot exceed 32 characters');

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

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
