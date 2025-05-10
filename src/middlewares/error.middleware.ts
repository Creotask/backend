import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { logger } from '../utils/logger';

/**
 * Custom error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    ip: req.ip,
    statusCode: err.statusCode || 500
  });

  // Handle HTTP errors
  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Validation Error',
      errors: err.errors
    });
  }

  // Handle Prisma errors
  if (err.code && err.code.startsWith('P')) {
    let statusCode = 500;
    let message = 'Database Error';

    // Handle common Prisma error codes
    switch (err.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Resource already exists';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Resource not found';
        break;
    }

    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Internal Server Error'
    : err.message || 'Something went wrong';

  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};