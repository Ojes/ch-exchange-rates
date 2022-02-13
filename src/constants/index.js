export const OPERATION_TYPE = {
  BUY: 0,
  SELL: 1,
};

export const ORDER_TYPE = {
  LIMIT: 0,
  MARKET: 1,
};

export const ORDER_STATE = {
  OPEN: 0,
  FILLED: 1,
  CANCELLED: 2,
};

export const ORDER_BOOK = {
  OPEN: 0,
  NOT_OPEN: 1,
};

export const SOCKET_MESSAGE = {
  CREATE_ORDER: "createOrder",
  GET_QUOTE: "getQuote",
};

export const SOCKET_CONNECTION = {
  ORDER: "order",
  QUOTE: "quote",
};
