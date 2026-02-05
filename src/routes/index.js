import { Router } from 'express';
import { default as userRoutes } from './userRoute.js';

const router = Router();

router.use('/users', userRoutes);

export default router;
