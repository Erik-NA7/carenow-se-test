import {
  Field as ChakraField,
  HStack,
  VStack,
  Stack,
  Box
} from "@chakra-ui/react"
import * as React from "react"

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props
    return (
      <ChakraField.Root
        ref={ref}
        {...rest}
        color="fg"
        gap={2}
        alignItems="start"
        flex={1}
      >
        {label && (
          <ChakraField.Label
            fontSize="normal"
            width={"max-content"}
            textWrap={"nowrap"}
            minWidth={100}
          >
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        <Stack minHeight="64px" width="100%" bg="white">
          {children}
          { helperText && (
            <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
          )}
          { errorText && (
            <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
          )}
        </Stack>
      </ChakraField.Root>
    )
  },
)
