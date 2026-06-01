// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => {
  const _themeScript = `
  let theme = localStorage.getItem("theme");

  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
    
  document.documentElement.setAttribute("data-theme", theme);
  `;

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

            <script>{_themeScript}</script>
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  );
});