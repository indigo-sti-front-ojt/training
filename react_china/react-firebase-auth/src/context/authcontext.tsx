import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { UserCredential } from "firebase/auth";
import { auth } from "../firebase";


type LoginUser = UserCredential["user"];

export type LoginUserContextType = {
  user: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser|null>>
};

export const AuthContext = createContext({} as LoginUserContextType);

export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider(props: { children: ReactNode }) {
  const {children} = props;
  const [user, setUser] = useState<LoginUser | null>(null);

  const value:typeof user = user;

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}