import { clientOnly } from "@solidjs/start";
import MetaInfo from "~/components/MetaInfo";
import { pasteStore, setPasteStore } from "~/stores";
import type { PasteFileCreate } from "~/types/files";
import TopBar from "../components/Topbar";

export default function Home() {
  const IEditor = clientOnly(() => import("../components/Editor"));

  const addFile = () => {
    if (pasteStore.files.length >= 5) {
      return;
    }

    setPasteStore("files", (currentFiles) => [...currentFiles, {} as PasteFileCreate]);
  };

  return (
    <main>
      <TopBar></TopBar>
      <div class="wrapper">
        <div class="inner">

          <IEditor />
        </div>
        <MetaInfo onAddFile={addFile} />
      </div>
    </main>
  );
}
