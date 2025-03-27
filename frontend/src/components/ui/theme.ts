import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react"

const config = defineConfig({
  globalCss: {
    body: {
      bg: "#fcebf1",
      color: "gray.800",
      margin: "0",
      display: "flex",
      placeItems: "center",
      fontFamily: "Lato, sans-serif"
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fcebf1" },
          200: { value: "#f5b2c8" },
          100: { value: "#f9d6e3" },
          300: { value: "#f08eac" },
          400: { value: "#ec6b91" },
          500: { value: "#e84775" },
          600: { value: "#e53c6e" },
          700: { value: "#e5326a" },
          800: { value: "#e73873" },
          900: { value: "#d42a5d" } 
        },
      }
    }
  }
})

export const system = createSystem(defaultConfig, config)