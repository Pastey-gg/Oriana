import { createSignal, onMount, Show, type Component } from "solid-js";
import type { PasteResponse } from "~/types/pastes";

type EditorComponent = Component<{ paste?: PasteResponse }>;
type EditorModule = { default: EditorComponent };

interface Props {
  paste?: PasteResponse;
}

const ClientEditor: Component<Props> = (props) => {
  const [editorModule, setEditorModule] = createSignal<EditorModule>();
  const [loadError, setLoadError] = createSignal<Error>();

  onMount(() => {
    import("./Editor")
      .then((module) => setEditorModule({ default: module.default }))
      .catch((error: unknown) => {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error("Failed to load editor", err);
        setLoadError(err);
      });
  });

  return (
    <Show
      keyed={true}
      when={editorModule()}
      fallback={<Show when={loadError()} fallback={<div aria-busy="true" />}><div role="alert">Editor failed to load.</div></Show>}
    >
      {(module) => {
        const LoadedEditor = module.default;
        return <LoadedEditor paste={props.paste} />;
      }}
    </Show>
  );
};

export default ClientEditor;
