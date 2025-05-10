import { z } from 'zod';
import { Role } from '../../prisma/app/generated/prisma/client';

/**
 * Validation schemas for user routes using Zod
 */

// Profile schema for user profile operations
export const profileSchema = {
  body: z.object({
    bio: z.string().optional(),
    skills: z.array(z.string()).optional(),
    portfolio: z.array(z.string().url()).optional()
  })
};

// User update schema
export const updateUserSchema = {
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
    email: z.string().email().trim().toLowerCase().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters').optional()
  }),
  params: z.object({
    userId: z.string()
  })
};

// Get user by ID schema
export const getUserSchema = {
  params: z.object({
    userId: z.string()
  })
};

// Type definitions from zod schemas
export type ProfileInput = z.infer<typeof profileSchema.body>;
export type UpdateUserInput = z.infer<typeof updateUserSchema.body>;
export type UserIdParam = z.infer<typeof getUserSchema.params>;