import "./TaskBar.css";

export default function TaskBar() {
  return (
    <div className="taskbar">
      <div className="taskbar__left">
        <button className="taskbar__start-button">Inicio</button>
      </div>

      <div className="taskbar__center">
        <span className="taskbar__hint">Barra de tareas</span>
      </div>

      <div className="taskbar__right"></div>
    </div>
  );
}
