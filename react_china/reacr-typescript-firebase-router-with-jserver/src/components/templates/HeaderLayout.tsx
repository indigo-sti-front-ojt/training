import React from "react";
// import { useEffect } from "react";
import { memo, FC, ReactNode } from "react";

import { Header } from "../organisms/layouts/Header";
// import { useLoginUserContext } from "../../context/LoginUserContext";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

type Props = {
  children: ReactNode; //ReactNodeはreaturn内のタグで囲った要素
};

export const HeaderLayout: FC<Props> = memo((props: Props) => {
  const { children } = props;
  // const { setLoginUser } = useLoginUserContext();

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) setLoginUser(user);
  //   });
  // }, []);
  return (
    <>
      <Header />
      {children}
    </>
  );
});

HeaderLayout.displayName = "HeaderLayout";
