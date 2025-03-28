import './path-setup'
import { app } from './app';
import { initDb } from '@/db/init';

const PORT = process.env.PORT || 5000;

try {
  initDb();
  app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`);
  });
} catch (error: unknown) {
  if (error instanceof Error ) {
    console.error('Failed to start server: ', error.message);
  }
  process.exit(1);
}