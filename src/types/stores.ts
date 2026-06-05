import type { PasteFileCreate } from "./files";

export interface PasteStore {
  files: Array<PasteFileCreate>;
  password?: string;
  expiry?: number;
  views?: number;
}

export interface DraftStore {
  currentFile: number;
}

export interface MetaStore {
  font: string;
  fontSize: string;
  wordWrap: boolean;
  ligatures: boolean;
  guidelines: boolean;
  lineNumbers: boolean;
}
