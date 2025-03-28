import { database } from "./sqlite";

// Patient Visit Table definition
const createVisitTable =`
  CREATE TABLE IF NOT EXISTS patient_visit(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    medications TEXT NOT NULL,
    treatments TEXT NOT NULL,
    cost REAL NOT NULL
  ) STRICT
`

// Initialization function
export function initDb() {
  try {
    // Open, Execute table creations, and close connection
    database.open()
    database.exec(createVisitTable);
    console.info('Database initialized successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  } finally {
    database.close();
  }
}