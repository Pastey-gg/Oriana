import type { ParentComponent } from "solid-js";
import styles from "../styles/Topbar.module.scss";
import { Logo } from "~/consts";

interface Props {
  id?: string;
}

const NavBar: ParentComponent<Props> = (props) => {
  return (
    <div class={styles.container}>
      <div class={styles.topRow}>
        <div class="header fs-1.2 fb flex ai-center gap-.6">
          <span class="logo">{Logo}</span>
          <span>pastey.gg</span>
        </div>
      </div>
      <div class={styles.metaRow}>{props.children}</div>
    </div>
  );
};

export default NavBar;
