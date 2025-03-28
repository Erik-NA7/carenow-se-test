import { Request, Response } from 'express';
import { VisitDTO } from '@/dto/visit.dto';
import { database } from '@/db/sqlite';

// Create a new visit
export const createVisit = async (req: Request, res: Response) => {
  try {
    // Transform frontend data to DB format
    const toDB = VisitDTO.toDB(req.body);
    
    // Open connection
    database.open();

    database
      .prepare(`
        INSERT INTO patient_visit (patient_id, name, date, medications, treatments, cost)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .run(
        toDB.patient_id,
        toDB.name,
        toDB.date,
        toDB.medications,
        toDB.treatments,
        toDB.cost
      );

    // Send success reponse
    res.status(200).json({ success: true, message: 'Visit data saved'});
  } catch (error: unknown) {
    console.error(error) // Shall use logging in production   
    res.status(500).json({ success: false, message: 'Failed to save data' });
  } finally {
    // Close connection
    database.close();
  }
};