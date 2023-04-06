import { useEffect, useState } from "react";

const useTokenBalance = (isLoggedIn, userEmail) => {
  const [tokenBalance, setTokenBalance] = useState(null);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        const response = await fetch(
          `/getTokenBalance?userEmail=${userEmail}`
        );
        const data = await response.json();
        setTokenBalance(data.tokenBalance);
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn && userEmail) {
      fetchTokenBalance();
    } else {
      setTokenBalance(null);
    }
  }, [isLoggedIn, userEmail]);

  return tokenBalance;
};

export default useTokenBalance;
