import { onCleanup, onMount } from "solid-js";
import styles from "../styles/ThemeToggle.module.scss";

type Theme = "light" | "dark";

const getTheme = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
};

export default function ThemeToggle() {
  let buttonRef!: HTMLButtonElement;

  const syncLabel = () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    const label = `Switch to ${nextTheme} theme`;

    buttonRef.setAttribute("aria-label", label);
    buttonRef.title = label;
  };

  const toggleTheme = () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
    syncLabel();
  };

  onMount(() => {
    syncLabel();

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      if (event.newValue === "dark" || event.newValue === "light") {
        document.documentElement.setAttribute("data-theme", event.newValue);
        document.documentElement.style.colorScheme = event.newValue;
      }
      syncLabel();
    };

    window.addEventListener("storage", onStorage);
    onCleanup(() => window.removeEventListener("storage", onStorage));
  });

  return (
    <button
      ref={buttonRef}
      class={styles.themeButton}
      type="button"
      onClick={toggleTheme}
      aria-label="Switch theme"
      title="Switch theme"
    >
      <span class={styles.darkIcon} aria-hidden="true">
        <svg
          aria-hidden="true"
          role="presentation"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20.9 13.4A8 8 0 0 1 10.6 3.1 8.8 8.8 0 1 0 20.9 13.4Z" />
        </svg>
      </span>
      <span class={styles.lightIcon} aria-hidden="true">
        <svg
          aria-hidden="true"
          role="presentation"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 17.7 1.4 1.4" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.3 17.7-1.4 1.4" />
          <path d="m19.1 4.9-1.4 1.4" />
        </svg>
      </span>
    </button>
  );
}
