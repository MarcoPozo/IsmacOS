import { createBrowserRouter } from "react-router-dom";
import DesktopLayout from "../layouts/DesktopLayout";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <DesktopLayout />,
  },
]);

export default router;
