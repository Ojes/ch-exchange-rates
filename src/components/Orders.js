import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { orderStates } from "../config/settings";
import { TransactionContext } from "../context/transaction.context";
import { OrderList } from "./OrderList";
import { OrderTab } from "./OrderTab";

const OrdersWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
`;

export function Orders() {
  const [orderState, setOrderState] = useState(orderStates[0].id);
  const [orderList, setOrderList] = useState([]);
  const { orders } = useContext(TransactionContext);

  useEffect(() => {
    setOrderList(orders.filter((order) => order.orderState === orderState));
  }, [orders, orderState]);

  return (
    <section>
      <OrdersWrapper>
        {orderStates.map(({ name, id }) => (
          <OrderTab
            title={name}
            key={`order-state-${id}`}
            selected={orderState === id}
            onClick={() => setOrderState(id)}
          ></OrderTab>
        ))}
      </OrdersWrapper>
      <OrderList source={orderList}></OrderList>
    </section>
  );
}
