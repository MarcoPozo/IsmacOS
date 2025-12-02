import "./TaskbarWindowButton.css";
import { useWindowManager } from "../../context/WindowContext";
import { getWindowDefinition } from "../../config/windowsRegistry";

export default function TaskbarWindowButton({ id, minimized }) {
  const { bringToFront, toggleMinimize } = useWindowManager();

  const def = getWindowDefinition(id);
  const Icon = def?.icon;

  const handleClick = () => {
    if (minimized) {
      toggleMinimize(id);
      bringToFront(id);
      return;
    }
    bringToFront(id);
  };

  return (
    <button
      className={`taskbar-window-button ${
        minimized ? "taskbar-window-button--minimized" : ""
      }`}
      onClick={handleClick}>
      {Icon && <Icon size={16} />}
      <span>{def?.title ?? id}</span>
    </button>
  );
}
