import { Router } from 'express';
import { getProfile, updateProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// User profile routes - accessible by authenticated users for their own profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Admin routes - only accessible by admins
router.get('/', restrictTo('ADMIN'), getAllUsers);
router.get('/:id', restrictTo('ADMIN'), getUserById);
router.put('/:id', restrictTo('ADMIN'), updateUser);
router.delete('/:id', restrictTo('ADMIN'), deleteUser);

export default router;