import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

// Instantiate Prisma client
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log prisma query events in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Duration: ${e.duration}ms`);
  });
}

// Log prisma errors
prisma.$on('error', (e: any) => {
  logger.error(`Prisma Error: ${e.message}`);
});

export { prisma };