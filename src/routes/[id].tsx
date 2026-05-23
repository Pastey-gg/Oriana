import { type Params, useLocation, useNavigate, useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createResource } from "solid-js";
import MetaInfoWith from "~/components/MetaInfoWith";
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
      resp = await fetch(`${import.meta.env.VITE_API_HOST}/pastes/${params.id}`);
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
      <div class="inner">
        <IEditor />
      </div>
      <MetaInfoWith />
    </main>
  );
}
