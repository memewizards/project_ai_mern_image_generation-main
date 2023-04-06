import React, { useState, useEffect } from 'react';
import useCustomer from "../hooks/useCustomer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const profile = useCustomer("https://localhost:8080/profile");

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      handleCheckBalance();
    }
  }, [user]); // Call handleCheckBalance when the user state is updated

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
        const newBalance = parseInt(data.tokenBalance);
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
                <p>Token Balance: {tokenBalance}</p> {/* Display the token balance */}
                <button onClick={handleCheckBalance}>Check Token Balance</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckBalance}>
                  Check Token Balance
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
