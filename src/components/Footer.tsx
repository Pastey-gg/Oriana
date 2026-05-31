import type { ParentComponent } from "solid-js";
import FaBrandsDiscord from "~/svgs/Discord";
import FaBrandsGithub from "~/svgs/GitHub";
import Logo from "~/svgs/Logo";
import VsVscode from "~/svgs/VSC";
import styles from "../styles/FooterBar.module.scss";

const FooterBar: ParentComponent = () => {
  return (
    <div class={styles.container}>
      <div class={styles.wrapper}>
        <div class={`${styles.col} ${styles.colc}`}>
          <a
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
          </a>
          0.1.0a
        </div>
        <div class={`${styles.col} ${styles.colc}`}>
          <b class={styles.header}>Links</b>
          <hr />
          <div class={`${styles.col} ${styles.colc}`}>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms and Conditions</a>
          </div>
        </div>
        <div class={`${styles.col} ${styles.colc}`}>
          <b class={styles.header}>Social</b>
          <hr />
          <div class={`${styles.col} ${styles.icons}`}>
            <FaBrandsGithub />
            <FaBrandsDiscord />
            <VsVscode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
