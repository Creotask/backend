import { z } from 'zod';

/**
 * Validation schemas for project routes using Zod
 */

// Create project schema
export const createProjectSchema = {
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    budget: z.number().positive('Budget must be a positive number'),
    deadline: z.string().datetime() // ISO format date string, converted to Date in validation
  })
};

// Update project schema
export const updateProjectSchema = {
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    budget: z.number().positive('Budget must be a positive number').optional(),
    deadline: z.string().datetime().optional(), // ISO format date string
    winnerId: z.string().optional()
  }),
  params: z.object({
    projectId: z.string()
  })
};

// Get project by ID schema
export const getProjectSchema = {
  params: z.object({
    projectId: z.string()
  })
};

// Type definitions from zod schemas
export type CreateProjectInput = z.infer<typeof createProjectSchema.body>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema.body>;
export type ProjectIdParam = z.infer<typeof getProjectSchema.params>;