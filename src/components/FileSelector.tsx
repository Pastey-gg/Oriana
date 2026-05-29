import { Select } from "@thisbeyond/solid-select";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import { pasteStore } from "~/stores";
import ChevronSVG from "~/svgs/Chevron";
import styles from "../styles/MetaBar.module.scss";


const FileSelector: Component = () => {
  const fileOptions = () => Array.from({ length: pasteStore.files.length }, (_, i) => [{name: `File ${i + 1}`}, {key: i}]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const format = (value: any, type: "option" | "value") => {
    if (type === "option") {
      const {name} = value[0];
      return `${name} of ${pasteStore.files.length}`;
    }

    return value;
  };

  const setFile = (e) => {
    //
  }

  return (
    <Show when={pasteStore.files.length > 1} fallback={<div class={`${styles.fileSelect} ${styles.fileStatic}`}>File 1 of 1</div>}>
      <div class={styles.fileSelectorWrapper}>
        <Select
          class={`${styles.fileSelect} customSelect`}
          placeholder={`File 1 of ${pasteStore.files.length}`}
          options={fileOptions()}
          format={format}
          onChange={setFile}
        />
        <span class={styles.fileSelectorChevron}>
          <ChevronSVG />
        </span>
      </div>
    </Show>
  );
};

export default FileSelector;
