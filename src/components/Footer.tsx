import { useNavigate } from "@solidjs/router";
import { createMemo, createResource, type ParentComponent } from "solid-js";
import { createDraftFile, setDraftStore, setPasteStore } from "~/stores";
import FaBrandsDiscord from "~/svgs/Discord";
import FaBrandsGithub from "~/svgs/GitHub";
import Logo from "~/svgs/Logo";
import VsVscode from "~/svgs/VSC";
import styles from "../styles/FooterBar.module.scss";

interface VersionInfo {
  version: string;
  commit: string;
  commit_time: string;
}

const getBuildVersionInfo = (): VersionInfo | undefined => {
  const version = import.meta.env.VITE_PASTEY_VERSION;
  const commit = import.meta.env.VITE_ORIANA_COMMIT;
  const commitTime = import.meta.env.VITE_ORIANA_COMMIT_TIME;
  if (!version && !commit && !commitTime) {
    return;
  }

  return {
    version: version ?? "",
    commit: commit ?? "",
    commit_time: commitTime ?? "",
  };
};

const shortCommit = (commit?: string) => commit?.slice(0, 7);

const FooterBar: ParentComponent = () => {
  const navigate = useNavigate();
  const buildVersionInfo = getBuildVersionInfo();

  const [echoVersion] = createResource<VersionInfo>(async () => {
    let resp: Response;

    try {
      resp = await fetch(`${import.meta.env.VITE_API_HOST}/version/info`);
    } catch (error) {
      console.error(error);
      return;
    }

    if (resp.status >= 300) {
      console.error(`Status: ${resp.status} while fetching version info...`);
      return;
    }

    return await resp.json();
  });

  const orianaCommit = createMemo(() => shortCommit(buildVersionInfo?.commit));
  const echoCommit = createMemo(() => shortCommit(echoVersion()?.commit));

  const goHome = () => {
    setPasteStore(() => ({
      files: [createDraftFile()],
      password: undefined,
      expiry: undefined,
      views: undefined,
    }));
    setDraftStore("currentFile", 0);
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
          <span>v{buildVersionInfo?.version}</span>
          <span>Oriana: {orianaCommit()}</span>
          <span>Echo: {echoCommit()}</span>
        </div>
        <div class={`${styles.col} ${styles.colc}`}>
          <b class={styles.header}>Links</b>
          <hr />
          <div class={`${styles.col} ${styles.colc}`}>
            <a href="/docs">API Documentation</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms and Conditions</a>
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
            <a
              href="https://marketplace.visualstudio.com/items?itemName=pastey-gg.pastey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <VsVscode />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
