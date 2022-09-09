import { auth } from "../firebase";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged,
} from "firebase/auth";

import { userType } from "../types/userType";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { useCallback } from "react";

export const useAuthUser = () => {
  const { setUser, setisLoggined, setisAuthChecked } =
    AuthUserContainer.useContainer();

  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "sios.com",
    });
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const changeUserState = useCallback(() => {
    setisAuthChecked(false);
    onAuthStateChanged(auth, async (getAuthUser: User | null) => {
      console.log(getAuthUser);

      if (getAuthUser) {
        const current_User: userType = {
          uid: getAuthUser.uid,
          photoIcon: getAuthUser.photoURL,
          nickname: getAuthUser.displayName,
          mailddress: getAuthUser.email,
        };
        setUser(current_User);
        setisLoggined(true);
      } else {
        const current_User: userType = {
          uid: "",
          photoIcon: "",
          nickname: "",
          mailddress: "",
        };
        setUser(current_User);
        setisLoggined(false);
      }
      setisAuthChecked(true);
    });
  }, []);

  return { login, logout, changeUserState };
};
