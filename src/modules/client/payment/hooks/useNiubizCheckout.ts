import { NIUBIZ_URL_JS, NIUBIZ_MERCHANT_ID, API_URL } from "@/config";
import { toast } from "sonner";

interface NiubizCheckoutProps {
  sessionKey: string;
  purchaseNumber: string;
  amount: number;
  reservationId: string;
}

// Declaramos VisanetCheckout en el scope global de window para que TypeScript no se queje.
declare global {
  interface Window {
    VisanetCheckout?: {
      open: () => void;
    };
  }
}

export const useNiubizCheckout = () => {
  const openCheckout = ({
    sessionKey,
    purchaseNumber,
    amount,
    reservationId,
  }: NiubizCheckoutProps) => {
    document.getElementById("frmVisaNet")?.remove();

    const form = document.createElement("form");
    form.id = "frmVisaNet";
    form.action = `${API_URL}payment/visa-callback?purchaseNumber=${purchaseNumber}&reservationId=${reservationId}`;
    form.style.display = "none";

    const script = document.createElement("script");
    script.src = NIUBIZ_URL_JS;
    script.setAttribute("data-sessiontoken", sessionKey);
    script.setAttribute("data-channel", "web");
    script.setAttribute("data-merchantid", NIUBIZ_MERCHANT_ID);
    script.setAttribute("data-purchasenumber", purchaseNumber || "");
    script.setAttribute("data-amount", amount.toString());

    script.setAttribute(
      "data-merchantlogo",
      `${window.location.origin}/logo_payment.png`
    );
    script.setAttribute("data-expirationminutes", "10");
    script.setAttribute("data-timeouturl", window.location.origin);
    script.setAttribute("data-formbuttoncolor", "#0A0A0A");

    script.onload = () => {
      if (window.VisanetCheckout) {
        window.VisanetCheckout.open();
      } else {
        toast.error("Error al cargar la pasarela de pago.", {
          description:
            "Por favor, intenta nuevamente o contacta a soporte si el problema persiste.",
        });
      }
    };

    script.onerror = () => {
      toast.error("No se pudo cargar el script de la pasarela de pago.", {
        description:
          "Por favor, intenta nuevamente o contacta a soporte si el problema persiste.",
      });
    };

    form.appendChild(script);
    document.body.appendChild(form);
  };

  return { openCheckout };
};
