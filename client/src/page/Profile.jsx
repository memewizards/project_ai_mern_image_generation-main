import React, { useState, useEffect } from 'react';
import useCustomer from "../hooks/useCustomer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const profile = useCustomer("https://localhost:8080/profile");

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

    fetch(`http://localhost:8080/subtract-tokens`, {
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

    fetch(`http://localhost:8080/getTokenBalance?email=${user.email}`, {
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
                  src="https://lh3.googleusercontent.com/a-/AOh14GjSb0KZnfOv_wP8cT6M7wEoGMlpG1fFbsO1Uszm7lw=s96-c"
                  className="w-full"
                />
              </div>
              <div className="w-5/6 ml-4">
                <h3 className="text-2xl">
                  {user.firstName} {user.lastName} (#{user.id})
                </h3>
                <p>Logged in using {user.source}</p>
                <p>{user.email}</p>
                <p>Last visited on {user.lastVisited}</p>
                <p>Token Balance: {parseFloat(tokenBalance).toFixed(3)}</p>
                
                <button onClick={handleCheckBalance}>Check Token Balance</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckBalance}>
                  Check Token Balance
                </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSubtractTokens(0.1)} // Pass the number of tokens to subtract
                  >
                    Subtract .1 Token
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSubtractTokens(1)} // Pass the number of tokens to subtract
                  >
                    Subtract 1 Token
                  </button>
                <p>
                  <a href="/auth/logout" className="text-blue-600">
                    Logout
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl">User not found</h1>
          )}
        </div>
      </main>

      <footer className="mt-auto py-3">
        <div className="container mx-auto">
          <span className="text-gray-600">
            The full guide is available at{' '}
            <a
              href="https://saasbase.dev/"
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              saasbase.dev
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
