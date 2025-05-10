import { z } from 'zod';
import { MembershipType } from '../../prisma/app/generated/prisma/client';

/**
 * Validation schemas for membership routes using Zod
 */

// Create/update membership schema
export const membershipSchema = {
  body: z.object({
    type: z.nativeEnum(MembershipType),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    perks: z.array(z.string()).optional()
  }),
  params: z.object({
    userId: z.string().optional()
  })
};

// Get membership by user ID schema
export const getMembershipSchema = {
  params: z.object({
    userId: z.string()
  })
};

// Type definitions from zod schemas
export type MembershipInput = z.infer<typeof membershipSchema.body>;
export type MembershipUserParam = z.infer<typeof getMembershipSchema.params>;