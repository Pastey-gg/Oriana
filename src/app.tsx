import "virtual:uno.css";
import "@thisbeyond/solid-select/style.css";

import { Route, Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import "./styles/root.scss";
import "./styles/app.scss";
import { Toaster } from "solid-toast";
import NotFound from "./routes/404";
import ViewPaste from "./routes/[id]";
import ErrorPage from "./routes/error";
import Home from "./routes/index";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Suspense>
            <Toaster
              position="bottom-center"
              gutter={32}
              toastOptions={{
                className: "toasty",
                iconTheme: {
                  primary: "var(--accent-color)",
                },
              }}
            />
            {props.children}
          </Suspense>
        </>
      )}
    >
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/:id" component={ViewPaste} />
    </Router>
  );
}
