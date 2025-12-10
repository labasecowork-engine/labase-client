import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../service";

interface InitializePaymentData {
  reservationId: string;
}

export const useInitializePayment = () => {
  return useMutation({
    mutationFn: async ({ reservationId }: InitializePaymentData) => {
      // TODO: Improve build
      const data = {
        reservation_id: reservationId,
        metadata: {
          antifraud: {
            client_ip: "192.168.0.1",
            merchant_define_data: {
              mdd4: "micorreo@gmail.com",
              mdd32: "33779159",
              mdd75: "Invigado",
              mdd76: 1,
            },
          },
          data_map: {
            url_address: "https://example.com/servicio",
            service_location_city_name: "Madrid",
            service_location_country_subdivision_code: "ESP",
            service_location_country_code: "ESP",
            service_location_postal_code: "28001",
          },
        },
      };
      const { session_token, purchase_number, amount } = await createPayment(
        data
      );

      if (!session_token) {
        throw new Error("La llave de sesión no pudo ser generada.");
      }

      return { session_token, purchase_number, amount };
    },
  });
};
