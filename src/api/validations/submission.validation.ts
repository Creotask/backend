import { z } from 'zod';

/**
 * Validation schemas for submission routes using Zod
 */

// Create submission schema
export const createSubmissionSchema = {
  body: z.object({
    projectId: z.string(),
    contentUrl: z.string().url('Content URL must be a valid URL')
  })
};

// Update submission schema
export const updateSubmissionSchema = {
  body: z.object({
    contentUrl: z.string().url('Content URL must be a valid URL').optional(),
    isWinner: z.boolean().optional()
  }),
  params: z.object({
    submissionId: z.string()
  })
};

// Get submission by ID schema
export const getSubmissionSchema = {
  params: z.object({
    submissionId: z.string()
  })
};

// Get submissions for project schema
export const getProjectSubmissionsSchema = {
  params: z.object({
    projectId: z.string()
  })
};

// Type definitions from zod schemas
export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema.body>;
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema.body>;
export type SubmissionIdParam = z.infer<typeof getSubmissionSchema.params>;
export type ProjectSubmissionsParam = z.infer<typeof getProjectSubmissionsSchema.params>;