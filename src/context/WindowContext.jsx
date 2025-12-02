import { createContext, useContext, useState } from "react";
import { getWindowDefinition } from "../config/windowsRegistry";

const WindowContext = createContext();
export const useWindowManager = () => useContext(WindowContext);

const createWindow = (id) => {
  const def = getWindowDefinition(id);

  const width = def?.defaultSize?.width ?? 500;
  const height = def?.defaultSize?.height ?? 380;

  return {
    id,
    x: 180,
    y: 120,
    width,
    height,
    minimized: false,
    maximized: false,
    zIndex: 1,
  };
};

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);

  const bringToFront = (id) => {
    setWindows((prev) => {
      const maxZ = prev.reduce(
        (max, w) => (w.zIndex > max ? w.zIndex : max),
        1
      );
      const newZ = maxZ + 1;

      return prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w));
    });
  };

  const openWindow = (id) => {
    const def = getWindowDefinition(id);
    if (!def) {
      console.warn(`No existe una ventana definida para el id: "${id}"`);
      return;
    }

    setWindows((prev) => {
      const exists = prev.some((w) => w.id === id);
      if (exists) return prev;
      return [...prev, createWindow(id)];
    });
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleMinimize = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
  };

  const toggleMaximize = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  };

  const moveWindow = (id, x, y) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        toggleMinimize,
        toggleMaximize,
        bringToFront,
        moveWindow,
      }}>
      {children}
    </WindowContext.Provider>
  );
}
