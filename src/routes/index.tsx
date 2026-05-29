import { clientOnly } from "@solidjs/start";
import { createSignal } from "solid-js";
import MetaInfo from "~/components/MetaInfo";
import type { PasteFileCreate } from "~/types/files";
import TopBar from "../components/Topbar";

export default function Home() {
  const IEditor = clientOnly(() => import("../components/Editor"));
  const [files, setFiles] = createSignal<Array<PasteFileCreate>>([]);

  const addFile = () => {
    if (files.length >= 5) {
      return;
    }

    setFiles((prev) => [{} as PasteFileCreate, ...prev]);
  };

  return (
    <main>
      <TopBar></TopBar>
      <div class="wrapper">
        <div class="inner">
          <IEditor fileCount={files().length} />
        </div>
        <MetaInfo onAddFile={addFile} />
      </div>
    </main>
  );
}
