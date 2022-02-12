import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  currenciesAvailable,
  operationTypes,
  orderTypes,
} from "../config/settings";
import { OPERATION_TYPE } from "../constants";
import { getQuote } from "../services/httpFetch";
import { Button, ButtonGroup, ButtonLink } from "./Buttons";
import { Input } from "./Input";

const Subheader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;

export function SwapRates() {
  const [operationType, setOperationType] = useState(operationTypes[0]);
  const [orderType, setOrderType] = useState(orderTypes[0].id);
  const [asset, setAsset] = useState(currenciesAvailable[0]);
  const [assetQuote, setAssetQuote] = useState({ quote: "" });

  useEffect(() => {
    // setAssetQuote({ quote: "" });

    (async function () {
      const quoteValues = await getQuote(
        asset,
        operationType.name.toLocaleLowerCase()
      );
      setAssetQuote(quoteValues);
    })();
  }, [asset, operationType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { amount, total } = event.target.elements;
    console.log("create transaction");
    if (amount >= assetQuote.cryptoMinAmount) {
      // Create transaction
    }
  };

  return (
    <section>
      <header>
        <ButtonGroup>
          {operationTypes.map(({ name, id }) => (
            <Button
              key={`operation-type-${id}`}
              isBuy={id === OPERATION_TYPE.BUY}
              className={operationType.id === id ? "selected" : ""}
              onClick={() => setOperationType({ name, id })}
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
        <Subheader>
          <div>
            {orderTypes.map(({ name, id }) => (
              <ButtonLink
                key={`order-type-${id}`}
                type="button"
                className={orderType === id ? "selected" : ""}
                onClick={() => setOrderType(id)}
              >
                {name}
              </ButtonLink>
            ))}
          </div>
          <div>
            {currenciesAvailable.map((name) => (
              <ButtonLink
                key={`asset-${name}`}
                type="button"
                className={asset === name ? "selected" : ""}
                onClick={() => setAsset(name)}
              >
                {name}
              </ButtonLink>
            ))}
          </div>
        </Subheader>
      </header>
      <form onSubmit={handleSubmit}>
        <Input
          label="Price"
          name="asset_price"
          asset="ARS"
          disabled={true}
          value={assetQuote.quote}
        />
        <Input label="Amount" name="amount" asset={asset} value="" />
        <Input label="Total" name="amount" asset="ARS" value="" />
        <SubmitButton isBuy={operationType.id === OPERATION_TYPE.BUY}>
          {operationType.name} {asset}
        </SubmitButton>
      </form>
    </section>
  );
}
