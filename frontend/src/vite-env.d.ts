/// <reference types="vite/client" />

// Environment Variables (NEW)
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
  
// For CSS/SCSS modules
declare module '*.module.css' {
    const classes: { readonly [key: string]: string }
    export default classes
}

declare module '*.svg' {
    const content: string
    export default content
  }