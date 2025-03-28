import {
    Button,
    Fieldset,
    InputGroup,
    NumberInput,
    Stack,
} from "@chakra-ui/react"
import { Field } from "./field";
import { Input } from "../ui/input";
import { toaster, Toaster } from "../ui/toaster";
import MultipleSelection from "./MultipleSelection"
import { Controller, useForm, SubmitHandler, SubmitErrorHandler, set } from "react-hook-form"
import { ApiResponse, usePatientForm } from "@/hooks/usePatientForm";
import { medicationOptions, treatMentOptions } from "./dummies";
import { BaseSyntheticEvent, useState } from "react";

type FormValues = {
  patient_id: number | null
  name: string
  date: string
  medications: string[]
  treatments: string[]
  cost: number | null
}

const PatientForm = () => {
  const [ saving, setSaving ] = useState<boolean>(false)
  const [ toasty, setToasty ] = useState({
    title: '',
    type: ''
  })
  // const { control, register, handleSubmit, errors, trigger, saving } = usePatientForm()

  const { control, formState: { errors }, trigger, register, handleSubmit } = useForm<FormValues>({
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
  
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      setSaving(true)
      const submit = await fetch('http://localhost:5000/api/visit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res  = await submit.json()
      console.log('res', res)
      toaster.create({
        title: res.message,
        type: res.success ? 'success' : 'error'
      })
    } catch (error) {
      toaster.create({
        title: 'Ahhh we run into problem',
        type: 'error'
      })
    } finally {
      setSaving(false)
    }
  }

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.log(errors)
    toaster.create({
      title: "Something Wrong",
      type: "error",
    })
  }

  const handleFormSubmit = async (e: BaseSyntheticEvent<object, any, any> | undefined) => {
    const isValid = await trigger()
    if (!isValid) return
    handleSubmit(onSubmit, onError)(e).catch((error) => {
      console.log(error)
    })
  }
  
  // const toast = (message: string) => {
  //   // const toasterType = isError ? 'error' : 'success'
  //   // console.log(toasterType, message)
  //   toaster.create({
  //     title: message,
  //     type: toasterType,
  //   })
  // }

  return (
    <Fieldset.Root maxWidth="sm" bg="white" p={6} borderRadius={4}>
      <Stack gap={8} colorScheme="light">
        <Fieldset.Legend
          fontSize="2xl"
          fontWeight="semibold"
          color="black"
          marginBottom={4}
        >
          Patient Visit Form
        </Fieldset.Legend>
        <Field
          required
          invalid={!!errors.name}
          errorText={errors.name?.message}
          label="Patien Name"
        >
          <Input
            type="text"
            { ...register('name')}
          />
        </Field>

        <Field
          required
          invalid={!!errors.patient_id}
          errorText={errors.patient_id?.message}
          label="Patient ID"
        >
          <NumberInput.Root>
            <NumberInput.Input
              { ...register('patient_id')}
              borderColor="gray.300"
              focusRing="inside"
              focusRingColor="brand.300"
              focusRingOffset="1"
              />
          </NumberInput.Root>
        </Field>

        <Field
          required
          invalid={!!errors.date}
          errorText={errors.date?.message}
          label="Date"
        >
          <Input
            type="date"
            { ...register('date')}
          />
        </Field>
        
        <Field
          required
          invalid={!!errors.medications}
          errorText={errors.medications?.message}
          label="Medications"
        >
          <Controller
            name="medications"
            control={control}
            render={({ field }) => (
              <MultipleSelection
                options={medicationOptions}
                name="medications"
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
        </Field>

        <Field
          required
          invalid={!!errors.treatments}
          errorText={errors.treatments?.message}
          label="Treatments"
        >
          <Controller
            name="treatments"
            control={control}
            render={({ field }) => (
              <MultipleSelection
                options={treatMentOptions}
                name="treatments"
                value={field.value || []}
                onSelect={field.onChange}
              />
            )}
          />
        </Field>

        <Field
          required
          invalid={!!errors.cost}
          errorText={errors.cost?.message}
          label="Cost"
        >
          <NumberInput.Root>
            <InputGroup startElement="Rp">
              <NumberInput.Input
                { ...register('cost')}
                borderColor="gray.300"
                focusRing="inside"
                focusRingColor="brand.300"
                focusRingOffset="1"
              />
            </InputGroup>
          </NumberInput.Root>
        </Field>
      </Stack>

      <Button
        type="submit"
        alignSelf="flex-start"
        backgroundColor="brand.900"
        rounded="full"
        color="white"
        width="100%"
        marginTop={8}
        fontWeight="semibold"
        onClick={(e) => handleFormSubmit(e)}
        loading={saving}
        loadingText="Saving..."
      >
        Save
      </Button>
      <Toaster />
    </Fieldset.Root>
  )
}
  
export default PatientForm