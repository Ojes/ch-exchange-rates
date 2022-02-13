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

  const handleCalculateAmount = (value) => {
    if (quote > 0) {
      setAmount((value / quote).toFixed(8));
      setPrice(value);
    }
  };

  const handleCalculatePrice = (value) => {
    setPrice((quote * value).toFixed(2));
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
