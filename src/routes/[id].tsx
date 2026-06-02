import { type Params, useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, Match, on, Show, Switch } from "solid-js";
import FooterBar from "~/components/Footer";
import MetaInfoWith from "~/components/MetaInfoWith";
import PasswordEnter from "~/components/PasswordEnter";
import type { PasteResponse } from "~/types/pastes";
import IEditor from "../components/ClientEditor";
import TopBar from "../components/Topbar";

interface ParamsT extends Params {
  id: string;
}

export default function ViewPaste() {
  const navigate = useNavigate();
  const params: ParamsT = useParams();
  const [gated, setGated] = createSignal(false);
  const [paste, setPaste] = createSignal<PasteResponse | undefined>(undefined);
  const [password, setPassword] = createSignal<string | null>(null);

  const fetchPaste = async () => {
    // TODO: Error stuffs...
    let resp: Response;

    try {
      const storageKey = `oriana:safety-token:${params.id}`;
      const safetyToken = typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;
      const url = new URL(`${import.meta.env.VITE_API_HOST}/pastes/${params.id}`);

      if (safetyToken) {
        url.searchParams.set("skip_view", "true");
      }
      const headers: HeadersInit = {};

      if (safetyToken) {
        headers["X-Safety-Token"] = safetyToken;
      }
      if (password()) {
        headers.Authorization = password() as string;
      }

      resp = await fetch(url, { headers });
      if (resp.status === 200 && safetyToken && typeof window !== "undefined") {
        sessionStorage.removeItem(storageKey);
      }
      if (resp.status === 200) {
        return await resp.json();
      }
    } catch (error) {
      console.error(error);
      return navigate("/error");
    }

    if (resp.status === 401) {
      setGated(true);
      return;
    }

    if (resp.status === 404) {
      return navigate("/404");
    }

    return navigate("/error");
  };

  createEffect(
    on([password, paste], async () => {
      if (paste()) {
        return;
      }

      const pasteResp = await fetchPaste();
      if (pasteResp) {
        setPaste(pasteResp);
        setGated(false);
      }
    }),
  );

  return (
    <main>
      <TopBar></TopBar>
      <div class="wrapper">
        <Switch>
          <Match when={!gated() && paste()}>
            <div class="inner">
              <IEditor paste={paste()} />
            </div>
            <Show when={paste()}>
              <MetaInfoWith paste={paste()!} />
            </Show>
          </Match>
          <Match when={gated()}>
            <PasswordEnter setPassword={setPassword} />
          </Match>
        </Switch>
      </div>
      <FooterBar />
    </main>
  );
}
