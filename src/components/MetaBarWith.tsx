import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import ChevronSVG from "~/svgs/Chevron";
import type { PasteResponse } from "~/types/pastes";
import styles from "../styles/MetaBar.module.scss";
import FileSelector from "./FileSelector";

interface Props {
  paste: PasteResponse;
}

const MetaBarWith: Component<Props> = (props) => {
  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={props.paste.files.length} />
      <input placeholder="Optional filename..." value={props.paste.files[0]?.name ?? ""}></input>
      <div class={styles.langSelectWrapper}>
        <Select class={`${styles.langSelect} customSelect`} placeholder="Syntax..." options={[1, 2, 3]} />
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </div>
  );
};

export default MetaBarWith;
