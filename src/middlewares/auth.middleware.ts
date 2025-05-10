import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { config } from '../config';
import { prisma } from '../utils/prisma';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Authentication middleware to protect routes
 */
export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Get token from the authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createHttpError(401, 'Not authenticated. No token provided'));
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      role: string;
    };
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true }
    });
    
    if (!user) {
      return next(createHttpError(401, 'User no longer exists'));
    }
    
    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createHttpError(401, 'Invalid token'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(createHttpError(401, 'Token expired'));
    }
    next(error);
  }
};

/**
 * Authorization middleware for role-based access control
 */
export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createHttpError(401, 'Not authenticated'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, 'Not authorized to access this resource'));
    }
    
    next();
  };
};