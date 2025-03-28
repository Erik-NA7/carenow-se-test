
// /api/visit endpoint
import { Router } from 'express';
import { createVisit } from '@/controller/visit';

const router = Router();

// POST method
router.post('/', createVisit);

export { router };