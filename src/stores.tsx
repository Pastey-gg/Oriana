import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";
import type { DraftStore, MetaStore, PasteStore } from "./types/stores";

export const [pasteStore, setPasteStore] = createStore<PasteStore>({
  files: [{ content: "", language: "auto"}],
});

export const [draftStore, setDraftStore] = createStore<DraftStore>({
  currentFile: 0,
});

export const [metaStore, setMetaStore] = makePersisted(
  createStore<MetaStore>({
    font: "monospace",
    fontSize: "default",
    wordWrap: false,
    ligatures: false,
    guidelines: true,
    lineNumbers: true,
  }),
  { name: "pasteyMetaStore" },
);
