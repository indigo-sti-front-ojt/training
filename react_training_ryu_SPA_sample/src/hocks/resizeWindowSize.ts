import { useLayoutEffect, useState } from "react";

export const useWindowSize = (): string => {
  const [breakPoint, setBreakPoint] = useState("sm");
  useLayoutEffect(() => {
    const updateSize = (): void => {
      if (innerWidth < 640) {
        setBreakPoint("sm");
      } else if (innerHeight < 768) {
        setBreakPoint("md");
      } else if (innerHeight < 1024) {
        setBreakPoint("lg");
      } else if (innerWidth < 1280) {
        setBreakPoint("xl");
      } else {
        setBreakPoint("2xl");
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return breakPoint;
};
