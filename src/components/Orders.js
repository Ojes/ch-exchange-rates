import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { orderStates } from "../config/settings";
import { ORDER_STATE } from "../constants";
import { TransactionContext } from "../context/transaction.context";
import { OrderList } from "./OrderList";
import { OrderTab } from "./OrderTab";

const OrdersWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
`;

export function Orders() {
  const [orderState, setOrderState] = useState(orderStates[0]);
  const [orderList, setOrderList] = useState([]);
  const { orders } = useContext(TransactionContext);

  // useEffect(() => {
  //   setOrderList(orders.filter((order) => order.state === ORDER_STATE.OPEN));
  // }, [orders]);

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
      <OrderList source={orders}></OrderList>
    </section>
  );
}
