import "virtual:uno.css";
import "@thisbeyond/solid-select/style.css";

import { Route, Router } from "@solidjs/router";
import { onMount, Suspense } from "solid-js";
import "./styles/root.scss";
import "./styles/app.scss";
import { Toaster } from "solid-toast";
import ViewPaste from "./routes/[id]";
import NotFound from "./routes/404";
import DocsPage from "./routes/docs";
import ErrorPage from "./routes/error";
import Home from "./routes/index";
import PrivacyPage from "./routes/privacy";
import TermsPage from "./routes/terms";

export default function App() {
  onMount(() => {
    requestAnimationFrame(() => {
      document.documentElement.dataset.themeReady = "true";
    });
  });

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
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/docs" component={DocsPage} />
    </Router>
  );
}
