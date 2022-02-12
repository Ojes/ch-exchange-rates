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
