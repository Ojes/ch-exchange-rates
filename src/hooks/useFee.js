import { useContext, useEffect, useState } from "react";
import { FEE_VALUE } from "../constants";
import { TransactionContext } from "../context/transaction.context";

export function useFee() {
  const { orders } = useContext(TransactionContext);
  const [fee, setFee] = useState();

  useEffect(() => {
    const feeTotal =
      orders.reduce((counter, order) => counter + +order.price, 0) * FEE_VALUE;
    setFee(feeTotal.toFixed(2));
  }, [orders]);

  return fee;
}
