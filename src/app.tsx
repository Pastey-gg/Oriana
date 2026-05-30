import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./styles/root.scss";
import "./styles/app.scss";
import { Toaster } from "solid-toast";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Suspense>
            <Toaster
              position="bottom-center"
              gutter={16}
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
      <FileRoutes />
    </Router>
  );
}
