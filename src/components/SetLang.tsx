import { createOptions } from "@thisbeyond/solid-select";
import type { JSX } from "solid-js";
import { draftStore, pasteStore, setPasteStore } from "~/stores";
import TextIcon from "~/svgs/langs/text";
import { EXTS, LANGS, type LangObj } from "~/utils";

const findLangByExt = (name: string): string => {
  const splat = name.split(".");
  const ext = splat[splat.length - 1];

  const lang: string | undefined = EXTS[`.${ext}`];
  return lang || "text";
};

const onNameUpdate: JSX.ChangeEventHandler<HTMLInputElement, Event> = (event) => {
  const inp = event.currentTarget;
  const val = inp.value;

  if (!pasteStore.files[draftStore.currentFile]) {
    return;
  }

  const lang = findLangByExt(val);
  setPasteStore("files", draftStore.currentFile, (prev) => ({ language: lang || prev.language, name: val }));
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

const resolveLang = (language?: string): LangObj => {
  const name = language || "text";
  let lang = LANGS.find((l) => l.name === name);

  if (lang !== undefined) {
    return lang;
  }

  lang = LANGS.find((l) => l.name === findLangByExt(name));
  return lang || { name: "text", icon: TextIcon };
};

const findLang = (): LangObj => resolveLang(pasteStore.files[draftStore.currentFile]?.language);

export { findLang, findLangByExt, format, loadLangs, onLangUpdate, onNameUpdate, resolveLang };
