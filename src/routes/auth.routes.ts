import { Router } from 'express';
import { register, login, logout, refreshToken } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '../api/validations/auth.validation';

const router = Router();

// Authentication routes with validation
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken);

export default router;