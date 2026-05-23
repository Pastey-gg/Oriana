import type { ParentComponent } from "solid-js";
import { Logo } from "~/consts";
import styles from "../styles/Topbar.module.scss";

interface Props {
  id?: string;
}

const NavBar: ParentComponent<Props> = (props) => {
  return (
    <div class={styles.container}>
      <div class={styles.topRow}>
        <div class="header fs-1.1 fb flex ai-center gap-.4">
          <span class="logo">{Logo}</span>
          <span>pastey.gg</span>
        </div>
      </div>
      <div class={styles.metaRow}>{props.children}</div>
    </div>
  );
};

export default NavBar;
