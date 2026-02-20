import * as client from "@/modules/client";
import * as shared from "@/modules/shared";
import { ROUTES } from "../routes";

export const clientRoutes = {
  path: "/client",
  children: [
    // Reservations
    {
      path: ROUTES.Client.ViewReservations,
      element: <client.ViewReservationsPage />,
    },
    {
      path: ROUTES.Client.CreateReservation,
      element: <client.CreateReservationPage />,
    },
    {
      path: ROUTES.Client.ViewReservation,
      element: <client.ViewReservationPage />,
    },
    // Profile
    {
      path: ROUTES.Client.ViewProfile,
      element: <shared.UpdateProfilePage />,
    },
  ],
};
