import { uid } from "uid";
import {
  ORDER_STATE,
  ORDER_TYPE,
  SOCKET_CONNECTION,
  SOCKET_MESSAGE,
} from "../constants";
import { getQuote } from "./httpFetch";

export function Socket() {
  let _listeners = {};
  let _timerId;

  this.connect = (message, callback) => {
    let listeners = _listeners[message];
    if (!listeners) {
      listeners = _listeners[message] = [];
    }
    listeners.push(callback);
  };

  this.message = (msg, data) => {
    switch (msg) {
      case SOCKET_MESSAGE.CREATE_ORDER:
        createOrder(data);
        break;
      case SOCKET_MESSAGE.GET_QUOTE:
        simulateLiveQuote(data);
        break;
      default:
        console.warn(`${msg}: Unknown message.`);
    }
  };

  this.disconnect = () => {
    _listeners = null;
    clearInterval(_timerId);
  };

  function dispatch(message, data) {
    if (_listeners) {
      _listeners[message].forEach((callback) => {
        callback(data);
      });
    }
  }

  function createOrder(order) {
    const id = uid();
    const date = new Date();
    const newOrder = { ...order, id, date };
    const isLimit = newOrder.orderType === ORDER_TYPE.LIMIT;

    if (isLimit) {
      checkOrder(newOrder);
    }

    dispatch(SOCKET_CONNECTION.ORDER, {
      type: isLimit ? ORDER_STATE.OPEN : ORDER_STATE.FILLED,
      data: newOrder,
    });
  }

  function checkOrder(newOrder) {
    setTimeout(() => {
      dispatch(SOCKET_CONNECTION.ORDER, {
        type: ORDER_STATE.FILLED,
        data: newOrder,
      });
    }, 5000);
  }

  async function simulateLiveQuote({ asset, orderType }) {
    clearInterval(_timerId);

    const assetQuote = await getQuote(asset, orderType);

    dispatch(SOCKET_CONNECTION.QUOTE, { type: "FILL_QUOTE", data: assetQuote });

    _timerId = setTimeout(() => {
      simulateLiveQuote({ asset, orderType });
    }, 5000);
  }
}