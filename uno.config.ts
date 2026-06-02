import { defineConfig, presetAttributify } from "unocss";

export default defineConfig({
  presets: [presetAttributify()],
  rules: [
    [/^w-([.\d]+)$/, ([_, num]) => ({ width: `${num}rem` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}em` })],
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}em` })],
    [/^fs-([.\d]+)$/, ([_, num]) => ({ "font-size": `${num}em` })],
    [/^gap-([.\d]+)$/, ([_, num]) => ({ gap: `${num}em` })],
    ["fb", { "font-weight": 600 }],
    ["feb", { "font-weight": 700 }],
    ["flex", { display: "flex" }],
    ["flexc", { display: "flex", "flex-direction": "column" }],
    ["flexr", { display: "flex", "flex-direction": "row!important" }],
    [/^ac-(start|end|center)$/, ([_, align]) => ({ "align-content": `${align}` })],
    [/^ai-(start|end|center)$/, ([_, align]) => ({ "align-items": `${align}` })],
    [/^as-(start|end|center)$/, ([_, align]) => ({ "align-self": `${align}` })],
    ["mta", { "margin-left": "auto" }],
    ["mra", { "margin-left": "auto" }],
    ["mba", { "margin-left": "auto" }],
    ["mla", { "margin-left": "auto" }],
  ],
});
