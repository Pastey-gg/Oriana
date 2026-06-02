import { createMemo, type Component } from "solid-js";
import { Editor, type Extension, type PrismEditor } from "solid-prism-editor";
import { defaultCommands } from "solid-prism-editor/commands";

interface Props {
  extensions: Extension[];
  language: string;
  value: string;
  id: string;
  name: string;
  readOnly?: boolean;
  ariaLabel?: string;
  onUpdate?: (value: string) => void;
}

const CodeEditor: Component<Props> = (props) => {
  const effectiveExtensions = createMemo(() => {
    if (props.readOnly) return props.extensions;
    return [defaultCommands(), ...props.extensions];
  });

  const setFieldAttrs = (editor: PrismEditor) => {
    editor.textarea.id = props.id;
    editor.textarea.name = props.name;
    editor.textarea.setAttribute("aria-label", props.ariaLabel ?? "Paste content");
  };

  return (
    <Editor
      extensions={effectiveExtensions()}
      language={props.language}
      readOnly={props.readOnly}
      value={props.value}
      onUpdate={props.onUpdate}
      onMount={setFieldAttrs}
    />
  );
};

export default CodeEditor;
