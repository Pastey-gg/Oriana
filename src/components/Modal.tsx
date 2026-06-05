// biome-ignore assist/source/organizeImports: ...
import { Show, type JSX, type ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "../styles/Modal.module.scss";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: JSX.Element;
}

const Modal: ParentComponent<Props> = (props) => {
  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class={styles.overlay} onClick={props.onClose}>
          <div class={styles.container} onClick={(e) => e.stopPropagation()} role="dialog">
            <div class={styles.header}>
              <Show when={props.title}>
                <h3 class={styles.title}>{props.title}</h3>
              </Show>
              <button class={styles.closeButton} onClick={props.onClose} type="button">
                &times;
              </button>
            </div>
            <div>{props.children}</div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default Modal;
