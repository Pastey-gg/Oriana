import { A, useNavigate } from "@solidjs/router";
import { createSignal, type ParentComponent } from "solid-js";
import { setDraftStore, setPasteStore } from "~/stores";
import FaSolidCog from "~/svgs/cog";
import Logo from "~/svgs/Logo";
import type { PasteFileCreate } from "~/types/files";
import styles from "../styles/Topbar.module.scss";
import SettingsModal from "./Settings";
import ThemeToggle from "./ThemeToggle";

interface Props {
  id?: string;
}

const NavBar: ParentComponent<Props> = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = createSignal(false);

  const goHome = () => {
    setPasteStore(() => ({
      files: [{ content: "" } as PasteFileCreate],
      password: undefined,
      expiry: undefined,
      views: undefined,
    }));
    setDraftStore("currentFile", 0);
    navigate("/");
  };

  return (
    <div class={styles.container}>
      <SettingsModal isOpen={modalOpen()} onClose={() => setModalOpen(false)} />
      <div class={styles.topRow}>
        <A
          href="/"
          class="header fs-1.1 fb flex ai-center gap-.4 noa"
          onclick={(e) => {
            e.preventDefault();
            goHome();
          }}
        >
          <span class="logo">
            <Logo />
          </span>
          <span>pastey.gg</span>
        </A>
        <div class={styles.controls}>
          <ThemeToggle />
          <span class={styles.separator} aria-hidden="true" />
          <button
            class={styles.settings}
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label="Open settings"
            title="Open settings"
          >
            <FaSolidCog />
          </button>
        </div>
      </div>
      <div class={styles.metaRow}>{props.children}</div>
    </div>
  );
};

export default NavBar;
