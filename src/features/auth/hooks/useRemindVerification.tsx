/* eslint-disable import/no-cycle */
import { useState, useMemo } from "react";

import { Button, Stack, Text, Box } from "@chakra-ui/react";
import { getAuth, sendEmailVerification } from "firebase/auth";

const useRemindVerification = () => {
  const auth = getAuth();

  const [isSent, setIsSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isShowReminder, setIsShowReminder] = useState(false);

  const [sentError, setSentError] = useState<Error | null>(null);

  const handleSendEmailVerification = async () => {
    try {
      setIsLoading(true);
      await sendEmailVerification(auth.currentUser!);
      setIsSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setSentError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const RemindVerificationComponent = useMemo(() => {
    if (!isShowReminder) return null;

    if (sentError) {
      return <Text color="red.500">{sentError.message}</Text>;
    }

    return isSent ? (
      <Text textAlign="center">確認メールを送信しました</Text>
    ) : (
      <Stack alignItems="center">
        <Text color="red.600">登録済みのメールアドレスです</Text>
        <Box>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSendEmailVerification}
            isLoading={isLoading}
          >
            確認メールを再送信する
          </Button>
        </Box>
      </Stack>
    );
  }, [isSent, isLoading, isShowReminder]);

  return { RemindVerificationComponent, setIsShowReminder };
};

export default useRemindVerification;
