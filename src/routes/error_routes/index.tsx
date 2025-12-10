import * as publicPages from "@/modules/shared";
import { ROUTES } from "../routes";

export const errorRoutes = {
  path: "/",
  children: [
    {
      path: ROUTES.Error.NotFound,
      element: <publicPages.NotFoundPage />,
    },
    {
      path: ROUTES.Error.Internal,
      element: <publicPages.InternalErrorPage />,
    },
  ],
};
