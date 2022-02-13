import { useEffect, useState } from "react";
import { OPERATION_TYPE } from "../constants";
import { Input } from "./Input";

export function InputRate({ asset, operationType, orderType, quote }) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Reset inputs if operation values were change
    setAmount(0);
    setPrice(0);
  }, [orderType, operationType, asset]);

  useEffect(() => {
    if (quote) {
      if (operationType === OPERATION_TYPE.BUY) {
        setAmount((price / quote).toFixed(8));
      } else {
        setPrice((quote * amount).toFixed(2));
      }
    }
  }, [price, amount, quote, operationType]);

  const handleCalculateAmount = (value) => {
    if (quote > 0) {
      setPrice(value);
    }
  };

  const handleCalculatePrice = (value) => {
    setAmount(value);
  };

  return (
    <>
      <Input
        label="Amount"
        name="amount"
        asset={asset}
        value={amount}
        onChangeValue={handleCalculatePrice}
        disabled={operationType === OPERATION_TYPE.BUY}
      />
      <Input
        label="Price"
        name="price"
        asset="ARS"
        value={price}
        onChangeValue={handleCalculateAmount}
        disabled={operationType !== OPERATION_TYPE.BUY}
      />
    </>
  );
}
