import React, { Children, useEffect } from "react";
import { useLocation } from "react-router-dom";

type ChildrenProps = {
  children: React.ReactElement[];
};
export const ListChildMapComponent = ({ children }: ChildrenProps) => {
  return (
    <>
      {Children.map(children, (child: React.ReactNode) => {
        return <>{child}</>;
      })}
    </>
  );
};
