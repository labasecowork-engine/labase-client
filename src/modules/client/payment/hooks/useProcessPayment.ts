import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPaymentResult } from "../service";

export const useProcessPayment = () => {
  const { purchaseNumber } = useParams<{ purchaseNumber: string }>();

  return useQuery({
    queryKey: ["paymentResult", purchaseNumber],
    queryFn: () => getPaymentResult(purchaseNumber!),
    enabled: !!purchaseNumber,
  });
};
