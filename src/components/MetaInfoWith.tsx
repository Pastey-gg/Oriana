import { writeClipboard } from "@solid-primitives/clipboard";
import { createSignal, Match, type ParentComponent, Switch } from "solid-js";
import toast from "solid-toast";
import FaSolidClockFour from "~/svgs/Clock";
import FaSolidCode from "~/svgs/Code";
import FaSolidCopy from "~/svgs/Copy";
import FaSolidDownload from "~/svgs/Download";
import FaSolidEye from "~/svgs/Eye";
import FaSolidHourglass1 from "~/svgs/Hourglass";
import type { PasteResponse } from "~/types/pastes";
import styles from "../styles/MetaInfo.module.scss";
import RelativeTimeDisplay from "./RelativeTimeDisplay";

interface Props {
  paste: PasteResponse;
}

const MetaInfoWith: ParentComponent<Props> = (props) => {
  const [dlStatus, setDlStatus] = createSignal(false);

  const copyURL = async () => {
    writeClipboard(`${window.location.protocol}//${window.location.host}/${props.paste.id}`);
    toast.success("Copied URL to clipboard!");
  };

  const rawURL = () => `${import.meta.env.VITE_API_HOST}/pastes/${props.paste.id}/raw`;

  const downloadPaste = async () => {
    if (dlStatus()) {
      return;
    }

    setDlStatus(true);
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();

    for (const file of props.paste.files) {
      zip.file(file.name || `${file.id}.txt`, file.content);
    }

    try {
      const content = await zip.generateAsync({ type: "blob" });

      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = `${props.paste.id}.zip`;
      document.body.appendChild(element);
      element.click();

      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
      setDlStatus(false);

      toast.success("Successfully generated zip for download!");
    } catch (err) {
      toast.error(`Unable to generate zip: ${err}`);
    }
  };

  return (
    <div class="flexc" id="metaInfo">
      <div class={`${styles.metaInner} flexc gap-0.5`}>
        <div class={styles.partInfo}>
          <a class={styles.identifier} href={`/${props.paste.id}`}>
            /{props.paste.id}
          </a>
          <div class={styles.partInfo}>
            <span>Pasted via {props.paste.web ? "web" : "api"}</span>
          </div>
        </div>
        <div class={styles.partInfo}>
          <div class={`${styles.button} ${styles.copyButton}`} onclick={copyURL}>
            <FaSolidCopy />
            <span>Copy URL</span>
          </div>
          <a class={styles.button} href={rawURL()} target="_blank" rel="noreferrer">
            <FaSolidCode />
            <span>View Raw</span>
          </a>
          <div class={styles.button} onclick={downloadPaste}>
            <Switch>
              <Match when={!dlStatus()}>
                <FaSolidDownload />
                <span>Download</span>
              </Match>
              <Match when={dlStatus()}>Generating Download...</Match>
            </Switch>
          </div>
        </div>
        <div class={styles.partInfo}>
          <span>
            <FaSolidClockFour />
            <RelativeTimeDisplay timestamp={props.paste.created_at} />
          </span>
          <Switch>
            <Match when={props.paste.expires_at}>
              <span>
                <FaSolidHourglass1 />
                <RelativeTimeDisplay timestamp={props.paste.expires_at!} />
              </span>
            </Match>
            <Match when={!props.paste.expires_at}>
              <span>
                <FaSolidHourglass1 />
                Never
              </span>
            </Match>
          </Switch>
          <span>
            <FaSolidEye />
            {props.paste.views} views
          </span>
        </div>
      </div>
      <div class="saveButton reportButton">Report</div>
    </div>
  );
};

export default MetaInfoWith;
