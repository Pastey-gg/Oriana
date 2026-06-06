import { createSignal, For, onCleanup, onMount } from "solid-js";
import styles from "../styles/ThemeToggle.module.scss";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

type ThemeOption = {
  value: ThemePreference;
  label: string;
  icon: "sun" | "moon" | "monitor";
};

const getSystemTheme = (): Theme => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const getPreference = (): ThemePreference => {
  const theme = localStorage.getItem("theme");
  return theme === "dark" || theme === "light" || theme === "system" ? theme : "system";
};

const resolveTheme = (preference: ThemePreference): Theme => (preference === "system" ? getSystemTheme() : preference);

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
};

const setTheme = (preference: ThemePreference) => {
  applyTheme(resolveTheme(preference));
  document.documentElement.dataset.themePreference = preference;
  localStorage.setItem("theme", preference);
};

const options: ThemeOption[] = [
  { value: "light", label: "Light theme", icon: "sun" },
  { value: "dark", label: "Dark theme", icon: "moon" },
  { value: "system", label: "System theme", icon: "monitor" },
];

const ThemeIcon = (props: { icon: ThemeOption["icon"] }) => {
  if (props.icon === "moon") {
    return (
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
    );
  }

  if (props.icon === "monitor") {
    return (
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
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    );
  }

  return (
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
  );
};

export default function ThemeToggle() {
  const [preference, setPreference] = createSignal<ThemePreference>("system");

  const selectTheme = (nextPreference: ThemePreference) => {
    setTheme(nextPreference);
    setPreference(nextPreference);
  };

  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const currentPreference = getPreference();
    setPreference(currentPreference);
    setTheme(currentPreference);

    const onSystemThemeChange = () => {
      if (getPreference() !== "system") return;
      applyTheme(getSystemTheme());
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      const nextPreference = getPreference();
      setPreference(nextPreference);
      setTheme(nextPreference);
    };

    media.addEventListener("change", onSystemThemeChange);
    window.addEventListener("storage", onStorage);
    onCleanup(() => {
      media.removeEventListener("change", onSystemThemeChange);
      window.removeEventListener("storage", onStorage);
    });
  });

  return (
    <fieldset
      class={styles.themeToggle}
      classList={{
        [styles.light]: preference() === "light",
        [styles.dark]: preference() === "dark",
        [styles.system]: preference() === "system",
      }}
    >
      <legend class={styles.label}>Theme preference</legend>
      <For each={options}>
        {(option) => (
          <button
            class={styles.themeButton}
            classList={{ [styles.active]: preference() === option.value }}
            type="button"
            aria-pressed={preference() === option.value}
            aria-label={option.label}
            title={option.label}
            onClick={() => selectTheme(option.value)}
          >
            <ThemeIcon icon={option.icon} />
          </button>
        )}
      </For>
    </fieldset>
  );
}
