import "./TaskBar.css";
import { useState } from "react";
import { useWindowManager } from "../../context/WindowContext";

import TaskbarWindowButton from "../TaskbarWindowButton/TaskbarWindowButton";
import StartMenu from "../StartMenu/StartMenu";

export default function TaskBar() {
  const { windows } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  const handleStart = () => {
    setStartOpen((prev) => !prev);
  };

  return (
    <>
      <div className="taskbar">
        <div className="taskbar__left">
          <button className="taskbar__start-button" onClick={handleStart}>
            Inicio
          </button>
        </div>

        <div className="taskbar__center">
          {windows.map((w) => (
            <TaskbarWindowButton key={w.id} id={w.id} minimized={w.minimized} />
          ))}
        </div>

        <div className="taskbar__right"></div>
      </div>

      <StartMenu isOpen={startOpen} />
    </>
  );
}
