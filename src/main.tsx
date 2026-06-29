import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SupabaseAccountProvider } from "./hooks/useSupabaseAccount";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseAccountProvider>
      <App />
    </SupabaseAccountProvider>
  </React.StrictMode>,
);
