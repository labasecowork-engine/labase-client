import { useInitializePayment } from "@/modules/client/payment/hooks/useInitializePayment";
import { useNiubizCheckout } from "@/modules/client/payment/hooks/useNiubizCheckout";
import { cn } from "@/utilities";
import { CreditCardIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  reservationId: string;
  calculatedAmount: number;
}
export const PaymentButton = ({ reservationId, calculatedAmount }: Props) => {
  const { mutate: initializePayment, isPending } = useInitializePayment();
  const { openCheckout } = useNiubizCheckout();
  const queryClient = useQueryClient();

  const handlePaymentProcess = () => {
    initializePayment(
      { reservationId },
      {
        onSuccess: ({ session_token, purchase_number }) => {
          toast.info("Iniciando pasarela de pago", {
            description:
              "Estamos creando la sesión de pago para tu reserva, por favor espera un momento...",
          });

          openCheckout({
            sessionKey: session_token,
            purchaseNumber: purchase_number,
            amount: calculatedAmount,
            reservationId,
          });

          queryClient.invalidateQueries({
            queryKey: ["reservation", reservationId],
          });
        },
        onError: (err) => {
          toast.error("Error al inicializar el pago", {
            description: err.message,
          });
        },
      }
    );
  };
  return (
    <button
      onClick={handlePaymentProcess}
      className={cn(
        "w-fit bg-stone-900 text-white py-3 px-8 rounded-full hover:bg-stone-700 transition-colors cursor-pointer text-sm  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-900",
        isPending && "opacity-50"
      )}
      disabled={isPending}
    >
      <CreditCardIcon className="size-4" />
      {isPending ? "Procesando..." : "Procesar pago"}
    </button>
  );
};
