import "./TaskBar.css";
import { useState, useRef } from "react";
import { useWindowManager } from "../../context/WindowContext";

import StartMenu from "../StartMenu/StartMenu";
import TaskbarWindowButton from "../TaskbarWindowButton/TaskbarWindowButton";
import TaskbarIconButton from "../TaskbarIconButton/TaskbarIconButton";
import { getPinnedApps } from "../../config/windowsRegistry";

export default function TaskBar() {
  const { windows, openWindow, bringToFront, toggleMinimize } =
    useWindowManager();

  const [startOpen, setStartOpen] = useState(false);
  const startButtonRef = useRef(null);

  const pinnedApps = getPinnedApps();

  const handleStart = () => {
    setStartOpen((prev) => !prev);
  };

  const handleCloseStart = () => {
    setStartOpen(false);
  };

  const handlePinnedClick = (app) => {
    const existingWindow = windows.find((w) => w.id === app.id);

    if (!existingWindow) {
      openWindow(app.id);
      return;
    }

    if (existingWindow.minimized) {
      toggleMinimize(app.id);
    }

    bringToFront(app.id);
  };

  const nonPinnedWindows = windows.filter(
    (w) => !pinnedApps.some((app) => app.id === w.id)
  );

  return (
    <>
      <nav className="taskbar" aria-label="Barra de tareas">
        <div className="taskbar__side taskbar__left" />

        <div className="taskbar__center">
          <div className="taskbar__center-group">
            <TaskbarIconButton
              ref={startButtonRef}
              ariaLabel="Abrir menú Inicio"
              iconImage="/images/icons/logoSismac64.png"
              extraClassName="taskbar__icon-button--start"
              onClick={handleStart}
            />

            <TaskbarIconButton
              ariaLabel="Abrir búsqueda"
              iconImage="/images/icons/buscar.png"
              extraClassName="taskbar__icon-button--search"
              onClick={() => {
              }}
            />

            {/* Apps fijas */}
            {pinnedApps.map((app) => {
              const existingWindow = windows.find((w) => w.id === app.id);
              const isMinimized = existingWindow?.minimized ?? false;

              return (
                <TaskbarIconButton
                  key={app.id}
                  ariaLabel={app.title}
                  iconImage={app.iconImage}
                  Icon={app.icon}
                  minimized={isMinimized}
                  extraClassName="taskbar__icon-button--app taskbar__icon-button--pinned"
                  onClick={() => handlePinnedClick(app)}
                />
              );
            })}

            {/* Apps no fijas */}
            {nonPinnedWindows.map((w) => (
              <TaskbarWindowButton
                key={w.id}
                id={w.id}
                minimized={w.minimized}
              />
            ))}
          </div>
        </div>

        <div className="taskbar__side taskbar__right" />
      </nav>

      <StartMenu
        isOpen={startOpen}
        onClose={handleCloseStart}
        anchorRef={startButtonRef}
      />
    </>
  );
}
