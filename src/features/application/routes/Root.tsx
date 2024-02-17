/* eslint-disable import/no-cycle */
import { Outlet, ScrollRestoration } from "react-router-dom";

import { GlobalNav } from "@/features/application/components";
import { useFirebaseAuthState, AuthStateContext } from "@/features/auth";

import useFriendlyForwarding from "../hooks/useFriendlyForwarding";

function Root() {
  const authState = useFirebaseAuthState();

  useFriendlyForwarding();

  return (
    <AuthStateContext.Provider value={authState}>
      <GlobalNav />
      {authState.status !== "loading" && (
        <>
          <Outlet />
          <ScrollRestoration />
        </>
      )}
    </AuthStateContext.Provider>
  );
}

export default Root;
