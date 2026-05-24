import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import FileSelector from "./FileSelector";
import styles from "../styles/MetaBar.module.scss";

interface Props {
  paste: PasteResponse;
}

const MetaBarWith: Component<Props> = (props) => {
  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={props.paste.files.length} />
      <input placeholder="Optional filename..." value={props.paste.files[0]?.name ?? ""}></input>
      <Select class={`${styles.langSelect} customSelect mla`} placeholder="Syntax..." options={[1, 2, 3]} />
    </div>
  );
};

export default MetaBarWith;
