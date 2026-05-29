import type { PasteFileResponse } from "./files";

export type PasteResponse = {
  id: string;
  created_at: string;
  views: number;
  expires_at?: string;
  remaining_views?: number;
  has_password: boolean;
  files: Array<PasteFileResponse>;
};
