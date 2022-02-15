import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  currenciesAvailable,
  operationTypes,
  orderTypes,
} from "../config/settings";
import {
  OPERATION_TYPE,
  ORDER_TYPE,
  SOCKET_CONNECTION,
  SOCKET_MESSAGE,
} from "../constants";
import { TransactionContext } from "../context/transaction.context";
import { getOperationNameById } from "../helpers";
import { useSocket } from "../hooks/useSocket";
import { Button, ButtonGroup, ButtonLink } from "./Buttons";
import { Spinner } from "./Spinner";
import { Input } from "./Input";
import { InputRate } from "./InputRate";

const Subheader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;

const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 250px;
`;

export function SwapRates() {
  const [operationType, setOperationType] = useState(OPERATION_TYPE.BUY);
  const [orderType, setOrderType] = useState(ORDER_TYPE.LIMIT);
  const [asset, setAsset] = useState(currenciesAvailable[0]);
  const [assetQuote, setAssetQuote] = useState({ quote: "" });
  const { openOrder } = useContext(TransactionContext);
  const { message } = useSocket({
    connectionName: SOCKET_CONNECTION.QUOTE,
    subscribe: ({ data }) => {
      const quote = data.quote.toFixed(2);
      setAssetQuote({ quote });
    },
  });

  useEffect(() => {
    setAssetQuote({ quote: "" });
    if (asset) {
      message(SOCKET_MESSAGE.GET_QUOTE, {
        asset,
        orderType: getOperationNameById(operationType).toLocaleLowerCase(),
      });
    }
    // eslint-disable-next-line
  }, [asset, operationType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const [, amount, price] = event.target.elements;

    openOrder({
      operationType,
      orderType,
      asset,
      assetQuote,
      from: asset,
      to: "ARS",
      amount: amount.value,
      price: price.value,
    });
  };

  return (
    <section>
      <header>
        <ButtonGroup>
          {operationTypes.map(({ name, id }) => (
            <Button
              key={`operation-type-${id}`}
              isBuy={id === OPERATION_TYPE.BUY}
              className={operationType === id ? "selected" : ""}
              onClick={() => setOperationType(id)}
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
      {assetQuote.quote ? (
        <form onSubmit={handleSubmit}>
          <Input
            label={`1 ${asset}`}
            name="asset_price"
            asset="ARS"
            disabled={true}
            value={assetQuote.quote}
          />
          <InputRate
            asset={asset}
            quote={assetQuote.quote}
            operationType={operationType}
            orderType={orderType}
          />

          <SubmitButton isBuy={operationType === OPERATION_TYPE.BUY}>
            {getOperationNameById(operationType)} {asset}
          </SubmitButton>
        </form>
      ) : "quote" in assetQuote ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <div>Opp we have a problem houston</div>
      )}
    </section>
  );
}
