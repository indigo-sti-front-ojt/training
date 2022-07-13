import React from "react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { UserCredential, onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect } from "react";

type LoginUser = UserCredential["user"];

export type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext({} as LoginUserContextType);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (loginUser) => {
      setLoginUser(loginUser);
      console.log(loginUser);
      setLoading(false);
    });
  },[]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};