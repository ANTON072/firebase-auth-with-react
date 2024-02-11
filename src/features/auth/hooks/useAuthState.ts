import { useContext } from "react";

import AuthStateContext from "../context/AuthStateContext";

export function useAuthState() {
  const authState = useContext(AuthStateContext);

  return authState;
}

export default useAuthState;
