import React from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// import { fireauth } from "./firebase";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
// import { authState } from "./store/AuthState";
// import { isAuthCheckedState } from "./store/isAuthCheckedState";

// const PrivateRoute = (props) => {
//   const { path, element } = props;
//   const auth = useRecoilValue(authState).auth;

//   return auth ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// const GuestRoute = (props) => {
//   const { path, element } = props;
//   const auth = useRecoilValue(authState).auth;

//   return auth ? <Navigate to="/" /> : <Route path={path} element={element} />;
// };

function App() {
  // const setAuth = useSetRecoilState(authState);
  // const [isAuthChecked, setIsAuthChecked] = useRecoilState(isAuthCheckedState);

  // useEffect(() => {
  //   onAuthStateChanged(fireauth, async (user) => {
  //     if (user) {
  //       setAuth(user);
  //     }
  //     setIsAuthChecked(true);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <p>aaa</p>
      <Home />
      <Login />
    </>
  );
}

export default App;
