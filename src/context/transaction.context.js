import React, { useReducer } from "react";
import { ORDER_STATE } from "../constants";
import {
  connectToSimulatedSocket,
  createNewOrder,
} from "../services/httpFetch";

export const TransactionContext = React.createContext({});
const reducer = (state, action) => {
  let orders;
  console.table(action);
  switch (action.type) {
    case "OPEN_ORDER":
      orders = [
        ...state.orders,
        { ...action.payload, orderState: ORDER_STATE.OPENED },
      ];
      return {
        ...state,
        orders,
      };

    case "FILL_ORDER":
      orders = state.orders.map((order) => {
        if (order.id === action.payload) {
          return { ...order, orderState: ORDER_STATE.FILLED };
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
          return { ...order, orderState: ORDER_STATE.CANCELLED };
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
  orders: [],
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openOrder = (transaction) => {
    (async function () {
      const newOrder = await createNewOrder(transaction);
      connectToSimulatedSocket(newOrder).then((orderId) => {
        fillOrder(orderId);
      });
      dispatch({
        type: "OPEN_ORDER",
        payload: newOrder,
      });
    })();
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
