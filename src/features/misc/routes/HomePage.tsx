import { useEffect } from "react";

import { Box } from "@chakra-ui/react";

import useLoadingBar from "@/features/application/hooks/useLoadingBar";
import { useAuthState } from "@/features/auth";

function HomePage() {
  const authState = useAuthState();

  const loadingBar = useLoadingBar();
  // const loadingBar = useContext(LoadingBarContext);

  useEffect(() => {
    loadingBar.current.continuousStart();
  }, []);

  return (
    <Box p={5}>
      {authState.status === "login" ? (
        <h1>ログイン済み</h1>
      ) : (
        <h1>未ログイン</h1>
      )}
    </Box>
  );
}

export default HomePage;
