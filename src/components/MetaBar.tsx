import { Select } from "@thisbeyond/solid-select";
import type { ParentComponent } from "solid-js";
import styles from "../styles/MetaBar.module.scss";

const MetaBar: ParentComponent = () => {

  return (
    <div class={styles.topBar}>
        <Select
          class={`${styles.fileSelect} customSelect`}
          placeholder="File 1 of 2"
          options={[1, 2, 3]}
        ></Select>
      <input placeholder="Optional filename..."></input>
      <Select class={`${styles.langSelect} customSelect mla`} placeholder="Syntax..." options={[1, 2, 3]} />
    </div>
  );
};

export default MetaBar;
