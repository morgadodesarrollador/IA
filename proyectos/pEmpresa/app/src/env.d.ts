interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY?: string
  // Vite define `import.meta.env.DEV` automáticamente, pero la tipamos aquí
  readonly DEV?: boolean
  // Permite activar el debug desde .env: VITE_SHOW_DEBUG=true
  readonly VITE_SHOW_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
