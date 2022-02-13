import { uid } from "uid";
import { ORDER_TYPE } from "../constants";

const BASE_URL = "https://api-staging2.zetl.network/api/quotes";

export const getQuote = async (fromAsset, operationName) => {
  const queryParams = new URLSearchParams({
    fromAsset,
    pid: "1CmURrXeoKwyXF",
    toAsset: "ARS",
    type: `${operationName}-crypto`,
  });

  const url = `${BASE_URL}?${queryParams}`;
  const response = await fetch(url, {
    method: "GET",
  });

  if (response.status === 200) {
    return response.json();
  }
  return response;
};

export function createNewOrder(transaction) {
  const promise = new Promise((resolve, reject) => {
    const id = uid();
    const date = new Date();
    resolve({ ...transaction, id, date });
  });
  return promise;
}

export function connectToSimulatedSocket(transaction) {
  const promise = new Promise((resolve, reject) => {
    const delay = transaction.orderType.id === ORDER_TYPE.LIMIT ? 5000 : 0;
    setTimeout(() => {
      resolve(transaction.id);
    }, delay);
  });
  return promise;
}
