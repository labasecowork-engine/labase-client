import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "@/routes/auth_routes";
import { errorRoutes } from "@/routes/error_routes";
import { appRoutes } from "./app_routes";

const routes = [authRoutes, appRoutes, errorRoutes];
const router = createBrowserRouter(routes);
export default router;
