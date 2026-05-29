import { clientOnly } from "@solidjs/start";
import MetaInfo from "~/components/MetaInfo";
import { pasteStore, setMetaStore, setPasteStore } from "~/stores";
import type { PasteFileCreate } from "~/types/files";
import TopBar from "../components/Topbar";

export default function Home() {
  const IEditor = clientOnly(() => import("../components/Editor"));

  const addFile = () => {
    if (pasteStore.files.length >= 5) {
      return;
    }

    const nextFileIndex = pasteStore.files.length;

    setPasteStore("files", (currentFiles) => [...currentFiles, { content: "" } as PasteFileCreate]);
    setMetaStore("currentFile", nextFileIndex);
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
