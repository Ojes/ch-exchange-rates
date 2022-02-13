import { OPERATION_TYPE, ORDER_TYPE, ORDER_STATE } from "../constants";

export const operationTypes = [
  { name: "Sell", id: OPERATION_TYPE.SELL },
  { name: "Buy", id: OPERATION_TYPE.BUY },
];

export const orderTypes = [
  { name: "Limit", id: ORDER_TYPE.LIMIT },
  { name: "Market", id: ORDER_TYPE.MARKET },
];

export const orderStates = [
  { name: "Open Orders", id: ORDER_STATE.OPEN },
  { name: "Ordern History", id: ORDER_STATE.FILLED },
];

export const currenciesAvailable = ["BTC", "ETH", "USDC"];
