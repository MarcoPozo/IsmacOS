import { useWindowManager } from "../../context/WindowContext";
import { getWindowDefinition } from "../../config/windowsRegistry";
import TaskbarIconButton from "../TaskbarIconButton/TaskbarIconButton";

export default function TaskbarWindowButton({ id, minimized }) {
  const { bringToFront, toggleMinimize } = useWindowManager();

  const def = getWindowDefinition(id);
  const Icon = def?.icon;
  const iconImage = def?.iconImage;

  const handleClick = () => {
    if (minimized) {
      toggleMinimize(id);
      bringToFront(id);
      return;
    }
    bringToFront(id);
  };

  return (
    <TaskbarIconButton
      ariaLabel={def?.title ?? id}
      iconImage={iconImage}
      Icon={Icon}
      minimized={minimized}
      extraClassName="taskbar__icon-button--app"
      onClick={handleClick}
    />
  );
}
