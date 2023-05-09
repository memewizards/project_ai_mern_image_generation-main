import React, { useState, useEffect } from 'react';
import useCustomer from "../hooks/useCustomer";

const Profile = () => {
  
  const [user, setUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const profile = useCustomer(`${import.meta.env.VITE_APP_URL}/profile`);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
    }

    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      handleCheckBalance();
    }
  }, [user]);

  const handleSubtractTokens = (numTokens) => {
    const authToken = localStorage.getItem("authToken");
    console.log("the auth token is: ", authToken)

    fetch(`${import.meta.env.VITE_APP_URL}/subtract-tokens`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: user.email,
        tokensToSubtract: numTokens
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const newBalance = parseFloat(data.user.tokenBalance);
        console.log(`New token balance: ${newBalance}`);
        setTokenBalance(newBalance);
        emitTokenBalanceUpdate(newBalance);
      })
      .catch((error) => console.error(error));
  };

  const handleCheckBalance = () => {
    const authToken = localStorage.getItem('authToken');

    fetch(`${import.meta.env.VITE_APP_URL}/getTokenBalance?email=${user.email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        const newBalance = parseFloat(data.tokenBalance);
        console.log(`New token balance: ${newBalance}`);
        setTokenBalance(newBalance);
        emitTokenBalanceUpdate(newBalance);
      })
      .catch(error => console.error(error));
  };

  const emitTokenBalanceUpdate = (newBalance) => {
    const event = new CustomEvent("tokenBalanceUpdate", { detail: newBalance });
    window.dispatchEvent(event);
  };

  

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto mt-10">
          <h1 className="text-4xl mb-4">User Profile</h1>
          <hr />
          {user ? (
            <div className="flex flex-row">
              <div className="w-1/6">
                <img
                  src="/assets/profileIcon-71a8df24.svg"
                  className="w-full"
                />
              </div>
              <div className="w-5/6 ml-4">
                <h3 className="text-2xl">
                  {user.firstName} {user.lastName} 
                </h3>
                <p>Logged in using {user.source}</p>
                <p>{user.email}</p>
                
                <p>Token Balance: {parseFloat(tokenBalance).toFixed(3)}</p>
                
              
                <p>
                  
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl">User not found. You can try refreshing the page.</h1>
          )}
        </div>
      </main>

      <footer className="mt-auto py-3">
        <div className="container mx-auto">
          
        </div>
      </footer>
    </div>
  );
};

export default Profile;
