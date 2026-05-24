import { clientOnly } from "@solidjs/start";
import { createSignal } from "solid-js";
import MetaInfo from "~/components/MetaInfo";
import TopBar from "../components/Topbar";

export default function Home() {
  const IEditor = clientOnly(() => import("../components/Editor"));
  const [fileCount, setFileCount] = createSignal(1);

  return (
    <main>
      <TopBar></TopBar>
      <div class="wrapper">
        <div class="inner">
          <IEditor fileCount={fileCount()} />
        </div>
        <MetaInfo onAddFile={() => setFileCount((n) => n + 1)} />
      </div>
    </main>
  );
}
