import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (email: string, password: string) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoginUser(user);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    [navigate]
  );

  const register = useCallback(
    (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginUser(user);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    [navigate]
  );

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  return { login, register, logout };
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