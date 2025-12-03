import "./TaskBar.css";
import { useState, useRef } from "react";
import { useWindowManager } from "../../context/WindowContext";

import TaskbarWindowButton from "../TaskbarWindowButton/TaskbarWindowButton";
import StartMenu from "../StartMenu/StartMenu";

export default function TaskBar() {
  const { windows } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  const startButtonRef = useRef(null);

  const handleStart = () => {
    setStartOpen((prev) => !prev);
  };

  const handleCloseStart = () => {
    setStartOpen(false);
  };

  return (
    <>
      <nav className="taskbar" aria-label="Barra de tareas">
        <div className="taskbar__side taskbar__left" />

        <div className="taskbar__center">
          <div className="taskbar__center-group">
            <button
              ref={startButtonRef}
              className="taskbar__icon-button"
              onClick={handleStart}
              type="button"
              aria-label="Abrir menú Inicio">
              <span className="taskbar__icon">
                <img
                  src="/images/icons/logoSismac64.png"
                  alt="Logo IsmacOS"
                  className="taskbar__icon-img"
                />
              </span>
            </button>

            <button
              className="taskbar__icon-button"
              type="button"
              aria-label="Abrir búsqueda">
              <span className="taskbar__icon">
                <img
                  src="/images/icons/buscar.png"
                  alt="Logo buscar"
                  className="taskbar__icon-img"
                />
              </span>
            </button>
          </div>

          <div className="taskbar__apps">
            {windows.map((w) => (
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
