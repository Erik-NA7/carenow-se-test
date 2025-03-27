import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  name: string;
  id: number | null;
  treatmentDate: string;
  medications: string[];
  treatments: string[];
  treatmentCost: number | null;
};

export const usePatientForm = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            id: null,
            treatmentDate: '',
            medications: [],
            treatments: [],
            treatmentCost: null,
        },
        resolver: async (data) => {
            const errors: Record<string, { message: string }> = {}
            if (!data.name) {
                errors.name = { message: "Patient name is required" }
            }
              
            if (!data.id) {
                errors.id = { message: "Id is required and must be numeric" }
            }

            if (!data.treatmentDate) {
                errors.treatmentDate = { message: "Treatment date is required" }
            }
            
            if (!data.medications || data.medications.length === 0) {
                errors.medications = { message: "At least one medication is required" }
            }
            
            if (!data.treatments || data.treatments.length === 0) {
                errors.treatments = { message: "At least one treatment is required" }
            }

            if (!data.treatmentCost || !Number(data.treatmentCost)) {
                errors.treatmentCost = { message: "Treatment cost is required" }
            }
             
            return { values: data, errors }
        },
    });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return {
    control,
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
  };
};