export const formatMoney = (amount: number | undefined) => {
  if (amount) {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
  return 0;
};

export const formatDate = (date: Date | undefined) => {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
  return "";
};
