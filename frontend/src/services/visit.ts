// Visit service
import { ApiResponse, VisitDataPayload } from "@/types/visit"

// Create
export const createVisit = async (data: VisitDataPayload): Promise<ApiResponse> => {
  try {
    const submit = await fetch('http://localhost:5000/api/visit', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res  = await submit.json()
    return res
  } catch (error) {
    return {
      success: false,
      message: 'Ahh we run into problem'
    }
  } 
}