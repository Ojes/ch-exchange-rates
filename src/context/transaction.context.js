import React, { useReducer } from "react";
import { ORDER_STATE } from "../constants";

export const TransactionContext = React.createContext({});
const reducer = (state, action) => {
  let orders;
  switch (action.type) {
    case "OPEN_ORDER":
      orders = [
        ...state.orders,
        { ...action.payload, state: ORDER_STATE.OPENED },
      ];
      return {
        ...state,
        orders,
      };

    case "FILL_ORDER":
      orders = state.orders.map((order) => {
        if (order.id === action.payload) {
          return { ...order, state: ORDER_STATE.FILLED };
        }
        return order;
      });

      return {
        ...state,
        orders,
      };

    case "CANCEL_ORDER":
      orders = state.orders.map((order) => {
        if (order.id === action.payload) {
          return { ...order, state: ORDER_STATE.CANCELLED };
        }
        return order;
      });

      return {
        ...state,
        orders,
      };
    default:
      return state;
  }
};

const initialState = {
  orders: [
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
  ],
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openOrder = (order) => {
    dispatch({
      type: "OPEN_ORDER",
      payload: order,
    });
  };

  const fillOrder = (orderId) => {
    dispatch({
      type: "FILL_ORDER",
      payload: orderId,
    });
  };

  const cancelOrder = (orderId) => {
    dispatch({
      type: "CANCEL_ORDER",
      payload: orderId,
    });
  };

  return (
    <TransactionContext.Provider
      value={{ openOrder, fillOrder, cancelOrder, orders: state.orders }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
