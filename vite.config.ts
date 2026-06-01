import { defineConfig, type Plugin } from "vite";
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";
import { solidStart } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";

const isSolidPrismEditorModule = (id: string) => id.includes("/solid-prism-editor/dist/");

const prismLanguageSideEffects = (): Plugin => ({
  name: "prism-language-side-effects",
  apply: "build",
  transform(code, id) {
    if (!isSolidPrismEditorModule(id)) return null;

    return {
      code,
      map: null,
      moduleSideEffects: "no-treeshake",
    };
  },
});

export default defineConfig({
  plugins: [solidStart(), prismLanguageSideEffects(), UnoCSS(), nitro()],
});
