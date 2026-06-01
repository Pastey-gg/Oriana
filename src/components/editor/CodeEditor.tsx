import type { Component } from "solid-js";
import { Editor, type Extension, type PrismEditor } from "solid-prism-editor";

interface Props {
  extensions: Extension[];
  language: string;
  value: string;
  id: string;
  name: string;
  readOnly?: boolean;
  onUpdate?: (value: string) => void;
}

const CodeEditor: Component<Props> = (props) => {
  const setFieldAttrs = (editor: PrismEditor) => {
    editor.textarea.id = props.id;
    editor.textarea.name = props.name;
  };

  return (
    <Editor
      extensions={props.extensions}
      language={props.language}
      readOnly={props.readOnly}
      value={props.value}
      onUpdate={props.onUpdate}
      onMount={setFieldAttrs}
    />
  );
};

export default CodeEditor;
