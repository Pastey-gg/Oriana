import type { PasteFileCreate } from "./files";

export interface PasteStore {
  files: Array<PasteFileCreate>;
  password?: string;
  expiry?: number;
  views?: number;
}

export interface MetaStore {
  currentFile: number;
  font: string;
  fontSize: string;
  wordWrap: boolean;
  ligatures: boolean;
  guidelines: boolean;
  lineNumbers: boolean;
}
