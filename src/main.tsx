import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import { TranslatorProvider } from "./provider/TranslatorProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TranslatorProvider>
      <App />
    </TranslatorProvider>
  </StrictMode>
);
