import {
    Button,
    Fieldset,
    InputGroup,
    NumberInput,
    Stack,
} from "@chakra-ui/react"
import { Field } from "./field";
import { Input } from "../ui/input";
import MultipleSelection from "./MultipleSelection"
import { Controller } from "react-hook-form"
import { usePatientForm } from "@/hooks/usePatientForm";
import { medicationOptions, treatMentOptions } from "./dummies";

const PatientForm = () => {

  const { control, register, handleSubmit, errors } = usePatientForm()

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
          invalid={!!errors.id}
          errorText={errors.id?.message}
          label="Patient ID"
        >
          <NumberInput.Root>
            <NumberInput.Input
              { ...register('id')}
              borderColor="gray.300"
              focusRing="inside"
              focusRingColor="brand.300"
              focusRingOffset="1"
              />
          </NumberInput.Root>
        </Field>

        <Field
          required
          invalid={!!errors.treatmentDate}
          errorText={errors.treatmentDate?.message}
          label="Date"
        >
          <Input
            type="date"
            { ...register('treatmentDate')}
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
          invalid={!!errors.treatmentCost}
          errorText={errors.treatmentCost?.message}
          label="Cost"
        >
          <NumberInput.Root>
            <InputGroup startElement="Rp">
              <NumberInput.Input
                { ...register('treatmentCost')}
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
        color="fg"
        width="100%"
        marginTop={8}
        fontWeight="semibold"
        onClick={handleSubmit()}
      >
        Submit
      </Button>
    </Fieldset.Root>
  )
}
  
export default PatientForm