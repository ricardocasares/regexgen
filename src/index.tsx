import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw Error("Root element not found, check index.html");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
