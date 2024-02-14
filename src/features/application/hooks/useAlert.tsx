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

  return {
    AlertComponent,
    setAlert,
  };
};

export default useAlert;
