import "./Desktop.css";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import { FiSettings } from "react-icons/fi";

import TaskBar from "../../components/TaskBar/TaskBar";

export default function Desktop() {
  const navigate = useNavigate();

  const handleOpenConfig = () => {
    navigate("/configuracion");
  };

  return (
    <div className="desktop">
      <div className="desktop__icons">
        <Icon label="Configuración" onClick={handleOpenConfig}>
          <FiSettings size={26} />
        </Icon>
      </div>

      <TaskBar />
    </div>
  );
}
