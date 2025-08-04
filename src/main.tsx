import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GameSettingsProvider } from "./contexts/GameSettingsContext";
import { InputTrackerProvider } from "./contexts/InputTrackerContext/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InputTrackerProvider>
      <GameSettingsProvider>
        <App />
      </GameSettingsProvider>
    </InputTrackerProvider>
  </StrictMode>
);
