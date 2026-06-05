import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";
import type { MetaStore, PasteStore } from "./types/stores";

export const [pasteStore, setPasteStore] = createStore<PasteStore>({
  files: [{ content: "" }],
});

export const [metaStore, setMetaStore] = makePersisted(
  createStore<MetaStore>({
    currentFile: 0,
    font: "monospace",
    fontSize: "default",
    wordWrap: false,
    ligatures: false,
    guidelines: true,
    lineNumbers: true,
  }),
  { name: "pasteyMetaStore" },
);
