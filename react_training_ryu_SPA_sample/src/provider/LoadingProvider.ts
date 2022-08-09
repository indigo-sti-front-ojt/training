import { useState } from "react";
import { createContainer } from "unstated-next";

const useLogingContainer = () => {
  const [loading, setLoging] = useState<boolean>(false);
  return { loading, setLoging };
};

export const LodingContainer = createContainer(useLogingContainer);
