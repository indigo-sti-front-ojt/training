import React from "react";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { UserDBContainer } from "../provider/UserDBProvider";
import { LodingContainer } from "./LoadingProvider";
import { ShopDBContainer } from "./ShopDBProvider";
import { TagDBContainer } from "./TagDBProvider";
import { ImageContainer } from "./ImageProvider";
type ChildrenProps = {
  children: React.ReactElement;
};
export const Providers = ({ children }: ChildrenProps) => {
  return (
    <>
      <LodingContainer.Provider>
        <ImageContainer.Provider>
          <TagDBContainer.Provider>
            <ShopDBContainer.Provider>
              <UserDBContainer.Provider>
                <AuthUserContainer.Provider>
                  {children}
                </AuthUserContainer.Provider>
              </UserDBContainer.Provider>
            </ShopDBContainer.Provider>
          </TagDBContainer.Provider>
        </ImageContainer.Provider>
      </LodingContainer.Provider>
    </>
  );
};
