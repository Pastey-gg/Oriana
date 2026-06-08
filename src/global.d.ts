/// <reference types="vite/client" />

interface Window {
  orianaApplyEditorTheme?: (theme: "light" | "dark") => Promise<void>;
}
