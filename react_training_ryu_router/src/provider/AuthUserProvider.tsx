import React, { createContext, ReactNode, useState } from "react";
import { userType } from "../types/userType";

export type AuthUserContextType = {
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  isLoggined: boolean;
  setisLoggined: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthUserContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType
);

type Props = {
  children: ReactNode;
};

const initialuser: userType = {
  uid: "",
  photoIcon: "",
  nickname: "",
  mailddress: "",
};

export const AuthUserProvider = (props: Props) => {
  const { children } = props;
  //   const [userInfo, setUserInfo] = useState<string>("");
  const [user, setUser] = useState<userType>(initialuser);
  const [isLoggined, setisLoggined] = useState<boolean>(false);
  return (
    <AuthUserContext.Provider
      value={{ user, setUser, isLoggined, setisLoggined }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
