/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { Select } from "@thisbeyond/solid-select";
import type { ParentComponent } from "solid-js";

import RiArrowsExpandUpDownFill from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";

const MetaBar: ParentComponent = () => {
  const onFileSelcClick = () => {
    const el = document.getElementById("fileSelc");
    if (!el) {
      return;
    }
    el.click();
  };

  return (
    <div class={styles.topBar}>
      <div class="selectContainer" onMouseDown={onFileSelcClick}>
        <Select
          id="fileSelc"
          class={`${styles.langSelect} customSelect`}
          placeholder="File 1 of 2"
          options={[1, 2, 3]}
        ></Select>
        <RiArrowsExpandUpDownFill />
      </div>
      <input placeholder="Optional filename..."></input>
      <Select class={`${styles.langSelect} customSelect mla`} placeholder="Syntax..." options={[1, 2, 3]} />
    </div>
  );
};

export default MetaBar;
