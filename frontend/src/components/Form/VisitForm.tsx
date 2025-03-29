import { useState } from "react"
import {
    Button,
    Fieldset,
    InputGroup,
    NumberInput,
    Stack,
} from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { MultipleSelection} from "@/components/ui/checkboxes"
import { toaster, Toaster } from "@/components/ui/toaster"
import { Controller, SubmitHandler } from "react-hook-form"
import { usePatientForm } from "@/hooks/useVisitForm"
import { medicationOptions, treatMentOptions } from "./dummies"
import { createVisit } from "@/services/visit"
import { VisitData } from "@/types/visit"
import { ToPayload } from "@/dtos/visit.dto"

export const VisitForm = () => {
  // Loading state
  const [ saving, setSaving ] = useState<boolean>(false)

  // Form hook
  const { control, register, handleSubmit, errors } = usePatientForm()
  
  // Form submit handler => api call
  const onSubmit: SubmitHandler<VisitData> = async (data: VisitData) => {
    try {
      // Activate loading
      setSaving(true)
      const res = await createVisit(ToPayload(data))
      
      // Show toast
      toaster.create({
        title: res.message,
        type: res.success ? 'success' : 'error'
      })
    } catch (error) {
      // Show error toast
      toaster.create({
        title: 'Ahhh we run into problem',
        type: 'error'
      })
    } finally {
      // Deactivate loading
      setSaving(false)
    }
  }

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
        
        {/* Patient Name field */}
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

        {/* Patient ID field */}
        <Field
          required
          invalid={!!errors.patient_id}
          errorText={errors.patient_id?.message}
          label="Patient ID"
        >
          <NumberInput.Root min={0}>
            <NumberInput.Input
              { ...register('patient_id')}
              borderColor="gray.300"
              focusRing="inside"
              focusRingColor="brand.300"
              focusRingOffset="1"
              />
          </NumberInput.Root>
        </Field>

        {/* Date field */}
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
        
        {/* Medications field */}
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

        {/* Treatments field */}
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

        {/* Cost field */}
        <Field
          required
          invalid={!!errors.cost}
          errorText={errors.cost?.message}
          label="Cost"
        >
          <NumberInput.Root min={0}>
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

      {/* Submit button */}
      <Button
        type="submit"
        alignSelf="flex-start"
        backgroundColor="brand.900"
        rounded="full"
        color="white"
        width="100%"
        marginTop={8}
        fontWeight="semibold"
        onClick={handleSubmit(onSubmit)}
        loading={saving}
        loadingText="Saving..."
      >
        Save
      </Button>
      <Toaster />
    </Fieldset.Root>
  )
}
  