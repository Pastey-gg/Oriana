import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import { draftStore, pasteStore, setDraftStore } from "~/stores";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";
import FileSelector from "./FileSelector";
import { findLang, loadLangs, onLangUpdate, onNameUpdate } from "./SetLang";

const MetaBar: Component = () => {
  const setCurrentFile = (index: number) => {
    setDraftStore("currentFile", index);
  };

  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={pasteStore.files.length} currentFile={draftStore.currentFile} onFileChange={setCurrentFile} />
      <input
        aria-label="File name"
        id="paste-file-name"
        name="fileName"
        placeholder="Optional filename..."
        value={pasteStore.files[draftStore.currentFile]?.name ?? ""}
        onInput={onNameUpdate}
      ></input>
      <div class={styles.langSelectWrapper}>
        <label class="sr-only" for="paste-file-language">
          Syntax language
        </label>
        <Select
          id="paste-file-language"
          name="fileLanguage"
          class={`${styles.langSelect} customSelect`}
          placeholder="Syntax..."
          {...loadLangs}
          onChange={onLangUpdate}
          initialValue={findLang()}
        />
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </div>
  );
};

export default MetaBar;
