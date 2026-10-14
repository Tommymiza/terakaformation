/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  /** Ancien nom (Create React App), toujours accepté. */
  readonly REACT_APP_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
