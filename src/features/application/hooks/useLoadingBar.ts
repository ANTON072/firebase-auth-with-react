/* eslint-disable @typescript-eslint/no-unused-vars */
import { MutableRefObject, useContext } from "react";

import { LoadingBarRef } from "../components/LoadingBar";
import LoadingBarContext from "../context/LoadingBarContext";

const useLoadingBar = () => {
  const loadingBar = useContext(
    LoadingBarContext
  ) as unknown as MutableRefObject<LoadingBarRef | null>;
  return loadingBar;
};

export default useLoadingBar;
