import { useNavigate } from "react-router-dom";

import { SESSION_FORWARDING_URL_KEY } from "../constants";

const useFriendlyForwarding = () => {
  const navigate = useNavigate();

  const redirectBackOr = (defaultPath: string) => {
    const url = sessionStorage.getItem(SESSION_FORWARDING_URL_KEY);
    navigate(url ?? defaultPath);
  };

  return { redirectBackOr };
};

export default useFriendlyForwarding;
