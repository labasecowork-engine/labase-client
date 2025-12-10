import { Dialog, DialogContent } from "@/components/ui";
import Confetti from "react-confetti-boom";
import { PaymentError, PaymentLoading, PaymentSuccess } from "../";
import { useQuery } from "@tanstack/react-query";
import { getPaymentResult } from "@/modules/client/payment/service";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCallback } from "react";
import type { Reservation } from "../../types";

interface Props {
  reservation: Reservation;
}

export const PaymentModal = ({ reservation }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const purchaseNumber = searchParams.get("purchaseNumber");

  const closePaymentModal = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("purchaseNumber");
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const {
    data: paymentResult,
    isPending: isPaymentResultPending,
    isError: isPaymentResultError,
    error,
  } = useQuery({
    queryKey: ["payment-result", purchaseNumber],
    queryFn: () => getPaymentResult(purchaseNumber!),
    enabled: !!purchaseNumber,
  });

  useEffect(() => {
    if (isPaymentResultError && error) {
      const errorMessage = (error as Error & { response?: { status: number } })
        ?.response?.status;
      if (errorMessage === 404) {
        closePaymentModal();
      }
    }
  }, [isPaymentResultError, error, closePaymentModal]);
  return (
    <Dialog
      open={!!purchaseNumber}
      onOpenChange={(open) => !open && closePaymentModal()}
    >
      {paymentResult?.status === "APPROVED" && (
        <div className="fixed top-0 left-0 w-screen h-full z-50">
          <Confetti
            mode="fall"
            particleCount={40}
            shapeSize={7}
            fadeOutHeight={1}
            colors={["#34d399", "#059669", "#0369a1"]}
          />
        </div>
      )}
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center p-4">
          {isPaymentResultPending ? (
            <PaymentLoading />
          ) : (
            <div className="w-full">
              {paymentResult?.status === "APPROVED" ? (
                <PaymentSuccess
                  paymentResult={paymentResult}
                  reservation={reservation}
                />
              ) : (
                <PaymentError paymentResult={paymentResult!} />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
