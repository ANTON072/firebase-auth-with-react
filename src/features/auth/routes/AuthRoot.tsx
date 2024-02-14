import { Outlet } from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";

function AuthRoot() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 60px)"
      backgroundColor="gray.100"
    >
      <Box position="relative" top="-60px">
        <Outlet />
      </Box>
    </Flex>
  );
}

export default AuthRoot;
