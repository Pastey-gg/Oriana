import { defineConfig, presetAttributify, presetWind3 } from "unocss";


export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
  ],
  rules: [
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}em` })],
    [/^m-([.\d]+)$/, ([_, num]) => ({ padding: `${num}em` })],
  ],
  shortcuts: [],
});