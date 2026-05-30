import { Select } from "@thisbeyond/solid-select";
import { type Component, createSignal, Show } from "solid-js";
import styles from "../styles/MetaInfo.module.scss";
import "@thisbeyond/solid-select/style.css";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import { pasteStore, setPasteStore } from "~/stores";
import FaRegularCircleQuestion from "~/svgs/Question";
import type { PasteFileCreate } from "~/types/files";
import ToggleSwitch from "./Toggle";

interface Props {
  onAddFile?: () => void;
}

const MetaInfo: Component<Props> = (props) => {
  const [error, setError] = createSignal<string | null>(null);
  const navigate = useNavigate();

  const postPaste = async () => {
    const newFiles: Array<PasteFileCreate> = [];

    for (const file of pasteStore.files) {
      if (file.content.length > 0) {
        newFiles.push(file);
      }
    }

    if (newFiles.length < 1) {
      setError("Paste data cannot be empty.");
      return;
    }

    let resp: Response;
    const body = JSON.stringify({ files: newFiles });

    try {
      resp = await fetch(`${import.meta.env.VITE_API_HOST}/pastes`, { method: "POST", body: body });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      return;
    }

    if (resp.status !== 201) {
      const errData = await resp.json();
      setError(errData.error);
      return;
    }

    const data = await resp.json();
    navigate(`/${data.id}`);
  };

  const showError = () => {
    toast.error(error(), { icon: "❌" });
    setError(null);
    return "";
  };

  return (
    <div class="flexc" id="metaInfo">
      <div class={`${styles.metaInner} flexc gap-1`}>
        <small class={`${styles.smallText} header`}>
          <span class="blue">*</span> All settings are optional.
        </small>
        <label class={`${styles.part} header`}>
          Password
          <input name="password" onchange={(e) => setPasteStore("password", e.target.value)} />
        </label>
        <span class={`${styles.part} header`}>
          Expiry
          <Select
            id="paste-expiry"
            name="expiry"
            class="customSelect"
            options={[1, 2, 3, 4]}
            onChange={(e) => setPasteStore("expiry", e)}
          />
        </span>
        <label class={`${styles.part} header`}>
          Allowed Views
          <small class={`${styles.smallText}`}>
            <FaRegularCircleQuestion /> Only allow up to N amount of views
          </small>
          <input
            type="number"
            name="views"
            min="1"
            max="1000"
            step="1"
            value="0"
            onChange={(e) => setPasteStore("views", parseInt(e.target.value, 10))}
          ></input>
        </label>
        <span class={`${styles.part} header`}>
          Disable Safety scanning?
          <small class={`${styles.smallText}`}>
            <FaRegularCircleQuestion /> Disables scanning the paste for tokens.
          </small>
          <ToggleSwitch checked={false} />
        </span>
        <div class="saveButton" onclick={postPaste}>
          Save
        </div>
        <Show when={error()}>{showError()}</Show>
        <div class={styles.addFileButton} onClick={props.onAddFile}>
          + Add file
        </div>
      </div>
    </div>
  );
};

export default MetaInfo;
