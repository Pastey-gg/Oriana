import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import { metaStore, pasteStore, setMetaStore, setPasteStore } from "~/stores";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";
import FileSelector from "./FileSelector";

const MetaBar: Component = () => {
  const setCurrentFile = (index: number) => {
    setMetaStore("currentFile", index);
  };

  const setCurrentFileName = (name: string) => {
    setPasteStore("files", metaStore.currentFile, "name", name);
  };

  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={pasteStore.files.length} currentFile={metaStore.currentFile} onFileChange={setCurrentFile} />
      <input
        id="paste-file-name"
        name="fileName"
        placeholder="Optional filename..."
        value={pasteStore.files[metaStore.currentFile]?.name ?? ""}
        onInput={(event) => setCurrentFileName(event.currentTarget.value)}
      ></input>
      <div class={styles.langSelectWrapper}>
        <Select id="paste-file-language" name="fileLanguage" class={`${styles.langSelect} customSelect`} placeholder="Syntax..." options={[1, 2, 3]} />
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </div>
  );
};

export default MetaBar;
