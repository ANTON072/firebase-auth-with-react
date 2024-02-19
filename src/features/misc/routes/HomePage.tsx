import { Link } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import { useAuthState } from "@/features/auth";

function HomePage() {
  const authState = useAuthState();

  return (
    <Box p={5}>
      {authState.status === "login" ? (
        <h1>ログイン済み</h1>
      ) : (
        <h1>未ログイン</h1>
      )}
      <Link to="/auth/sign-in">Sign in</Link>
    </Box>
  );
}

export default HomePage;
