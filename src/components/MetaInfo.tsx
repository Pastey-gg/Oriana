import { createShortcut } from "@solid-primitives/keyboard";
import { useNavigate } from "@solidjs/router";
import { createOptions, Select } from "@thisbeyond/solid-select";
import { type Component, createSignal, Show } from "solid-js";
import toast from "solid-toast";
import { pasteStore, setPasteStore } from "~/stores";
import FaRegularCircleQuestion from "~/svgs/Question";
import type { PasteFileCreate } from "~/types/files";
import type { CreatePasteResponse } from "~/types/pastes";
import styles from "../styles/MetaInfo.module.scss";
import ToggleSwitch from "./Toggle";

interface Props {
  onAddFile?: () => void;
}

interface ExpiryOptsT {
  name: string;
  time: number;
}

const ExpiryOpts: ExpiryOptsT[] = [
  { name: "5 minutes", time: 5 * 60 * 1000 },
  { name: "15 minutes", time: 15 * 60 * 1000 },
  { name: "1 hour", time: 60 * 60 * 1000 },
  { name: "6 hours", time: 6 * 60 * 60 * 1000 },
  { name: "12 hours", time: 12 * 60 * 60 * 1000 },
  { name: "1 day", time: 24 * 60 * 60 * 1000 },
  { name: "3 days", time: 3 * 24 * 60 * 60 * 1000 },
  { name: "7 days", time: 7 * 24 * 60 * 60 * 1000 },
  { name: "14 days", time: 14 * 24 * 60 * 60 * 1000 },
  { name: "28 days", time: 28 * 24 * 60 * 60 * 1000 },
];

const format = (value: ExpiryOptsT) => {
  return value.name;
};

const MetaInfo: Component<Props> = (props) => {
  const [error, setError] = createSignal<string | null>(null);
  const [disableSafetyScanning, setDisableSafetyScanning] = createSignal(false);
  const navigate = useNavigate();

  const loadExpiry = createOptions(ExpiryOpts, { format, extractText: (value: ExpiryOptsT) => value.name });

  // Ctrl + s == Save Paste
  createShortcut(
    ["Control", "s"],
    () => {
      postPaste();
    },
    { preventDefault: true },
  );

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

    // Expiry...
    const now = new Date();
    now.setMilliseconds(now.getMilliseconds() + (pasteStore.expiry ?? 0));

    const body = JSON.stringify({
      files: newFiles,
      password: pasteStore.password,
      expires_at: pasteStore.expiry ? now.toISOString() : null,
      remaining_views: pasteStore.views ?? null,
    });

    try {
      resp = await fetch(`${import.meta.env.VITE_API_HOST}/pastes?web=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
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

    const data = (await resp.json()) as CreatePasteResponse;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`oriana:safety-token:${data.id}`, data.safety_token);
    }
    navigate(`/${data.id}`, { state: { paste: data } });
  };

  const showError = () => {
    toast.error(error(), { icon: "❌" });
    setError(null);
    return "";
  };

  const setAllowedViews = (input: HTMLInputElement) => {
    if (input.value === "") {
      setPasteStore("views", undefined);
      return;
    }

    const views = Number(input.value);
    if (!Number.isInteger(views) || views < 1 || views > 1000) {
      input.value = pasteStore.views?.toString() ?? "";
      return;
    }

    setPasteStore("views", views);
  };

  return (
    <div class="flexc" id="metaInfo">
      <div class={`${styles.metaInner} flexc gap-1`}>
        <small class={`smallText header tint`}>
          <span class="blue">*</span> All settings are optional.
        </small>
        <label class={`${styles.part} header`}>
          Password
          <input name="password" type="password" onchange={(e) => setPasteStore("password", e.target.value)} />
        </label>
        <span class={`${styles.part} header`}>
          <label for="paste-expiry">Expiry</label>
          <Select
            id="paste-expiry"
            name="expiry"
            class="customSelect"
            {...loadExpiry}
            onChange={(e) => setPasteStore("expiry", e.time)}
          />
        </span>
        <label class={`${styles.part} header`}>
          Allowed Views
          <small class="smallText tint">
            <FaRegularCircleQuestion /> Only allow up to N amount of views
          </small>
          <input
            type="number"
            name="views"
            min="1"
            max="1000"
            step="1"
            value={pasteStore.views ?? ""}
            onInput={(e) => setAllowedViews(e.currentTarget)}
          ></input>
        </label>
        <span class={`${styles.part} header`}>
          Disable Safety scanning?
          <small class="smallText tint">
            <FaRegularCircleQuestion /> Disables scanning the paste for tokens.
          </small>
          <ToggleSwitch checked={disableSafetyScanning()} ontoggle={setDisableSafetyScanning} />
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
