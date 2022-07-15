import { useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const fireauth = firebaseApp.fireauth;

// signup用hook
export const useSignup = () => {
  const [error, setError] = useState(false);

  const signup = async (email: string, password: string) => {
    try {
      setError(false);
      const res = await createUserWithEmailAndPassword(
        fireauth,
        email,
        password
      );
      console.log(res.user);
    } catch {
      {
        console.log("ユーザーの登録に失敗しました");
        setError(true);
      }
    }
  };
  return { error, signup };
};

// ログイン用hook
export const useLogin = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setError(false);
      await signInWithEmailAndPassword(fireauth, email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      console.log("ログインに失敗しました");
      setError(true);
    }
  };
  return { error, success, login };
};

// ログアウト用hook
export const useLogout = () => {
  const logout = async() => {
    try {
      await signOut(fireauth);
      console.log("Sign-out successful.");
    } catch {
      console.log("ログアウトに失敗しました");
    }
  };

  return { logout };
};

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError(false);
      await signInWithPopup(fireauth, provider);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      console.log("ログインに失敗しました");
      setError(true);
    }
  };
  return { success, error, loginWithGoogle };
};
