import { createContext } from "react";

import { AuthState, initialState } from "../hooks/useFirebaseAuthState";

const AuthStateContext = createContext<AuthState>(initialState);

export default AuthStateContext;
