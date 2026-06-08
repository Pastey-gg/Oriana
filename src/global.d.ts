/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_PASTEY_VERSION?: string;
  readonly VITE_ORIANA_VERSION?: string;
  readonly VITE_ORIANA_COMMIT?: string;
  readonly VITE_ORIANA_COMMIT_TIME?: string;
}

interface Window {
  orianaApplyEditorTheme?: (theme: "light" | "dark") => Promise<void>;
}
