import type { PasteFileCreate } from "./files";

export interface PasteStore {
  files: Array<PasteFileCreate>;
  password?: string;
  expiry?: string;
  views?: number;
}

export interface MetaStore {
  currentFile: number;
}
