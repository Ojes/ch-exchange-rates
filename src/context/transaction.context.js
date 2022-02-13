import React, { useEffect, useReducer, useState } from "react";
import { ORDER_STATE, SOCKET_CONNECTION, SOCKET_MESSAGE } from "../constants";
import { Socket } from "../services/socket";

export const TransactionContext = React.createContext({});
const reducer = (state, action) => {
  let orders;

  switch (action.type) {
    case ORDER_STATE.OPEN:
      orders = [
        ...state.orders,
        { ...action.payload, orderState: ORDER_STATE.OPEN },
      ];
      return {
        ...state,
        orders,
      };

    case ORDER_STATE.FILLED:
      const order = state.orders.find((ord) => ord.id === action.payload.id);
      if (order) {
        orders = state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...action.payload, orderState: ORDER_STATE.FILLED };
          }
          return order;
        });
      } else {
        orders = [
          ...state.orders,
          { ...action.payload, orderState: ORDER_STATE.FILLED },
        ];
      }

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
  const [socket, setSocket] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const socket = new Socket();
    socket.connect(SOCKET_CONNECTION.ORDER, ({ type, data }) => {
      dispatch({
        type,
        payload: data,
      });
    });
    setSocket(socket);
    return socket.disconnect;
  }, []);

  const openOrder = (transaction) => {
    socket.message(SOCKET_MESSAGE.CREATE_ORDER, transaction);
  };

  return (
    <TransactionContext.Provider value={{ openOrder, orders: state.orders }}>
      {children}
    </TransactionContext.Provider>
  );
};
