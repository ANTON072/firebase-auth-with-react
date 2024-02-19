/* eslint-disable import/no-cycle */
import { useEffect, useCallback, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { useFirebaseAuthState, AuthStateContext } from "@/features/auth";

import { useLoadingBar } from "..";
import GlobalNav from "../components/GlobalNav";
import { SESSION_FORWARDING_URL_KEY } from "../constants";

function Root() {
  const location = useLocation();

  const authState = useFirebaseAuthState();

  const loadingBar = useLoadingBar();

  const prevStatus = useRef<string>("");

  useEffect(() => {
    if (
      authState.status !== prevStatus.current &&
      authState.status === "loading"
    ) {
      prevStatus.current = authState.status;
      loadingBar?.current?.continuousStart();
    }

    if (
      authState.status !== prevStatus.current &&
      authState.status !== "loading"
    ) {
      prevStatus.current = authState.status;
      loadingBar?.current?.complete();
    }

    return () => {
      if (authState.status !== prevStatus.current) {
        loadingBar?.current?.complete();
      }
    };
  }, [authState.status]);

  const storeLocation = useCallback(() => {
    // pathnameにauthが含まれていなかったら実行する
    if (!location.pathname.includes("auth")) {
      const urlWithoutDomain =
        location.pathname + location.search + location.hash;

      sessionStorage.setItem(SESSION_FORWARDING_URL_KEY, urlWithoutDomain);
    }
  }, [location]);

  const removeLocation = useCallback(() => {
    if (!location.pathname.includes("auth")) {
      sessionStorage.removeItem(SESSION_FORWARDING_URL_KEY);
    }
  }, [location]);

  useEffect(() => {
    storeLocation();
    return () => {
      removeLocation();
    };
  }, [location]);

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
