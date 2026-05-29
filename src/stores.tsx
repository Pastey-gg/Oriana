import { createStore } from "solid-js/store";
import type { MetaStore, PasteStore } from "./types/stores";

export const [pasteStore, setPasteStore] = createStore<PasteStore>({
  files: [{ content: "" }],
});

export const [metaStore, setMetaStore] = createStore<MetaStore>({
  currentFile: 0,
});
