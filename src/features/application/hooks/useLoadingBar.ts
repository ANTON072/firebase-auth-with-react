import { MutableRefObject, useContext } from "react";

import { LoadingBarRef } from "../components/LoadingBar";
import LoadingBarContext from "../context/LoadingBarContext";

const useLoadingBar = () => {
  const loadingBar = useContext(
    LoadingBarContext
  ) as unknown as MutableRefObject<LoadingBarRef>;

  return loadingBar;
};

export default useLoadingBar;
