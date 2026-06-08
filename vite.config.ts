import path from "node:path";
import UnoCSS from "unocss/vite";
import { defineConfig, type Plugin } from "vite";
import solid from "vite-plugin-solid";

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
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [solid(), prismLanguageSideEffects(), UnoCSS()],
});
