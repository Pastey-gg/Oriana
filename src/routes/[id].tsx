import { Params, useParams } from "@solidjs/router";
import { Resource } from "solid-js";
import { createResource } from "solid-js/types/server/rendering.js";

interface ParamsT extends Params {
  id: string;
}

async function fetchPaste(id: string): Promise<PasteResponse> {
  let resp: Response;

  try {
    resp = await fetch("");
  } catch (error) {}
}

export default function Home() {
  const params: ParamsT = useParams();
  const [paste] = createResource<PasteResponse, string>(() => params.id, fetchPaste);

  return <main></main>;
}
