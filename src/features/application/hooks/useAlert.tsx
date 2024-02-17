import { useMemo, useState } from "react";

import { Alert, AlertIcon } from "@chakra-ui/react";

const useAlert = () => {
  const [alert, setAlert] = useState<{
    message: string;
    status: "error" | "success";
  } | null>(null);

  const AlertComponent = useMemo(() => {
    if (!alert) {
      return null;
    }

    return (
      <Alert status={alert?.status}>
        <AlertIcon />
        {alert?.message}
      </Alert>
    );
  }, [alert]);

  const alertError = (error: unknown) => {
    if (error instanceof Error) {
      setAlert({ message: error.message, status: "error" });
    }
  };

  const alertSuccess = (message: string) => {
    setAlert({ message, status: "success" });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return {
    AlertComponent,
    setAlert,
    alertError,
    alertSuccess,
    clearAlert,
  };
};

export default useAlert;
