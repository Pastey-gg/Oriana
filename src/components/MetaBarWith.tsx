import { Select } from "@thisbeyond/solid-select";
import { type Component, createMemo, Show } from "solid-js";
import ChevronSVG from "~/svgs/Chevron";
import type { PasteResponse } from "~/types/pastes";
import styles from "../styles/MetaBar.module.scss";
import FileSelector from "./FileSelector";
import { loadLangs, resolveLang } from "./SetLang";

interface Props {
  paste: PasteResponse;
  currentFile: number;
  selectedLanguage: string;
  onFileChange: (index: number) => void;
  onLanguageChange: (language: string) => void;
}

const MetaBarWith: Component<Props> = (props) => {
  const file = createMemo(() => props.paste.files[props.currentFile]);

  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={props.paste.files.length} currentFile={props.currentFile} onFileChange={props.onFileChange} />
      <input
        id="paste-file-name-view"
        name="fileName"
        placeholder="Optional filename..."
        value={file()?.name ?? ""}
        readOnly={true}
      ></input>
      <div class={styles.langSelectWrapper}>
        <Show keyed={true} when={props.currentFile + ":" + props.selectedLanguage}>
          <Select
            id="paste-file-language-view"
            name="fileLanguage"
            class={`${styles.langSelect} customSelect`}
            {...loadLangs}
            initialValue={resolveLang(props.selectedLanguage)}
            onChange={(value) => value && props.onLanguageChange(value.name)}
          />
        </Show>
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </div>
  );
};

export default MetaBarWith;
