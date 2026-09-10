import "./shared/styles/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";
import { fetchCSRFToken } from "./shared/api/csrf.ts";

await fetchCSRFToken();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
