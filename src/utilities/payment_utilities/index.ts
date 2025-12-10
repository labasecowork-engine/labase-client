/**
 * Genera un número de compra incremental único
 * @returns {string} Número de compra como string
 */
export const generatePurchaseNumber = (): string => {
  const key = "purchaseNumber";
  let purchaseNumber = parseInt(localStorage.getItem(key) || "1000", 10);

  purchaseNumber++;
  localStorage.setItem(key, purchaseNumber.toString());

  return purchaseNumber.toString();
};

/**
 * Extrae y parsea los parámetros de consulta de la URL
 * @returns {object} Objeto con amount, purchaseNumber y transactionToken
 */
export const getQueryParams = (): {
  amount: number;
  purchaseNumber: string;
  transactionToken: string;
} => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    amount: parseFloat(urlParams.get("amount") || "0"),
    purchaseNumber: urlParams.get("purchaseNumber") || "",
    transactionToken: urlParams.get("transactionToken") || "",
  };
};
