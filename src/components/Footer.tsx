import type { ParentComponent } from "solid-js";
import styles from "../styles/FooterBar.module.scss";

const FooterBar: ParentComponent = () => {
  return (
    <div class={styles.container}>
      <div class={styles.wrapper}>
        <div class={styles.col}>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms and Conditions</a>
        </div>
        <div class={styles.col}>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms and Conditions</a>
        </div>
        <div class={styles.col}>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
