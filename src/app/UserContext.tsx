'use client'
// import { getCookie } from '@/tools/helper';
import { createContext, useContext, useState } from "react";

const UserContext = createContext({})

export function UserProvider({ children }: any) {
  const [user, setUser]: any = useState()
  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(UserContext);
}