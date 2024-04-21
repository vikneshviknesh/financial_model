"use client";

import React, { useState } from "react";

const TransactionsContext = React.createContext({
  // allSchemes: []
});
const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [allSchemes, setAllSchemes] = useState<any[]>([]);

  const updateSchemes = (value: any[]) => {
    setAllSchemes(value);
  };

  return (
    <TransactionsContext.Provider value={{ allSchemes, updateSchemes }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
