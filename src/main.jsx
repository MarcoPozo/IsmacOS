import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { WindowProvider } from "./context/WindowContext";
import App from "./App.jsx";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WindowProvider>
      <App />
    </WindowProvider>
  </StrictMode>
);
