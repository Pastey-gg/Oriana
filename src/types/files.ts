type PasteFileResponse = {
  id: string;
  character_count: number;
  line_count: number;
  name?: string;
  language?: string;
  content: string;
};
