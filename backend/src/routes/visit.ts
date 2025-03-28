
import { Router } from 'express';
import { createVisit } from '@/controller/visit';

const router = Router();

router.post('/', createVisit);

export { router };