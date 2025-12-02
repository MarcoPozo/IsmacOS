import "./Window.css";
import { getWindowDefinition } from "../../config/windowsRegistry";
import { useWindowManager } from "../../context/WindowContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FiX, FiMinus, FiSquare } from "react-icons/fi";
import { useRef } from "react";

export default function Window({ data }) {
  const { id, x, y, width, height, minimized, maximized, zIndex } = data;

  const {
    closeWindow,
    toggleMinimize,
    toggleMaximize,
    bringToFront,
    moveWindow,
  } = useWindowManager();

  const navigate = useNavigate();
  const location = useLocation();
  const windowRef = useRef(null);

  const dragRef = useRef({
    dragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: x,
    startY: y,
  });

  const def = getWindowDefinition(id);
  const WindowContent = def?.component;
  const TitleIcon = def?.icon;
  const title = def?.title ?? "Ventana";

  const handleClose = () => {
    closeWindow(id);

    if (def?.route && location.pathname === def.route) {
      navigate("/");
    }
  };

  const handleHeaderMouseDown = (e) => {
    if (maximized || minimized) return;

    bringToFront(id);

    dragRef.current = {
      dragging: true,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: x,
      startY: y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const state = dragRef.current;
    if (!state.dragging || !windowRef.current) return;

    const dx = e.clientX - state.startMouseX;
    const dy = e.clientY - state.startMouseY;

    windowRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseUp = (e) => {
    const state = dragRef.current;
    if (!state.dragging) return;

    dragRef.current.dragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    const dx = e.clientX - state.startMouseX;
    const dy = e.clientY - state.startMouseY;

    const finalX = state.startX + dx;
    const finalY = state.startY + dy;

    moveWindow(id, finalX, finalY);

    if (windowRef.current) {
      windowRef.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <div
      ref={windowRef}
      className={`window ${maximized ? "window--max" : ""} ${
        minimized ? "window--min" : ""
      }`}
      style={{
        top: maximized ? 0 : y,
        left: maximized ? 0 : x,
        width: maximized ? "100%" : width,
        height: maximized ? "calc(100vh - var(--taskbar-height))" : height,
        zIndex,
      }}
      onMouseDown={() => bringToFront(id)}>
      <div className="window__header" onMouseDown={handleHeaderMouseDown}>
        <div className="window__title">
          {TitleIcon && (
            <span className="window__title-icon">
              <TitleIcon size={14} />
            </span>
          )}
          {title}
        </div>

        <div className="window__actions">
          <button onClick={() => toggleMinimize(id)}>
            <FiMinus />
          </button>

          <button onClick={() => toggleMaximize(id)}>
            <FiSquare />
          </button>

          <button onClick={handleClose} className="danger">
            <FiX />
          </button>
        </div>
      </div>

      <div className="window__content">
        {WindowContent ? <WindowContent /> : null}
      </div>
    </div>
  );
}
