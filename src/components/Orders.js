import { useState } from "react";
import styled from "styled-components";
import { orderStates } from "../config/settings";
import { OrderList } from "./OrderList";
import { OrderTab } from "./OrderTab";

const OrdersWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
`;

export function Orders() {
  const [orderState, setOrderState] = useState(orderStates[0]);
  return (
    <section>
      <OrdersWrapper>
        {orderStates.map(({ name, id }) => (
          <OrderTab
            title={name}
            key={`order-state-${id}`}
            selected={orderState.id === id}
            onClick={() => setOrderState({ name, id })}
          ></OrderTab>
        ))}
      </OrdersWrapper>
      <OrderList
        source={[
          {
            orderState: { name: "FILLED", id: 0 },
            operationType: { name: "BUY", id: 0 },
            orderType: { name: "Limit", id: 0 },
            amount: 1000,
            total: 200,
            from: "BTC",
            to: "ARS",
            date: Date.now(),
            id: "1",
          },
        ]}
      ></OrderList>
    </section>
  );
}
