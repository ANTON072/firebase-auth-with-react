/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, ScrollRestoration } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import { GlobalNav } from "@/features/application/components";
import { useFirebaseAuthState, AuthStateContext } from "@/features/auth";

function Root() {
  const authState = useFirebaseAuthState();

  return (
    <AuthStateContext.Provider value={authState}>
      <GlobalNav />
      {authState.status === "loading" ? (
        <Box p={5}>Loading...</Box>
      ) : (
        <Outlet />
      )}
      <ScrollRestoration />
    </AuthStateContext.Provider>
  );
}

export default Root;
