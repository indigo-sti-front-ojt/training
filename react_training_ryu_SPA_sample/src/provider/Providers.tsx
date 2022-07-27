import React from "react";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { UserDBContainer } from "../provider/UserDBProvider";
import { ShopDBContainer } from "./ShopDBProvider";
import { TagDBContainer } from "./TagDBProvider";
type ChildrenProps = {
  children: React.ReactElement;
};
export const Providers = ({ children }: ChildrenProps) => {
  return (
    <>
      <TagDBContainer.Provider>
        <ShopDBContainer.Provider>
          <UserDBContainer.Provider>
            <AuthUserContainer.Provider>{children}</AuthUserContainer.Provider>
          </UserDBContainer.Provider>
        </ShopDBContainer.Provider>
      </TagDBContainer.Provider>
    </>
  );
};
