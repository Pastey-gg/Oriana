import { createOptions, Select } from "@thisbeyond/solid-select";
import { type Component } from "solid-js";
import { metaStore, setMetaStore } from "~/stores";
import Modal from "./Modal";
import ToggleSwitch from "./Toggle";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: Component<Props> = (props) => {
  const fontSizes = ["small", "default", "large"];
  const fonts = ["jetbrains", "fira", "ibmplex", "notosans", "roboto", "sourcecodepro", "ubuntu", "monospace"];

  const formatFont = (value: string, type: any, meta: any) => {
    return <span class={`fontSize-${metaStore.fontSize ?? "default"} font-${value}`}>{value}</span>;
  };
  const loadFonts = createOptions(fonts, { format: formatFont, extractText: (value: string) => value });

  const formatFontSize = (value: string, type: any, meta: any) => {
    return <span class={`fontSize-${value} font-${metaStore.font ?? "monospace"}`}>{value}</span>;
  };
  const loadFontSize = createOptions(fontSizes, { format: formatFontSize, extractText: (value: string) => value });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Settings">
      <div class="flexc gap-1.5">
        <div class="flexc gap-1">
          <span class="header">Editor Font</span>
          <Select
            name={"font-select"}
            class="customSelect settingsSelect"
            onChange={(e) => setMetaStore("font", e)}
            {...loadFonts}
            initialValue={metaStore.font ?? "monospace"}
          />
        </div>
        <div class="flexc gap-1">
          <span class="header">Font Size</span>
          <Select
            name={"fontSize-select"}
            class="customSelect settingsSelect"
            onChange={(e) => setMetaStore("fontSize", e)}
            {...loadFontSize}
            initialValue={metaStore.fontSize ?? "default"}
          />
        </div>
        <hr />
        <div class="flex gap-1">
          <ToggleSwitch checked={metaStore.wordWrap} ontoggle={(value) => setMetaStore("wordWrap", value)} />
          <small class="smallText">Enable Word Wrap</small>
        </div>
        <div class="flex gap-1">
          <ToggleSwitch checked={metaStore.ligatures} ontoggle={(value) => setMetaStore("ligatures", value)} />
          <small class="smallText">Enable Font Ligatures</small>
        </div>
        <div class="flex gap-1">
          <ToggleSwitch checked={metaStore.guidelines} ontoggle={(value) => setMetaStore("guidelines", value)} />
          <small class="smallText">Enable Editor Guidelines</small>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
