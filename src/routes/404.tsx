import { A } from "@solidjs/router";
import FooterBar from "~/components/Footer";
import TopBar from "~/components/Topbar";

export default function NotFound() {
  return (
    <main>
      <TopBar />
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          "justify-content": "center",
          flex: "1",
          gap: "1rem",
          "text-align": "center",
          padding: "2rem",
        }}
      >
        <h1 class="header" style={{ margin: "0", "font-size": "4rem", color: "var(--accent-color)" }}>404</h1>
        <p style={{ margin: "0", color: "var(--secondary-color)" }}>That paste doesn't exist or has been removed.</p>
        <A href="/" class="noa" style={{ color: "var(--success)", "text-decoration": "underline" }}>Go home</A>
      </div>
      <FooterBar />
    </main>
  );
}
