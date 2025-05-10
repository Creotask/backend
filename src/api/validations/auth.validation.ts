import { z } from 'zod';
import { Role } from '../../prisma/app/generated/prisma/client';

/**
 * Validation schemas for authentication routes using Zod
 */

export const registerSchema = {
  body: z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    role: z.nativeEnum(Role).default(Role.FREELANCER)
  })
};

export const loginSchema = {
  body: z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string()
  })
};

export const refreshTokenSchema = {
  body: z.object({
    token: z.string()
  })
};

// Type definitions from zod schemas
export type RegisterInput = z.infer<typeof registerSchema.body>;
export type LoginInput = z.infer<typeof loginSchema.body>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema.body>;