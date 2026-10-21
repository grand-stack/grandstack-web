import "@fontsource-variable/public-sans";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { BrowserRouter } from "react-router";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { App } from "./App";
import "./theme/tokens.css";
import "./styles.css";

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider value={client}>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </Provider>
  </StrictMode>,
);
