import { windowsRegistry } from "../config/windowsRegistry";
import { useWindowManager } from "../context/WindowContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Desktop from "../pages/Desktop/Desktop";
import Window from "../components/Window/Window";

export default function DesktopLayout() {
  const { windows, openWindow, closeWindow } = useWindowManager();
  const location = useLocation();

  useEffect(() => {
    Object.values(windowsRegistry).forEach((def) => {
      const shouldBeOpen = def.route === location.pathname;

      if (shouldBeOpen) {
        openWindow(def.id);
      } else {
        closeWindow(def.id);
      }
    });

  }, [location.pathname]);

  return (
    <>
      <Desktop />

      {windows.map((window) => (
        <Window key={window.id} data={window} />
      ))}
    </>
  );
}
