import { useState } from "react";
import { createContainer } from "unstated-next";

const useLogingContainer = () => {
  const [first, setFirst] = useState<boolean>(false);
  const [loading, setLoging] = useState<boolean>(false);

  return { loading, setLoging, first, setFirst };
};

export const LodingContainer = createContainer(useLogingContainer);
