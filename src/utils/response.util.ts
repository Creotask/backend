import { Response } from 'express';

/**
 * Standard response format for API responses
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Utility class for standardizing API responses
 */
export class ResponseUtil {
  /**
   * Send a success response
   */
  static success<T>(
    res: Response,
    data?: T,
    message = 'Success',
    statusCode = 200
  ): Response {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data
    });
  }

  /**
   * Send an error response
   */
  static error(
    res: Response,
    message = 'Error',
    statusCode = 400,
    errors?: Record<string, string>
  ): Response {
    return res.status(statusCode).json({
      status: 'error',
      message,
      errors
    });
  }

  /**
   * Send a not found response
   */
  static notFound(
    res: Response,
    message = 'Resource not found'
  ): Response {
    return this.error(res, message, 404);
  }

  /**
   * Send an unauthorized response
   */
  static unauthorized(
    res: Response,
    message = 'Unauthorized access'
  ): Response {
    return this.error(res, message, 401);
  }

  /**
   * Send a forbidden response
   */
  static forbidden(
    res: Response,
    message = 'Forbidden'
  ): Response {
    return this.error(res, message, 403);
  }

  /**
   * Send a server error response
   */
  static serverError(
    res: Response,
    message = 'Internal server error'
  ): Response {
    return this.error(res, message, 500);
  }
}