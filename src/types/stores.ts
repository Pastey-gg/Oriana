import type { PasteFileCreate } from "./files";

export interface PasteStore {
  files: Array<PasteFileCreate>;
  password?: string;
  expiry?: number;
  views?: number;
}

export interface MetaStore {
  currentFile: number;
}
