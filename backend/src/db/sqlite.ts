import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

// data path
export const targetDb = join(process.cwd(), './src/db/db.sqlite');

// Initate DatabaseSync instance
export const database = new DatabaseSync(targetDb, { open: false });

