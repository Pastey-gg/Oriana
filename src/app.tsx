import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./styles/root.scss";
import "./styles/app.scss";
import TopBar from "./components/Topbar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <TopBar></TopBar>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
