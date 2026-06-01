import { A, useNavigate } from "@solidjs/router";
import type { ParentComponent } from "solid-js";
import { setPasteStore } from "~/stores";
import Logo from "~/svgs/Logo";
import type { PasteFileCreate } from "~/types/files";
import styles from "../styles/Topbar.module.scss";
import ThemeToggle from "./ThemeToggle";

interface Props {
  id?: string;
}

const NavBar: ParentComponent<Props> = (props) => {
  const navigate = useNavigate();

  const goHome = () => {
    setPasteStore(() => ({ files: [{} as PasteFileCreate], password: undefined, expiry: undefined, view: undefined }));
    navigate("/");
  };

  return (
    <div class={styles.container}>
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
        <ThemeToggle />
      </div>
      <div class={styles.metaRow}>{props.children}</div>
    </div>
  );
};

export default NavBar;
