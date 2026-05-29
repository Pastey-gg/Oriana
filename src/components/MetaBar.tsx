import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";
import FileSelector from "./FileSelector";

interface Props {
  fileCount?: number;
}

const MetaBar: Component<Props> = (props) => {
  return (
    <div class={styles.topBar}>
      <FileSelector fileCount={props.fileCount ?? 1} />
      <input placeholder="Optional filename..."></input>
      <div class={styles.langSelectWrapper}>
        <Select class={`${styles.langSelect} customSelect`} placeholder="Syntax..." options={[1, 2, 3]} />
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </div>
  );
};

export default MetaBar;
