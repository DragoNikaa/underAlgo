import "./shared/styles/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";
import { initializeCSRFToken } from "./shared/api/csrf.ts";

await initializeCSRFToken();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
