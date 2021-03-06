import { OPERATION_TYPE, ORDER_TYPE, ORDER_STATE } from "../constants";

export const operationTypes = [
  { name: "Buy", id: OPERATION_TYPE.BUY },
  { name: "Sell", id: OPERATION_TYPE.SELL },
];

export const orderTypes = [
  { name: "Limit", id: ORDER_TYPE.LIMIT },
  { name: "Market", id: ORDER_TYPE.MARKET },
];

export const orderStates = [
  { name: "Order Book", id: ORDER_STATE.OPEN },
  { name: "Order History", id: ORDER_STATE.FILLED },
];

export const currenciesAvailable = ["BTC", "ETH", "USDC"];
