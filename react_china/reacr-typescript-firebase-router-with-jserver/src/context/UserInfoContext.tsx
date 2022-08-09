import React from "react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../types/api/User";

// typeの宣言
export type UserInfoContextType = {
  allTags: User;
  setAllTags: Dispatch<SetStateAction<User>>;
};

const UserInfoContext = createContext({} as UserInfoContextType);

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}

export function UserInfoProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [allTags, setAllTags] = useState<User>({});

  return (
    <UserInfoContext.Provider value={{ allTags, setAllTags }}>
      {children}
    </UserInfoContext.Provider>
  );
}
