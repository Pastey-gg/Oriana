import "solid-prism-editor/layout.css";
import "solid-prism-editor/search.css";
import "solid-prism-editor/copy-button.css";

import { type Component, createMemo, createSignal, Match, onCleanup, onMount, Show, Switch, untrack } from "solid-js";
import { copyButton } from "solid-prism-editor/copy-button";
import { indentGuides } from "solid-prism-editor/guides";
import { type EditorTheme, loadTheme, registerTheme } from "solid-prism-editor/themes";
import { draftStore, pasteStore, setPasteStore } from "~/stores";
import type { PasteResponse } from "~/types/pastes";
import editorStyles from "../styles/Editor.module.scss";
import metaBarStyles from "../styles/MetaBar.module.scss";
import CodeEditor from "./editor/CodeEditor";
import "./editor/languages";
import MetaBar from "./MetaBar";
import MetaBarWith from "./MetaBarWith";
import { findLang } from "./SetLang";

interface Props {
  paste?: PasteResponse;
  loadingPaste?: boolean;
}

type Theme = "light" | "dark";

const getTheme = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

registerTheme("one-light", () => import("../styles/one-light-theme.css?inline"));

const editorTheme = (theme: Theme): EditorTheme => (theme === "dark" ? "atom-one-dark" : "one-light");

const EditorThemeLoader: Component = () => {
  onMount(() => {
    const style = document.createElement("style");
    style.dataset.prismEditorTheme = "";
    document.head.append(style);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let hasAppliedTheme = false;
    let appliedTheme: Theme | undefined;
    let transitionTimeout: number | undefined;

    const startTransition = () => {
      if (!hasAppliedTheme || !motionQuery.matches) return;
      window.clearTimeout(transitionTimeout);
      document.documentElement.dataset.editorThemeTransition = "true";
    };

    const finishTransition = () => {
      if (!hasAppliedTheme || !motionQuery.matches) return;
      transitionTimeout = window.setTimeout(() => {
        delete document.documentElement.dataset.editorThemeTransition;
      }, 125);
    };

    const applyEditorTheme = async (nextTheme: Theme, useFallbackTransition = true) => {
      if (appliedTheme === nextTheme) return;

      if (useFallbackTransition) startTransition();
      const themeCss = await loadTheme(editorTheme(nextTheme));
      if (themeCss) style.textContent = themeCss;
      appliedTheme = nextTheme;
      hasAppliedTheme = true;

      if (useFallbackTransition) {
        requestAnimationFrame(finishTransition);
      } else {
        delete document.documentElement.dataset.editorThemeTransition;
      }
    };

    window.orianaApplyEditorTheme = (theme) => applyEditorTheme(theme, false);

    const applyTheme = () => {
      void applyEditorTheme(getTheme());
    };

    const observer = new MutationObserver(applyTheme);

    applyTheme();
    void loadTheme(editorTheme(getTheme() === "dark" ? "light" : "dark"));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    onCleanup(() => {
      window.clearTimeout(transitionTimeout);
      delete document.documentElement.dataset.editorThemeTransition;
      window.orianaApplyEditorTheme = undefined;
      observer.disconnect();
      style.remove();
    });
  });

  return null;
};

const IEditor: Component<Props> = (props) => {
  // TODO: Settings...
  const extensions = createMemo(() => [copyButton(), indentGuides()]);
  const [viewFile, setViewFile] = createSignal(0);
  const [viewLanguageOverrides, setViewLanguageOverrides] = createSignal<Record<number, string>>({});
  const draftFile = createMemo(() => pasteStore.files[draftStore.currentFile]);
  const draftEditorKey = createMemo(() => `draft-file-${draftStore.currentFile}`);
  const viewedFile = createMemo(() => props.paste?.files[viewFile()]);
  const viewedLanguage = createMemo(() => viewLanguageOverrides()[viewFile()] ?? findLang(viewedFile()!).name);
  const viewerEditorKey = createMemo(() => `viewer-${props.paste?.id ?? "loading"}-${viewFile()}-${viewedLanguage()}`);
  const isViewingPaste = createMemo(() => props.loadingPaste || Boolean(props.paste));

  const draftInitialValue = () => untrack(() => pasteStore.files[draftStore.currentFile]?.content ?? "");

  const setCurrentFileContent = (content: string) => {
    setPasteStore("files", draftStore.currentFile, "content", content);
  };

  const setViewedLanguage = (language: string) => {
    setViewLanguageOverrides((current) => ({ ...current, [viewFile()]: language }));
  };

  return (
    <div class={editorStyles.container} tabIndex={-1} id="editorDiv">
      <EditorThemeLoader />
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
              ariaLabel="Paste content viewer"
            />
          </Show>
        </Match>
        <Match when={!isViewingPaste()}>
          <Show keyed={true} when={draftEditorKey()}>
            <CodeEditor
              extensions={extensions()}
              language={findLang(draftFile()!).name}
              value={draftInitialValue()}
              onUpdate={setCurrentFileContent}
              id="paste-content-editor"
              name="pasteContent"
              ariaLabel="Paste content editor"
            />
          </Show>
        </Match>
      </Switch>
    </div>
  );
};

export default IEditor;
