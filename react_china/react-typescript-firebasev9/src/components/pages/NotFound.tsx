import React from "react";
import { memo, FC } from "react";

export const NotFound: FC = memo(() => {
  return (
    <>
      <p>404ページです。</p>
    </>
  );
});

NotFound.displayName = "NotFound";
