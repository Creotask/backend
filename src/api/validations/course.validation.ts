import { z } from 'zod';

/**
 * Validation schemas for course routes using Zod
 */

// Create course schema
export const createCourseSchema = {
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    level: z.string(),
    contentUrl: z.string().url('Content URL must be a valid URL')
  })
};

// Update course schema
export const updateCourseSchema = {
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    level: z.string().optional(),
    contentUrl: z.string().url('Content URL must be a valid URL').optional()
  }),
  params: z.object({
    courseId: z.string()
  })
};

// Get course by ID schema
export const getCourseSchema = {
  params: z.object({
    courseId: z.string()
  })
};

// User course enrollment schema
export const enrollCourseSchema = {
  body: z.object({
    courseId: z.string()
  })
};

// Update user course schema
export const updateUserCourseSchema = {
  body: z.object({
    completed: z.boolean()
  }),
  params: z.object({
    courseId: z.string()
  })
};

// Type definitions from zod schemas
export type CreateCourseInput = z.infer<typeof createCourseSchema.body>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema.body>;
export type CourseIdParam = z.infer<typeof getCourseSchema.params>;
export type EnrollCourseInput = z.infer<typeof enrollCourseSchema.body>;
export type UpdateUserCourseInput = z.infer<typeof updateUserCourseSchema.body>;