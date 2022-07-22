import React from "react";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { UserDBContainer } from "../provider/UserDBProvider";
type ChildrenProps = {
  children: React.ReactElement;
};
export const Providers = ({ children }: ChildrenProps) => {
  return (
    <>
      <UserDBContainer.Provider>
        <AuthUserContainer.Provider>{children}</AuthUserContainer.Provider>
      </UserDBContainer.Provider>
    </>
  );
};
