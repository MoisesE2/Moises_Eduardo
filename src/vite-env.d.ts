/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CV_PT_FILENAME?: string;
  readonly VITE_CV_EN_FILENAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
