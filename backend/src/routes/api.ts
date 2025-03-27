
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from TypeScript Express!' });
});

// Add more routes here
export { router };