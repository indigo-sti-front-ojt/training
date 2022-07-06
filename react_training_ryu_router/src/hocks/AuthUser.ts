import { useContext } from "react";
import { auth } from "../firebase";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { AuthUserContext } from "../provider/AuthUserProvider";
import { userType } from "../types/userType";

export const useAuthUser = () => {
  const { setUser, setisLoggined } = useContext(AuthUserContext);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const firebaseAuthUser = await signInWithPopup(auth, provider);
      if (firebaseAuthUser.user) {
        AuthSetUser(firebaseAuthUser.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await signOut(auth);
    AuthSetUser(null);
  };

  const AuthSetUser = (firebase_user: User | null) => {
    if (firebase_user) {
      const current_User: userType = {
        uid: firebase_user.uid,
        photoIcon: firebase_user.photoURL,
        nickname: firebase_user.displayName,
        mailddress: firebase_user.email,
      };
      setUser(current_User);
      setisLoggined(true);
    } else {
      const current_User: userType = {
        uid: "",
        photoIcon: null,
        nickname: null,
        mailddress: null,
      };
      setUser(current_User);
      setisLoggined(false);
    }
  };

  return { login, logout };
};
