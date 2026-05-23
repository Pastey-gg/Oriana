import { clientOnly } from "@solidjs/start";
import TopBar from "../components/Topbar";

export default function Home() {
  const IEditor = clientOnly(() => import("../components/Editor"));
  return (
    <main>
      <TopBar></TopBar>
      <div class="inner">
        <IEditor />
      </div>
    </main>
  );
}
