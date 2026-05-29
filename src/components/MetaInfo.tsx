import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import styles from "../styles/MetaInfo.module.scss";
import "@thisbeyond/solid-select/style.css";
import ToggleSwitch from "./Toggle";
import FaRegularCircleQuestion from "~/svgs/Question";

interface Props {
  onAddFile?: () => void;
}

const MetaInfo: Component<Props> = (props) => {
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
          <Select id="paste-expiry" name="expiry" class="customSelect" options={[1, 2, 3, 4]} />
        </span>
        <label class={`${styles.part} header`}>
          Allowed Views
          <small class={`${styles.smallText}`}>
            <FaRegularCircleQuestion /> Only allow up to N amount of views
          </small>
          <input type="number" name="views" min="1" max="1000" step="1" value="0"></input>
        </label>
        <span class={`${styles.part} header`}>
          Disable Safety scanning?
          <small class={`${styles.smallText}`}>
            <FaRegularCircleQuestion /> Disables scanning the paste for tokens.
          </small>
          <ToggleSwitch checked={false} />
        </span>
        <div class="saveButton">Save</div>
        <div class={styles.addFileButton} onClick={props.onAddFile}>
          + Add file
        </div>
      </div>
    </div>
  );
};

export default MetaInfo;
