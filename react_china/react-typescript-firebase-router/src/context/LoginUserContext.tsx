import React, { useEffect } from "react";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { UserCredential, onAuthStateChanged, getAuth } from "firebase/auth";

type LoginUser = UserCredential["user"];

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
  const [signInCheck, setSignInCheck] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (loginUser) => {
      if (loginUser) {
        setLoginUser(loginUser);
        setSignInCheck(true);
      } else {
        setSignInCheck(true);
      }
    });
  });

  if (signInCheck) {
    return (
      <LoginUserContext.Provider value={{ loginuser, setLoginUser }}>
        {children}
      </LoginUserContext.Provider>
    );
  } else {
    return <p>ローディング...</p>;
  }
}
