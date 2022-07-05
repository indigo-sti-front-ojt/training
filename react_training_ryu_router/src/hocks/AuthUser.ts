import { useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { AuthUserContext } from "../provider/AuthUserProvider";
import { userType } from "../types/userType";

export const useAuth = () => {
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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// const login = useCallback(() => {
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((login_user) => {
//       AuthSetUser(login_user.user);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);

// const logout = useCallback(() => {
//   signOut(auth)
//     .then(() => {
//       console.log("logout");
//       AuthSetUser(null);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);
