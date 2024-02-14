/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";

import { useAuthState } from "@/features/auth";

function GlobalNav() {
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const authState = useAuthState();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      navigate("/auth/sign-in");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <Button
              colorScheme="teal"
              onClick={handleSignOut}
              isLoading={isLoading}
            >
              Sing out
            </Button>
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
}

export default GlobalNav;
