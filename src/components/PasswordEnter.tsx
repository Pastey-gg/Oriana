import type { Component, Setter } from "solid-js";
import styles from "../styles/Password.module.scss";

interface Props {
  setPassword: Setter<string | null>;
}

const PasswordEnter: Component<Props> = (props) => {
  // biome-ignore lint/suspicious/noImplicitAnyLet: ...
  let inp;

  const onSubmit = () => {
    if (!inp) {
      return;
    }

    const ele = inp as HTMLInputElement;
    const val = ele.value;

    if (!val) {
      return;
    }
    props.setPassword(val);
  };
  return (
    <div class={styles.wrapper}>
      <span class={styles.passwordHeader}>❌ This paste is password protected!</span>
      <span class={styles.innerHeader}>Please enter the password to continue...</span>
      <input type="password" ref={inp}></input>
      <div class="saveButton w-14 error" onclick={onSubmit}>
        Enter
      </div>
    </div>
  );
};

export default PasswordEnter;
