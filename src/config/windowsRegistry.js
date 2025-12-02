import { FiSettings } from "react-icons/fi";
import Config from "../pages/Config/Config";

export const windowsRegistry = {
  config: {
    id: "config",
    title: "Configuración",
    route: "/configuracion",
    icon: FiSettings,
    defaultSize: {
      width: 500,
      height: 380,
    },
    component: Config,
  },
};

export function getWindowDefinition(id) {
  return windowsRegistry[id] ?? null;
}
