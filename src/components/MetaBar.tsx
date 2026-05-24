import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import FileSelector from "./FileSelector";
import styles from "../styles/MetaBar.module.scss";

interface Props {
  fileCount?: number;
}

const MetaBar: Component<Props> = (props) => {
  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={props.fileCount ?? 1} />
      <input placeholder="Optional filename..."></input>
      <Select class={`${styles.langSelect} customSelect mla`} placeholder="Syntax..." options={[1, 2, 3]} />
    </div>
  );
};

export default MetaBar;
