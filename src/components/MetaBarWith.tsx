import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import FileSelector from "./FileSelector";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";

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
        <span class={styles.fileSelectorChevron}><ChevronSVG /></span>
      </div>
    </div>
  );
};

export default MetaBarWith;
