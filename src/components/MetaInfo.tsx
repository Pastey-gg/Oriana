import { Select } from "@thisbeyond/solid-select";
import type { ParentComponent } from "solid-js";
import styles from "../styles/MetaInfo.module.scss";
import "@thisbeyond/solid-select/style.css";
import ToggleSwitch from "./Toggle";

const MetaInfo: ParentComponent = () => {
  return (
    <div class="flexc" id="metaInfo">
      <div class={`${styles.metaInner} flexc gap-1`}>
        <small class={`${styles.smallText} header`}>
          <span class="blue">*</span> All settings are optional.
        </small>
        <label class={`${styles.part} header`}>
          Password
          <input name="password" />
        </label>
        <span class={`${styles.part} header`}>
          Expiry
          <Select class="customSelect" options={[1, 2, 3, 4]} />
        </span>
        <label class={`${styles.part} header`}>
          View Count
          <input type="number" name="views" min="1" max="100" step="1" value="0"></input>
        </label>
        <span class={`${styles.part} header`}>
          Disable Safety scanning?
          <ToggleSwitch checked={false} />
        </span>
        <div class="saveButton">Save</div>
      </div>
    </div>
  );
};

export default MetaInfo;
