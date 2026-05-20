import { defineConfig, presetAttributify } from "unocss";

export default defineConfig({
  presets: [presetAttributify()],
  rules: [
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}em` })],
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}em` })],
    [/^fs-([.\d]+)$/, ([_, num]) => ({ "font-size": `${num}em` })],
    [/^gap-([.\d]+)$/, ([_, num]) => ({ gap: `${num}em` })],
    ["fb", { "font-weight": 600 }],
    ["feb", { "font-weight": 700 }],
    ["flex", { display: "flex" }],
    ["flexc", { display: "flex", "flex-direction": "column" }],
    [/^ac-(start|end|center)$/, ([_, align]) => ({ "align-content": `${align}` })],
    [/^ai-(start|end|center)$/, ([_, align]) => ({ "align-items": `${align}` })],
  ],
});
