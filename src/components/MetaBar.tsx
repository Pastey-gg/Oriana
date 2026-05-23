import type { ParentComponent } from "solid-js";
import styles from "../styles/MetaBar.module.scss";

const MetaBar: ParentComponent = () => {
  return (
    <div class={styles.topBar}>
      <input></input>
      <input></input>
    </div>
  );
};

export default MetaBar;
