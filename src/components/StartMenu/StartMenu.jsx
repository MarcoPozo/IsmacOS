import "./StartMenu.css";
import { useEffect, useState } from "react";

export default function StartMenu({ isOpen, onClose, anchorRef }) {
  const [anchorCenter, setAnchorCenter] = useState(null);

  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setAnchorCenter(rect.left + rect.width / 2);
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  const panelStyle = anchorCenter
    ? {
        left: anchorCenter,
        transform: "translateX(-50%) translateY(10px)",
      }
    : {
        left: "50%",
        transform: "translateX(-50%) translateY(10px)",
      };

  return (
    <div className="start-menu" onClick={onClose}>
      <div
        className="start-menu__panel glass-panel"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}>
        <div className="start-menu__header">
          <span className="start-menu__title">Inicio</span>
        </div>

        <div className="start-menu__body">
          <div className="start-menu__section">
            <p className="start-menu__section-title">Anclados</p>
            <div className="start-menu__grid">
              <div className="start-menu__tile">App 1</div>
              <div className="start-menu__tile">App 2</div>
              <div className="start-menu__tile">App 3</div>
              <div className="start-menu__tile">App 4</div>
            </div>
          </div>

          <div className="start-menu__section">
            <p className="start-menu__section-title">Recomendado</p>
            <div className="start-menu__list">
              <div className="start-menu__list-item">Elemento 1</div>
              <div className="start-menu__list-item">Elemento 2</div>
            </div>
          </div>
        </div>

        <div className="start-menu__footer">
          <span className="start-menu__user">Usuario</span>
        </div>
      </div>
    </div>
  );
}
