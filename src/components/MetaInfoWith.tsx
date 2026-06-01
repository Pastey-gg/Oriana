import { Match, type ParentComponent, Switch } from "solid-js";
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
          <div class={`${styles.button} ${styles.copyButton}`}>
            <FaSolidCopy />
            <span>Copy URL</span>
          </div>
          <div class={styles.button}>
            <FaSolidCode />
            <span>View Raw</span>
          </div>
          <div class={styles.button}>
            <FaSolidDownload />
            <span>Download</span>
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
