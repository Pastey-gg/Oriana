import { type Component, createMemo, createSignal, onCleanup } from "solid-js";

interface Props {
  timestamp: string;
  updateInterval?: number; // ms
}

const cutoffs = [60, 3600, 86400, 604800, 2419200, 29030400, Infinity];
const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

const RelativeTimeDisplay: Component<Props> = (props) => {
  const [now, setNow] = createSignal(Date.now());
  const timer = setInterval(() => setNow(Date.now()), props.updateInterval ?? 60000);
  onCleanup(() => clearInterval(timer));

  const dtToString = createMemo(() => {
    const timestamp = Date.parse(props.timestamp);
    const delta = Math.round((timestamp - now()) / 1000);
    const index = cutoffs.findIndex((cutoff) => Math.abs(delta) < cutoff);
    const divisor = index ? cutoffs[index - 1] : 1;

    const formatter = new Intl.RelativeTimeFormat(navigator.language, {
      numeric: "auto",
    });

    return formatter.format(Math.round(delta / divisor), units[index]);
  });

  return <time datetime={new Date(props.timestamp).toISOString()}>{dtToString()}</time>;
};

export default RelativeTimeDisplay;
