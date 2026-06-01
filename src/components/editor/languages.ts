let languageLoaderPromise: Promise<void> | undefined;

export const ensureEditorLanguagesLoaded = () => {
  if (languageLoaderPromise) return languageLoaderPromise;

  languageLoaderPromise = import("solid-prism-editor/prism/languages/common")
    .then(() => import("solid-prism-editor/prism/languages/toml"))
    .then(() => undefined)
    .catch((error) => {
      console.error("Failed to load Prism language module", error);
    });

  return languageLoaderPromise;
};
