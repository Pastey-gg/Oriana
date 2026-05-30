import { type Params, useLocation, useNavigate, useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createResource, Show } from "solid-js";
import FooterBar from "~/components/Footer";
import MetaInfoWith from "~/components/MetaInfoWith";
import type { PasteResponse } from "~/types/pastes";
import TopBar from "../components/Topbar";

interface ParamsT extends Params {
  id: string;
}

export default function ViewPaste() {
  const IEditor = clientOnly(() => import("../components/Editor"));
  const location = useLocation();
  const navigate = useNavigate();
  const params: ParamsT = useParams();

  const fetchPaste = async () => {
    // TODO: Error stuffs...
    let resp: Response;

    try {
      const storageKey = "oriana:safety-token:" + params.id;
      const safetyToken = typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;
      const url = new URL(`${import.meta.env.VITE_API_HOST}/pastes/${params.id}`);

      if (safetyToken) {
        url.searchParams.set("skip_view", "true");
      }
      const headers: HeadersInit = {};

      if (safetyToken) {
        headers["X-Safety-Token"] = safetyToken;
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

    if (resp.status === 404) {
      return navigate("/404");
    }

    return navigate("/error");
  };

  const [pasteResp] = createResource<PasteResponse, Promise<string>>(async () => location.pathname, fetchPaste);

  return (
    <main>
      <TopBar></TopBar>
      <div class="wrapper">
        <div class="inner">
          <IEditor paste={pasteResp()} />
        </div>
        <Show when={pasteResp()}>
          <MetaInfoWith paste={pasteResp()!} />
        </Show>
      </div>
      <FooterBar />
    </main>
  );
}
