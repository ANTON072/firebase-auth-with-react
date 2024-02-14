/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { useAlert } from "@/features/application";
import { useAuthState } from "@/features/auth";

function SignUpPage() {
  const auth = getAuth();

  const authState = useAuthState();

  const [isLoading, setIsLoading] = useState(false);

  const { AlertComponent, setAlert } = useAlert();

  const handleSendEmailVerification = async () => {
    try {
      if (authState.user) {
        await sendEmailVerification(authState.user);
        setAlert({ message: "確認メールを送信しました", status: "success" });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setAlert({ message: error.message, status: "error" });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // 確認メールの送信
      await sendEmailVerification(auth.currentUser!);
      setAlert({ message: "確認メールを送信しました", status: "success" });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setAlert({ message: error.message, status: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardBody minW={500}>
        <Heading fontSize={20} mb={5}>
          Sing up
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            {AlertComponent}
            {authState.user && !authState.user.emailVerified && (
              <Alert status="info" flexDirection="column" gap={2}>
                <AlertDescription>確認メールを送信済みです</AlertDescription>
                <Button
                  size="sm"
                  variant="link"
                  onClick={handleSendEmailVerification}
                >
                  確認メールを再送信する
                </Button>
              </Alert>
            )}
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

export default SignUpPage;
