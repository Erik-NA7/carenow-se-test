import { VisitData } from '@/types/visit'
import { useForm } from 'react-hook-form'

// Form Hook
export const usePatientForm = () => {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<VisitData>({
    defaultValues: {
      patient_id: '',
      name: '',
      date: '',
      medications: [],
      treatments: [],
      cost: '',
    },
    // Validations
    resolver: async (data) => {
      const errors: Record<string, { message: string }> = {}
      if (!data.name) {
        errors.name = { message: "Patient name is required" }
      }
        
      if (!data.patient_id || isNaN(Number(data.patient_id)) || Number(data.patient_id) === 0) {
        errors.patient_id = { message: "Patient Id must be a positive number" }
      }

      if (!data.date) {
        errors.date = { message: "Treatment date is required" }
      }
      
      if (!data.medications || data.medications.length === 0) {
        errors.medications = { message: "At least one medication is required" }
      }
      
      if (!data.treatments || data.treatments.length === 0) {
        errors.treatments = { message: "At least one treatment is required" }
      }

      if (!data.cost || isNaN(Number(data.cost)) || Number(data.cost) === 0) {
        errors.cost = { message: "Cost must be a positive number" }
      }
            
      return { values: data, errors }
    },
  })

  return {
    control,
    register,
    handleSubmit,
    errors,
    trigger,
  }
}