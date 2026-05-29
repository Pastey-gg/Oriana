// NOTE: For some odd reason
// importing the common languages as one does not play nicely, so they have all been added individually..
import "solid-prism-editor/prism/languages/bash";
import "solid-prism-editor/prism/languages/css";
import "solid-prism-editor/prism/languages/css-extras";
import "solid-prism-editor/prism/languages/ini";
import "solid-prism-editor/prism/languages/kotlin";
import "solid-prism-editor/prism/languages/xml";
import "solid-prism-editor/prism/languages/markup";
import "solid-prism-editor/prism/languages/markdown";
import "solid-prism-editor/prism/languages/php";
import "solid-prism-editor/prism/languages/php-extras";
import "solid-prism-editor/prism/languages/r";
import "solid-prism-editor/prism/languages/basic";
import "solid-prism-editor/prism/languages/vbnet";
import "solid-prism-editor/prism/languages/c";
import "solid-prism-editor/prism/languages/opencl";
import "solid-prism-editor/prism/languages/diff";
import "solid-prism-editor/prism/languages/java";
import "solid-prism-editor/prism/languages/less";
import "solid-prism-editor/prism/languages/objectivec";
import "solid-prism-editor/prism/languages/ruby";
import "solid-prism-editor/prism/languages/sql";
import "solid-prism-editor/prism/languages/wasm";
import "solid-prism-editor/prism/languages/cpp";
import "solid-prism-editor/prism/languages/go";
import "solid-prism-editor/prism/languages/javascript";
import "solid-prism-editor/prism/languages/js-templates";
import "solid-prism-editor/prism/languages/jsx";
import "solid-prism-editor/prism/languages/lua";
import "solid-prism-editor/prism/languages/perl";
import "solid-prism-editor/prism/languages/python";
import "solid-prism-editor/prism/languages/rust";
import "solid-prism-editor/prism/languages/swift";
import "solid-prism-editor/prism/languages/clike";
import "solid-prism-editor/prism/languages/csharp";
import "solid-prism-editor/prism/languages/graphql";
import "solid-prism-editor/prism/languages/json";
import "solid-prism-editor/prism/languages/makefile";
import "solid-prism-editor/prism/languages/scss";
import "solid-prism-editor/prism/languages/typescript";
import "solid-prism-editor/prism/languages/tsx";
import "solid-prism-editor/prism/languages/yaml";
import "solid-prism-editor/prism/languages/regex";
import "solid-prism-editor/prism/languages/toml";
import "solid-prism-editor/layout.css";
import "solid-prism-editor/themes/github-dark.css";
import "solid-prism-editor/search.css";
import "solid-prism-editor/copy-button.css";

import { type Component, createMemo, createSignal, Match, Switch } from "solid-js";
import { metaStore, pasteStore, setPasteStore } from "~/stores";
import { Editor } from "solid-prism-editor";
import { copyButton } from "solid-prism-editor/copy-button";
import { indentGuides } from "solid-prism-editor/guides";
import type { PasteResponse } from "~/types/pastes";
import styles from "../styles/Editor.module.scss";
import MetaBar from "./MetaBar";
import MetaBarWith from "./MetaBarWith";

interface Props {
  paste?: PasteResponse;
}

const IEditor: Component<Props> = (props) => {
  // TODO: Settings...
  const extensions = createMemo(() => [copyButton(), indentGuides()]);
  const [viewFile, setViewFile] = createSignal(0);
  const draftFile = createMemo(() => pasteStore.files[metaStore.currentFile]);
  const viewedFile = createMemo(() => props.paste?.files[viewFile()]);

  const setCurrentFileContent = (content: string) => {
    setPasteStore("files", metaStore.currentFile, "content", content);
  };

  return (
    <div class={styles.container}>
      <Switch>
        <Match when={props.paste}>
          {/** biome-ignore lint/style/noNonNullAssertion: Match ensures props.paste */}
          <MetaBarWith paste={props.paste!} currentFile={viewFile()} onFileChange={setViewFile} />
        </Match>
        <Match when={!props.paste}>
          <MetaBar />
        </Match>
      </Switch>
      <Switch>
        <Match when={props.paste}>
          <Editor
            extensions={extensions()}
            language={viewedFile()?.language ?? "text"}
            readOnly
            value={viewedFile()?.content ?? ""}
          />
        </Match>
        <Match when={!props.paste}>
          <Editor
            extensions={extensions()}
            language={draftFile()?.language ?? "text"}
            value={draftFile()?.content ?? ""}
            onUpdate={setCurrentFileContent}
          />
        </Match>
      </Switch>
    </div>
  );
};

export default IEditor;
