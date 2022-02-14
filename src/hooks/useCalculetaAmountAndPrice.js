import { useEffect, useState } from "react";

export function useCalculetaAmountAndPrice({
  asset,
  operationType,
  orderType,
  quote,
}) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setAmount(0);
    setPrice(0);
  }, [operationType, orderType, asset]);

  function calculatePrice(amount) {
    setPrice((quote * amount).toFixed(2));
    setAmount(amount);
  }

  function calculateAmount(price) {
    setPrice(price);
    setAmount((price / quote).toFixed(8));
  }

  return {
    price,
    amount,
    calculatePrice,
    calculateAmount,
  };
}
