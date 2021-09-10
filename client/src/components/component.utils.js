export const convertToPHPCurrency = (price) => price.toLocaleString("en", { style: "currency", currency: "PHP", minimumFractionDigits: 2 });
export const convertToPHP = (price) => price * 50;