import { forwardRef } from "react";
import "../TaskBar/TaskBar.css";

const TaskbarIconButton = forwardRef(
  (
    {
      ariaLabel,
      iconImage,
      Icon,
      minimized = false,
      extraClassName = "",
      onClick,
    },
    ref
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        className={`taskbar__icon-button ${extraClassName} ${
          minimized ? "taskbar__icon-button--minimized" : ""
        }`}
        onClick={onClick}
        aria-label={ariaLabel}>
        <span className="taskbar__icon">
          {iconImage ? (
            <img
              src={iconImage}
              alt=""
              aria-hidden="true"
              className="taskbar__icon-img"
            />
          ) : Icon ? (
            <Icon size={18} />
          ) : null}
        </span>
      </button>
    );
  }
);

export default TaskbarIconButton;
