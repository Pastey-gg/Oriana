import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import FooterBar from "./Footer";
import TopBar from "./Topbar";

interface Props {
  title: string;
  message: string;
  titleColor: string;
}

const StatusPage: Component<Props> = (props) => {
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
        <h1 class="header" style={{ margin: "0", "font-size": "4rem", color: props.titleColor }}>
          {props.title}
        </h1>
        <p style={{ margin: "0", color: "var(--secondary-color)" }}>{props.message}</p>
        <A href="/" class="noa" style={{ color: "var(--success)", "text-decoration": "underline" }}>
          Go home
        </A>
      </div>
      <FooterBar />
    </main>
  );
};

export default StatusPage;
