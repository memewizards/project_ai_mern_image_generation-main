import { useState, useEffect, useCallback } from "react";
import useCustomer from "./useCustomer";

export const useUserData = (updateTokenBalance) => {
  const [user, setUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const profile = useCustomer("https://localhost:8080/profile");

  useEffect(() => {
    if (profile) {
      setUser(profile);
      setIsUserFetched(true);
    }
  }, [profile]);

  useEffect(() => {
    const onTokenBalanceUpdate = (e) => {
      updateTokenBalance(e.detail);
    };

    window.addEventListener("tokenBalanceUpdate", onTokenBalanceUpdate);

    return () => {
      window.removeEventListener("tokenBalanceUpdate", onTokenBalanceUpdate);
    };
  }, [updateTokenBalance]);

  const fetchUserData = useCallback(() => {
    setIsUserFetched(true);
  }, []);

  return { user, isUserFetched, fetchUserData };
};
