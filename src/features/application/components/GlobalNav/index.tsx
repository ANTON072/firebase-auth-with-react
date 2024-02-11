/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link as RouterLink } from "react-router-dom";

import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import { useAuthState } from "@/features/auth";

function GlobalNav() {
  const authState = useAuthState();

  return (
    <Grid
      bg="white"
      minH="60px"
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle="solid"
      borderColor="gray.200"
      alignItems={{ base: "center" }}
      templateColumns={{ base: "1fr auto" }}
    >
      <GridItem>
        <Text as="h1" fontWeight="bold">
          <RouterLink to="/">Firebase Auth Example</RouterLink>
        </Text>
      </GridItem>
      <GridItem>
        {authState.status === "logout" && (
          <Flex gap={3}>
            <Button as={RouterLink} to="/auth/sign-in" colorScheme="teal">
              Sign in
            </Button>
            <Button as={RouterLink} to="/auth/sign-up" colorScheme="teal">
              Sign up
            </Button>
          </Flex>
        )}
        {authState.status === "login" && (
          <Flex gap={3}>
            <Button colorScheme="teal">Sing out</Button>
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
}

export default GlobalNav;
