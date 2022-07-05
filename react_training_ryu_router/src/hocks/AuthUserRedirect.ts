import { auth } from "../firebase";
import { useContext, useEffect, useState } from "react";
import {
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { AuthUserContext } from "../provider/AuthUserProvider";
import { userType } from "../types/userType";

export const useAuthUserRedirect = () => {
  const { setUser, setisLoggined } = useContext(AuthUserContext);
  const [isActive, setisActive] = useState<boolean>(false);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      setisActive(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User | null) => {
      console.log("state change");
      console.log(user);
    });
  });

  const getUser = async () => {
    const getAuthUser = await getRedirectResult(auth);
    console.log("getauthuser");
    console.log(getAuthUser);

    if (getAuthUser) {
      const current_User: userType = {
        uid: getAuthUser.user.uid,
        photoIcon: getAuthUser.user.photoURL,
        nickname: getAuthUser.user.displayName,
        mailddress: getAuthUser.user.email,
      };
      setUser(current_User);
      setisLoggined(true);
    } else {
      setisLoggined(false);
    }
  };

  return { login, logout, isActive, getUser };
};
