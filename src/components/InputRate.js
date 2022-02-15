import { useCalculetaAmountAndPrice } from "../hooks/useCalculetaAmountAndPrice";
import { Input } from "./Input";

export function InputRate({ asset, operationType, orderType, quote }) {
  const { price, amount, calculatePrice, calculateAmount } =
    useCalculetaAmountAndPrice({
      asset,
      operationType,
      orderType,
      quote,
    });

  return (
    <>
      <Input
        label="Amount"
        name="amount"
        asset={asset}
        value={amount}
        loading={!quote}
        onChangeValue={calculatePrice}
      />
      <Input
        label="Price"
        name="price"
        asset="ARS"
        value={price}
        loading={!quote}
        onChangeValue={calculateAmount}
      />
    </>
  );
}
