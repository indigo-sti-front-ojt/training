import { atom } from "recoil";

type User = {
  id: string;
  name: string | null;
  email: string | null;
};

export type typeAuthState = User | null;

export const authState = atom<typeAuthState>({
  key: "authState",
  default: null,
});
