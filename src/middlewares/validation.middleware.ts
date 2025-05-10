import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import createHttpError from 'http-errors';

/**
 * Middleware for validating request data against Zod schemas
 */
export const validate = (schema: Record<string, z.ZodType>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validate request body
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      // Validate URL parameters
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }

      // Validate query string parameters
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map(err => {
          return `${err.path.join('.')}: ${err.message}`;
        }).join(', ');
        
        return next(createHttpError(400, `Validation error: ${formattedErrors}`));
      }
      
      return next(error);
    }
  };
};