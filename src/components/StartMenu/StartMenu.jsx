import "./StartMenu.css";

export default function StartMenu({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="startmenu glass-panel">
      <p className="startmenu__placeholder">Menú Inicio — Próximamente</p>
    </div>
  );
}
