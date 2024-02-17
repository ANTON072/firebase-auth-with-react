/* eslint-disable import/no-cycle */
import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useAlert } from "@/features/application";
import useFriendlyForwarding from "@/features/application/hooks/useFriendlyForwarding";

import RemindVerification from "../components/RemindVerification";

function SignInPage() {
  const auth = getAuth();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [isShowReminder, setIsShowReminder] = useState(false);

  const { AlertComponent, alertError, clearAlert } = useAlert();

  const { redirectBackOr } = useFriendlyForwarding();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearAlert();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified) {
        toast({
          title: "ログインしました",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        redirectBackOr("/");
      } else {
        setIsShowReminder(true);
      }
    } catch (error) {
      alertError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardBody minW={500}>
        <Heading fontSize={20} mb={5}>
          Sing in
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            {AlertComponent}
            <RemindVerification isShow={isShowReminder} />
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" required />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" required />
            </FormControl>
            <Box textAlign="right">
              <Button colorScheme="teal" type="submit" isLoading={isLoading}>
                Sign up
              </Button>
            </Box>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
}

export default SignInPage;
