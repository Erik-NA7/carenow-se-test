// Visit Data type
export type VisitData = {
  patient_id: string
  name: string
  date: string
  medications: string[]
  treatments: string[]
  cost: string
}

// Visit Data Payload type for api call
export type VisitDataPayload = {
  patient_id: number
  name: string
  date: string
  medications: string[]
  treatments: string[]
  cost: number
}

// Response type for api call
export type ApiResponse = {
  success: boolean,
  message: string
}