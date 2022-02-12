import React from "react";

export const TransactionContext = React.createContext({});
export const TransactionProvider = ({ children }) => {
  return (
    <TransactionContext.Provider value={null}>
      {children}
    </TransactionContext.Provider>
  );
};
