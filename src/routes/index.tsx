import { clientOnly } from "@solidjs/start";
import MetaInfo from "~/components/MetaInfo";
import TopBar from "../components/Topbar";

export default function Home() {
  const IEditor = clientOnly(() => import("../components/Editor"));
  return (
    <main>
      <TopBar></TopBar>
      <div class="wrapper">
        <div class="inner">
          <IEditor />
        </div>
        <MetaInfo />
      </div>
    </main>
  );
}
