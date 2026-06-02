import "solid-prism-editor/layout.css";
import "solid-prism-editor/themes/atom-one-dark.css";
import "solid-prism-editor/search.css";
import "solid-prism-editor/copy-button.css";

import { type Component, createMemo, createSignal, Match, Show, Switch, untrack } from "solid-js";
import { copyButton } from "solid-prism-editor/copy-button";
import { indentGuides } from "solid-prism-editor/guides";
import { metaStore, pasteStore, setPasteStore } from "~/stores";
import type { PasteResponse } from "~/types/pastes";
import editorStyles from "../styles/Editor.module.scss";
import metaBarStyles from "../styles/MetaBar.module.scss";
import CodeEditor from "./editor/CodeEditor";
import "./editor/languages";
import MetaBar from "./MetaBar";
import MetaBarWith from "./MetaBarWith";

interface Props {
  paste?: PasteResponse;
  loadingPaste?: boolean;
}

const IEditor: Component<Props> = (props) => {
  // TODO: Settings...
  const extensions = createMemo(() => [copyButton(), indentGuides()]);
  const [viewFile, setViewFile] = createSignal(0);
  const [viewLanguageOverrides, setViewLanguageOverrides] = createSignal<Record<number, string>>({});
  const draftFile = createMemo(() => pasteStore.files[metaStore.currentFile]);
  const draftEditorKey = createMemo(() => `draft-file-${metaStore.currentFile}`);
  const viewedFile = createMemo(() => props.paste?.files[viewFile()]);
  const viewedLanguage = createMemo(() => viewLanguageOverrides()[viewFile()] ?? viewedFile()?.language ?? "text");
  const viewerEditorKey = createMemo(() => `viewer-${props.paste?.id ?? "loading"}-${viewFile()}`);
  const isViewingPaste = createMemo(() => props.loadingPaste || Boolean(props.paste));

  const draftInitialValue = () => untrack(() => pasteStore.files[metaStore.currentFile]?.content ?? "");

  const setCurrentFileContent = (content: string) => {
    setPasteStore("files", metaStore.currentFile, "content", content);
  };

  const setViewedLanguage = (language: string) => {
    setViewLanguageOverrides((current) => ({ ...current, [viewFile()]: language }));
  };

  return (
    <div class={editorStyles.container}>
      <Switch>
        <Match when={props.paste}>
          <MetaBarWith
            paste={props.paste!}
            currentFile={viewFile()}
            selectedLanguage={viewedLanguage()}
            onFileChange={setViewFile}
            onLanguageChange={setViewedLanguage}
          />
        </Match>
        <Match when={props.loadingPaste}>
          <div class={metaBarStyles.topBar} aria-busy="true">
            <div class={`${metaBarStyles.fileSelect} ${metaBarStyles.fileStatic}`}>File 1 of 1</div>
            <input id="paste-file-name-view" name="fileName" placeholder="Loading paste..." value="" readOnly={true} />
          </div>
        </Match>
        <Match when={!isViewingPaste()}>
          <MetaBar />
        </Match>
      </Switch>
      <Switch>
        <Match when={isViewingPaste()}>
          <Show keyed={true} when={viewerEditorKey()}>
            <CodeEditor
              extensions={extensions()}
              language={viewedLanguage()}
              readOnly={true}
              value={viewedFile()?.content ?? ""}
              id="paste-content-viewer"
              name="pasteContent"
            />
          </Show>
        </Match>
        <Match when={!isViewingPaste()}>
          <Show keyed={true} when={draftEditorKey()}>
            <CodeEditor
              extensions={extensions()}
              language={draftFile()?.language ?? "text"}
              value={draftInitialValue()}
              onUpdate={setCurrentFileContent}
              id="paste-content-editor"
              name="pasteContent"
            />
          </Show>
        </Match>
      </Switch>
    </div>
  );
};

export default IEditor;
