import { Outlet, ScrollRestoration } from "react-router-dom";

import { GlobalNav } from "@/features/application/components";
import { useFirebaseAuthState, AuthStateContext } from "@/features/auth";

function Root() {
  const authState = useFirebaseAuthState();

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
