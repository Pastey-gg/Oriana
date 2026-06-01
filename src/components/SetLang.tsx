import { createOptions } from "@thisbeyond/solid-select";
import type { JSX } from "solid-js";
import { metaStore, pasteStore, setPasteStore } from "~/stores";
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
  let val = inp.value;

  if (!pasteStore.files[metaStore.currentFile]) {
    return;
  }

  if (!val) {
    val = "file.txt";
  }

  const lang = findLangByExt(val);
  setPasteStore("files", metaStore.currentFile, (prev) => ({ language: lang || prev.language, name: val }));
};

const onLangUpdate = (value: LangObj) => {
  if (!pasteStore.files[metaStore.currentFile]) {
    return;
  }

  if (!value) {
    return;
  }

  setPasteStore("files", metaStore.currentFile, { language: value.name });
};

// biome-ignore lint/suspicious/noExplicitAny: ...
const format = (value: LangObj, type: any, meta: any) => {
  return (
    <div class="langIn">
      {<value.icon />}
      <span>{value.name}</span>
    </div>
  );
};

const loadLangs = createOptions(LANGS, { format, extractText: (value: LangObj) => value.name });

const findLang = (): LangObj => {
  const name = pasteStore.files[metaStore.currentFile].language || "text";
  let lang = LANGS.find((l) => l.name === name);

  if (lang !== undefined) {
    return lang;
  }

  lang = LANGS.find((l) => l.name === findLangByExt(name));
  return lang || { name: "text", icon: TextIcon };
};

export { findLang, findLangByExt, format, loadLangs, onLangUpdate, onNameUpdate };
