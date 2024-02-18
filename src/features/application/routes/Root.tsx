/* eslint-disable import/no-cycle */
import { useRef } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { useFirebaseAuthState, AuthStateContext } from "@/features/auth";

import GlobalNav from "../components/GlobalNav";
import LoadingBar from "../components/LoadingBar";
import LoadingBarContext from "../context/LoadingBarContext";
import useFriendlyForwarding from "../hooks/useFriendlyForwarding";

function Root() {
  const loadingBarRef = useRef(null);
  const authState = useFirebaseAuthState();

  useFriendlyForwarding();

  return (
    <AuthStateContext.Provider value={authState}>
      <LoadingBarContext.Provider value={loadingBarRef}>
        <LoadingBar ref={loadingBarRef} />
        <GlobalNav />
        {authState.status !== "loading" && (
          <>
            <Outlet />
            <ScrollRestoration />
          </>
        )}
      </LoadingBarContext.Provider>
    </AuthStateContext.Provider>
  );
}

export default Root;
