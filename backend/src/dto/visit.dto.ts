export class VisitDTO {
  constructor(
    public readonly patient_id: number,
    public readonly name: string,
    public readonly date: string,
    public readonly medications: string[],
    public readonly treatments: string[],
    public readonly cost: number
  ) {}

  // Convert from database format (string) to frontend format (array)
  static fromDB(row: {
    patient_id: number;
    name: string;
    date: string;
    medications: string;
    treatments: string;
    cost: number;
  }): VisitDTO {
    return new VisitDTO(
      row.patient_id,
      row.name,
      row.date,
      this.parseStringToArray(row.medications),
      this.parseStringToArray(row.treatments),
      row.cost
    );
  }

  // Convert from frontend format to database format
  static toDB(visit: VisitDTO): {
    patient_id: number;
    name: string;
    medications: string;
    treatments: string;
    date: string;
    cost: number;
  } {
    return {
      patient_id: visit.patient_id,
      name: visit.name,
      date: visit.date,
      medications: this.arrayToString(visit.medications),
      treatments: this.arrayToString(visit.treatments),
      cost: visit.cost
    };
  }

  // Helper: Convert array to string for DB storage
  private static arrayToString(arr: string[]): string {
    return JSON.stringify(arr);
  }

  // Helper: Convert string back to array
  private static parseStringToArray(str: string): string[] {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
}