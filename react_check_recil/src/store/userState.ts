import { atom, selector } from "recoil";

export const userState = atom<boolean>({
  key: "userState",
  default: true,
});

export const userStateString = selector({
  key: "userStateString",
  get: ({ get }) => {
    const flag = get(userState);
    if (flag) {
      return true;
    } else {
      return false;
    }
  },
});

export const suspenseTest = selector({
  key: "suspenseTest",
  get: async () => {
    const temp = new Promise<void>((resolve) => {
      setTimeout(resolve, 5000);
    });
    const res = await temp.then(() => "hey");
    console.log("promise ", res);

    return res;
  },
});
