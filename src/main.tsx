import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "./registerSW.ts";
import App from "./App";

registerSW();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
