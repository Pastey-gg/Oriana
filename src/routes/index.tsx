import { onMount } from "solid-js";
import FooterBar from "~/components/Footer";
import MetaInfo from "~/components/MetaInfo";
import { createDraftFile, pasteStore, setDraftStore, setPasteStore } from "~/stores";
import IEditor from "../components/Editor";
import TopBar from "../components/Topbar";

export default function Home() {
  onMount(() => setDraftStore("currentFile", 0));
  const addFile = () => {
    if (pasteStore.files.length >= 5) {
      return;
    }

    const nextFileIndex = pasteStore.files.length;

    setPasteStore("files", (currentFiles) => [...currentFiles, createDraftFile()]);
    setDraftStore("currentFile", nextFileIndex);
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
      <FooterBar />
    </main>
  );
}
