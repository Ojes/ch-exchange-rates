import React, { useEffect, useReducer, useRef } from "react";
import { ORDER_STATE, SOCKET_CONNECTION, SOCKET_MESSAGE } from "../constants";
import { DummySocket } from "../services/socket";

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
  const socket = useRef(DummySocket);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket.current.connect(SOCKET_CONNECTION.ORDER, ({ type, data }) => {
      dispatch({
        type,
        payload: data,
      });
    });
    return socket.current.disconnect;
  }, []);

  const openOrder = (transaction) => {
    socket.current.message(SOCKET_MESSAGE.CREATE_ORDER, transaction);
  };

  return (
    <TransactionContext.Provider value={{ openOrder, orders: state.orders }}>
      {children}
    </TransactionContext.Provider>
  );
};
