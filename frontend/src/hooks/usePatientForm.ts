import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormValues = {
  patient_id: number | null
  name: string
  date: string
  medications: string[]
  treatments: string[]
  cost: number | null
}

export type ApiResponse = {
  success: boolean
  message: string
}

export const usePatientForm = () => {
  const [ saving, setSaving ] = useState<boolean>(false)

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
        patient_id: null,
        name: '',
        date: '',
        medications: [],
        treatments: [],
        cost: null,
    },
    resolver: async (data) => {
      const errors: Record<string, { message: string }> = {}
      if (!data.name) {
          errors.name = { message: "Patient name is required" }
      }
        
      if (!data.patient_id) {
          errors.patient_id = { message: "Id is required and must be numeric" }
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

      if (!data.cost || !Number(data.cost)) {
          errors.cost = { message: "Treatment cost is required" }
      }
            
      return { values: data, errors }
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setSaving(true)
      return await fetch('http://localhost:5000/api/visit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`)
      // }
      // return await res.json()
    } catch (error) {
      throw error
    } finally {
      setSaving(false)
    }
  }


  return {
    control,
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
    trigger,
    saving
  }
}