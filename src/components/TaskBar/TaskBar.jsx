import "./TaskBar.css";
import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
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
      <div className="taskbar">
        <div className="taskbar__side taskbar__left" />

        <div className="taskbar__center">
          <button
            ref={startButtonRef}
            className="taskbar__icon-button taskbar__icon-button--start"
            onClick={handleStart}
            type="button"
          >
            <span className="taskbar__start-logo" />
          </button>

          <button
            className="taskbar__icon-button"
            type="button"
          >
            <FiSearch size={18} />
          </button>

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
      </div>

      <StartMenu
        isOpen={startOpen}
        onClose={handleCloseStart}
        anchorRef={startButtonRef}
      />
    </>
  );
}
