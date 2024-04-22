"use client";

import React, { useState } from "react";

interface iProps {
  selectedTab: number;
  changeTab: (value: number) => void;
}

export const TabsContext = React.createContext<iProps>({} as iProps);
const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const changeTab = (value: number) => {
    console.log("value", value);
    setSelectedTab(value);
  };

  return (
    <TabsContext.Provider value={{ selectedTab, changeTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
