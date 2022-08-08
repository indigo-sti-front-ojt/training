import React, { useEffect } from "react";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginUser } from "../types/firebase/LoginUser";

export type LoginUserContextType = {
  loginuser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

const LoginUserContext = createContext({} as LoginUserContextType);

export function useLoginUserContext() {
  return useContext(LoginUserContext);
}

export function LoginUserProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [loginuser, setLoginUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (loginUser) => {
      if (loginUser) {
        setLoginUser(loginUser);
      }
    });
  }, []);

  return (
    <LoginUserContext.Provider value={{ loginuser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
}
