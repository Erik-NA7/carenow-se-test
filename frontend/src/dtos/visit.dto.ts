import { VisitData, VisitDataPayload } from "@/types/visit"

// Transform form data to payload data type
export const ToPayload = (data: VisitData): VisitDataPayload => {
  return {
    patient_id: Number(data.patient_id), // to number
    name: data.name.trim(),
    date: data.date.trim(),
    medications: data.medications,
    treatments: data.treatments,
    cost: Number(data.cost), // to number
  }
}