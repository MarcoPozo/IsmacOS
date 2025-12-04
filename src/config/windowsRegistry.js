import { FiSettings } from "react-icons/fi";
import Config from "../pages/Config/Config";

export const windowsRegistry = {
  config: {
    id: "config",
    title: "Configuración",
    route: "/configuracion",
    component: Config,
    defaultSize: {
      width: 500,
      height: 380,
    },
    iconImage: "/images/icons/configuracion64.png",
    icon: FiSettings,
    pinned: true,
  },
};

export function getWindowDefinition(id) {
  return windowsRegistry[id] ?? null;
}

export function getAllApps() {
  return Object.values(windowsRegistry);
}

export function getPinnedApps() {
  return Object.values(windowsRegistry).filter((app) => app.pinned);
}
