import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import { createMemo, Show } from "solid-js";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";

type FileOption = {
  name: string;
  index: number;
};

interface Props {
  fileCount: number;
  currentFile: number;
  onFileChange: (index: number) => void;
}

const FileSelector: Component<Props> = (props) => {
  const fileOptions = createMemo(() => Array.from({ length: props.fileCount }, (_, i) => ({ name: `File ${i + 1}`, index: i })));
  const selectedOption = createMemo(() => fileOptions()[props.currentFile] ?? fileOptions()[0]);
  const selectKey = createMemo(() => `${props.fileCount}:${props.currentFile}`);

  const format = (value: FileOption | string, type: "option" | "value") => {
    if (typeof value === "string") {
      return value;
    }

    if (type === "option") {
      return `${value.name} of ${props.fileCount}`;
    }

    return `${value.name} of ${props.fileCount}`;
  };

  const setFile = (option: FileOption | null) => {
    if (!option) {
      return;
    }

    props.onFileChange(option.index);
  };

  return (
    <Show when={props.fileCount > 1} fallback={<div class={`${styles.fileSelect} ${styles.fileStatic}`}>File 1 of 1</div>}>
      <div class={styles.fileSelectorWrapper}>
        <Show keyed when={selectKey()}>
          <Select
            class={`${styles.fileSelect} customSelect`}
            initialValue={selectedOption()}
            placeholder={`File ${props.currentFile + 1} of ${props.fileCount}`}
            options={fileOptions()}
            format={format}
            onChange={setFile}
          />
        </Show>
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </Show>
  );
};

export default FileSelector;
