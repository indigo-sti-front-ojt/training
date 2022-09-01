import { useState } from "react";
import { userType } from "../types/userType";
import { createContainer } from "unstated-next";

const initialzeuser: userType = {
  uid: "",
  photoIcon: "",
  nickname: "",
  mailddress: "",
};

const useAuthUserContainer = () => {
  const [user, setUser] = useState<userType>(initialzeuser);
  const [isLoggined, setisLoggined] = useState<boolean>(false);
  const [isAuthChecked, setisAuthChecked] = useState<boolean>(false);

  return {
    user,
    setUser,
    isLoggined,
    setisLoggined,
    isAuthChecked,
    setisAuthChecked,
  };
};

export const AuthUserContainer = createContainer(useAuthUserContainer);
