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

export const useAuthUser = () => {
  const { setUser, setisLoggined, setisAuthChecked } =
    AuthUserContainer.useContainer();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const changeUserState = async () => {
    setisAuthChecked(false);
    await onAuthStateChanged(auth, (getAuthUser: User | null) => {
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
  };

  return { login, logout, changeUserState };
};
