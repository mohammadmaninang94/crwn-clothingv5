export const convertToPHPCurrency = (price) => (price * 50).toLocaleString("en", { style: "currency", currency: "PHP", minimumFractionDigits: 2 });