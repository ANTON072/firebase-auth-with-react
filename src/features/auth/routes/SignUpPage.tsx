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
} from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { useAlert } from "@/features/application";

function SignUpPage() {
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { AlertComponent, setAlert } = useAlert();

  const showError = (error: unknown) => {
    if (error instanceof Error) {
      setAlert({ message: error.message, status: "error" });
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
      showError(error);
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
            <>
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
            </>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
}

export default SignUpPage;
