export const formatPrice = (price: string): string => {
  const numericPrice = parseFloat(price);
  return `S/ ${numericPrice.toFixed(2)}`;
};

export const capitalizeWords = (input: string) =>
  input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
