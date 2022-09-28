import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: null,
  // TypeError: Cannot freezeを回避
  dangerouslyAllowMutability: true,
});
