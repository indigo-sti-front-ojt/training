import React, { createContext, ReactNode, useState } from "react";

export type UserContextType = {
  userInfo: string;
  setUserInfo: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

type Props = {
  children: ReactNode;
};

export const UserProvider = (props: Props) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<string>("");

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
