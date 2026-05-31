import { A } from "@solidjs/router";
import type { ParentComponent } from "solid-js";
import Logo from "~/svgs/Logo";
import styles from "../styles/Topbar.module.scss";

interface Props {
  id?: string;
}

const NavBar: ParentComponent<Props> = (props) => {
  return (
    <div class={styles.container}>
      <div class={styles.topRow}>
        <A
          href="/"
          class="header fs-1.1 fb flex ai-center gap-.4"
          onclick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          <span class="logo">
            <Logo />
          </span>
          <span>pastey.gg</span>
        </A>
      </div>
      <div class={styles.metaRow}>{props.children}</div>
    </div>
  );
};

export default NavBar;
