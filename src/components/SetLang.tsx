import { createOptions } from "@thisbeyond/solid-select";
import hljs from "highlight.js/lib/core";
import clang from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import golang from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import jsonlang from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import type { JSX } from "solid-js";
import { draftStore, pasteStore, setPasteStore } from "~/stores";
import FaSolidWandMagicSparkles from "~/svgs/langs/magic";
import type { PasteFileCreate, PasteFileResponse } from "~/types/files";
import { EXTS, LANGS, type LangObj } from "~/utils";

hljs.registerLanguage("c", clang);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("css", css);
hljs.registerLanguage("go", golang);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", jsonlang);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("python", python);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

const findLangByExt = (name: string): string => {
  const splat = name.split(".");
  const ext = splat[splat.length - 1];

  const lang: string | undefined = EXTS[`.${ext}`];
  return lang || "auto";
};

const onNameUpdate: JSX.ChangeEventHandler<HTMLInputElement, Event> = (event) => {
  const inp = event.currentTarget;
  const val = inp.value;

  if (!pasteStore.files[draftStore.currentFile]) {
    return;
  }

  const lang = findLangByExt(val);
  const filtered = val.replace(/[^a-zA-Z0-9_.-]/g, "");
  inp.value = filtered;

  setPasteStore("files", draftStore.currentFile, (prev) => ({ language: lang || prev.language, name: filtered }));
};

const onLangUpdate = (value: LangObj) => {
  if (!pasteStore.files[draftStore.currentFile]) {
    return;
  }

  if (!value) {
    return;
  }

  setPasteStore("files", draftStore.currentFile, { language: value.name });
};

const format = (value: LangObj) => {
  return (
    <div class="langIn">
      {<value.icon />}
      <span>{value.name}</span>
    </div>
  );
};

const loadLangs = createOptions(LANGS, { format, extractText: (value: LangObj) => value.name });

const autoLang = (): LangObj => ({ name: "auto", icon: FaSolidWandMagicSparkles });

const resolveLangName = (name: string): LangObj => LANGS.find((lang) => lang.name === name) ?? autoLang();

const resolveLang = (file: PasteFileCreate | PasteFileResponse): LangObj => {
  if (!file) {
    return autoLang();
  }

  const name = file.language || "auto";
  let lang = LANGS.find((l) => l.name === name);

  if (lang !== undefined && lang.name !== "auto" && lang.name !== "text") {
    return lang;
  }

  if (file.name) {
    lang = LANGS.find((l) => l.name === findLangByExt(file.name!));
    if (lang && lang.name !== "auto") {
      return lang;
    }
  }

  if ((name === "auto" || name === "text") && file.content.length >= 10) {
    const auto = hljs.highlightAuto(file.content);
    lang = LANGS.find((l) => l.name === auto.language);
    if (lang) {
      return lang;
    }
  }

  return lang || autoLang();
};

const findLang = (file: PasteFileResponse | PasteFileCreate): LangObj => resolveLang(file);

export { findLang, findLangByExt, format, loadLangs, onLangUpdate, onNameUpdate, resolveLang, resolveLangName };
