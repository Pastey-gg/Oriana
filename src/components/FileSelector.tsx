import { Select } from "@thisbeyond/solid-select";
import { Show } from "solid-js";
import type { Component } from "solid-js";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";

interface Props {
  fileCount: number;
}

const FileSelector: Component<Props> = (props) => {
  const fileOptions = () =>
    Array.from({ length: props.fileCount }, (_, i) => `File ${i + 1}`);

  const format = (value: string, type: "option" | "value") => {
    if (type === "value") {
      const index = fileOptions().indexOf(value);
      return `File ${index + 1} of ${props.fileCount}`;
    }
    return value;
  };

  return (
    <Show
      when={props.fileCount > 1}
      fallback={<div class={`${styles.fileSelect} ${styles.fileStatic}`}>File 1 of 1</div>}
    >
      <div class={styles.fileSelectorWrapper}>
        <Select
          class={`${styles.fileSelect} customSelect`}
          placeholder={`File 1 of ${props.fileCount}`}
          options={fileOptions()}
          format={format}
        />
        <span class={styles.fileSelectorChevron}><ChevronSVG /></span>
      </div>
    </Show>
  );
};

export default FileSelector;
