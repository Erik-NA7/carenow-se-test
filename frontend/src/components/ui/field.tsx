import {
  Field as ChakraField,
  Container,
} from "@chakra-ui/react"
import * as React from "react"

// Reusable closed Form Field Component
export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
  htmlFor?: string
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, htmlFor, ...rest } =
      props

    return (
      <ChakraField.Root
        ref={ref}
        {...rest}
        gap={2}
        justifyContent="flex-start"
        flex={1}
        orientation="horizontal"
        color="brand"
      >
        {/* Field Label */}
        {label && (
          <ChakraField.Label
            fontSize="normal"
            width={"max-content"}
            textWrap={"nowrap"}
            minWidth={100}
            htmlFor={htmlFor}
          >
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        <Container
          width="100%"
          position="relative"
          p="0"
          justifyContent="flex-start"
        >
          {/* The actual input field */}
          {children}

          {/* Helper text if provided*/}
          { helperText && (
            <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
          )}

          {/* Error text if provided*/}
          { errorText && (
            <ChakraField.ErrorText
              position="absolute"
              left ="0"
              bottom="-20px"
            >
              {errorText}
            </ChakraField.ErrorText>
          )}
        </Container>
      </ChakraField.Root>
    )
  },
)
