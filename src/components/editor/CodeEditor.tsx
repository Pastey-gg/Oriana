import { type Component, createMemo } from "solid-js";
import { Editor, type Extension, type PrismEditor } from "solid-prism-editor";
import { defaultCommands } from "solid-prism-editor/commands";
import { metaStore } from "~/stores";

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

    editor.textarea.addEventListener("paste", () => {
      const winY = window.scrollY;
      const textY = editor.textarea.scrollTop;

      const parent = document.getElementById("editorDiv");
      const parentY = parent ? parent.scrollTop : 0;

      requestAnimationFrame(() => {
        window.scrollTo(window.scrollX, winY);
        editor.textarea.scrollTop = textY;
        if (parent) parent.scrollTop = parentY;
      });
    });
  };

  return (
    <Editor
      extensions={effectiveExtensions()}
      language={props.language}
      readOnly={props.readOnly}
      value={props.value}
      onUpdate={props.onUpdate}
      onMount={setFieldAttrs}
      class={`font-${metaStore.font ?? "monospace"} fontSize-${metaStore.fontSize ?? "default"}${metaStore.ligatures ? " ligs" : ""}`}
      wordWrap={metaStore.wordWrap}
    />
  );
};

export default CodeEditor;
