import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SESSION_STORAGE_KEY = "forwarding_url";

const useFriendlyForwarding = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const storeLocation = () => {
    // pathnameにauthが含まれていなかったら実行する
    if (!window.location.pathname.includes("auth")) {
      const urlWithoutDomain =
        location.pathname + location.search + location.hash;

      sessionStorage.setItem(SESSION_STORAGE_KEY, urlWithoutDomain);
    }
  };

  const removeLocation = () => {
    if (!window.location.pathname.includes("auth")) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  };

  const redirectBackOr = (defaultPath: string) => {
    const url = sessionStorage.getItem(SESSION_STORAGE_KEY);
    navigate(url ?? defaultPath);
  };

  useEffect(() => {
    storeLocation();
    return () => {
      removeLocation();
    };
  }, [location]);

  return { redirectBackOr };
};

export default useFriendlyForwarding;
