import { createRoot } from "react-dom/client";
import { Core } from "./components/layouts";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Core>
    <RouterProvider router={router} />
  </Core>
);
