import { OPERATION_TYPE, ORDER_STATE, ORDER_TYPE } from "../constants";

export function getOperationNameById(id) {
  switch (id) {
    case OPERATION_TYPE.BUY:
      return "Buy";
    case OPERATION_TYPE.SELL:
      return "Sell";
    default:
      return "";
  }
}
export function geOrderStateNameById(id) {
  switch (id) {
    case ORDER_STATE.OPEN:
      return "Open Orders";
    case ORDER_STATE.FILLED:
      return "Ordern History";
    default:
      return "";
  }
}

export function getOrderNameById(id) {
  switch (id) {
    case ORDER_TYPE.LIMIT:
      return "Limit";
    case ORDER_TYPE.MARKET:
      return "Market";
    default:
      return "";
  }
}
