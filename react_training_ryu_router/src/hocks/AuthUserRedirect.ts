import { auth } from "../firebase";
import { useContext, useEffect, useState } from "react";
import {
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
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
    changeUserState();
  }, [auth]);

  // useEffect(() => {
  //   console.log("get user");
  //   console.log(isActive);

  //   getUser();
  // }, [isActive]);

  const changeUserState = async () => {
    await onAuthStateChanged(auth, (getAuthUser: User | null) => {
      console.log("change state");
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
    });
  };

  return { login, logout, isActive };
};
