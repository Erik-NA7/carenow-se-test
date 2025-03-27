import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

export const Input = (props: InputProps) => {
    return (
        <ChakraInput
            borderColor="gray.300"
            focusRing="inside"
            focusRingColor="brand.300"
            focusRingOffset="1"
            overflow="hidden"
            textOverflow="ellipsis"
            {...props}
        />
    )
}