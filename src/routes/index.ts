import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

// Health check route
router.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Auth routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/users', auth, userRoutes);

export default router;