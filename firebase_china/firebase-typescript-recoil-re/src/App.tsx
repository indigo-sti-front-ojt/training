import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fireauth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { authState } from "./store/AuthState";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";


type Props = {
  element: React.ReactNode;
};

// ログイン前の画面(Login)を表示するためのRouter
const LoginRoute = (props: Props) => {
  const { element } = props;
  const auth = useRecoilValue(authState);

  if (auth) {
    return (
      <>
        <Navigate to="/" replace={false} />
      </>
    );
  } else {
    return <>{element}</>;
  }
};

// ログイン後の画面(Home)を表示するためのRouter
const PrivateRoute = (props: Props) => {
  const { element } = props;
  const auth = useRecoilValue(authState);

  if (auth) {
    return <>{element}</>;
  } else {
    return <Navigate to="/login" replace={false} />;
  }
};


function App() {
  const setAuth = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(fireauth, async (user) => {
      if (user) {
        const tempUser = {
          id: user.uid,
          name: user?.displayName,
          email: user?.email,
        };
        setAuth(tempUser);
        console.log("ログイン成功に成功しました");
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginRoute element={<Login />} />} />
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
