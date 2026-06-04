import { useNavigate } from "@solidjs/router";
import type { ParentComponent } from "solid-js";
import { setPasteStore } from "~/stores";
import FaBrandsDiscord from "~/svgs/Discord";
import FaBrandsGithub from "~/svgs/GitHub";
import Logo from "~/svgs/Logo";
import VsVscode from "~/svgs/VSC";
import type { PasteFileCreate } from "~/types/files";
import styles from "../styles/FooterBar.module.scss";

const FooterBar: ParentComponent = () => {
  const navigate = useNavigate();

  const goHome = () => {
    setPasteStore(() => ({ files: [{} as PasteFileCreate], password: undefined, expiry: undefined, view: undefined }));
    navigate("/");
  };

  return (
    <div class={styles.container}>
      <div class={styles.wrapper}>
        <div class={`${styles.col} ${styles.colc}`}>
          <a
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
            <a href="https://github.com/Pastey-gg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaBrandsGithub />
            </a>
            <a href="https://discord.gg/RAKc3HF" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FaBrandsDiscord />
            </a>
            <VsVscode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
