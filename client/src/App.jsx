import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePost,
  ImageGenerator,
  UserLogin,
  Account,
  Signup,
  Profile,
  BasicPlan,
  ProPlan,
  None,
} from "./page";
import { logo } from "./assets";
import { profileIcon } from "./assets";
import { useUserData } from "./hooks/useUserData";

const App = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const { user, isUserFetched, fetchUserData } = useUserData(setTokenBalance);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (isUserFetched) {
      fetchUserData();
    }
  }, [isUserFetched, fetchUserData]);

  useEffect(() => {
    if (user) {
      handleCheckBalance();
    }
  }, [user]);

    useEffect(() => {
    if (user) {
      handleSubtractTokens();
    }
  }, [user]);

  const handleCheckBalance = () => {
    const authToken = localStorage.getItem("authToken");

    fetch(`http://localhost:8080/getTokenBalance?email=${user.email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
      const newBalance = parseFloat(data.tokenBalance);
      console.log(`New token balance: ${newBalance}`);
      emitTokenBalanceUpdate(newBalance);
      })
      .catch((error) => console.error(error));
  };

    const handleSubtractTokens = (numTokens) => {
  const authToken = localStorage.getItem("authToken");

 fetch(`http://localhost:8080/subtract-tokens`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    email: user.email,
    tokensToSubtract: numTokens,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    const newBalance = parseFloat(data.tokenBalance);
    console.log(`New token balance: ${newBalance}`);
    emitTokenBalanceUpdate(newBalance);
  })
  .catch((error) => console.error(error));
};




const emitTokenBalanceUpdate = (newBalance) => {
    const event = new CustomEvent("tokenBalanceUpdate", { detail: newBalance });
    window.dispatchEvent(event);
  };


  



 return (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div className="relative">
        <Link to="/ImageGenerator">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
            Create
          </button>
        </Link>
      </div>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
      </div>

      <div className="relative">
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 focus:outline-none"
      onClick={toggleDropdown}
    >
      <img src={profileIcon} alt="profile" className="w-6 h-6" />
    </button>
<p>Tokens available: {typeof tokenBalance === "number" && !isNaN(tokenBalance) ? parseFloat(tokenBalance).toFixed(3) : "0.000"}</p>
    {showDropdown && (
          <div className="absolute top-10 left-0 bg-white border border-gray-300 rounded-md shadow-lg">
            <Link
              to="/Profile"
              className="block px-4 py-2 hover:bg-gray-100 font-bold"
              style={{color: "blue"}}
            >
              Profile
            </Link>
            <Link
              to="/UserLogin"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/Account"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Manage Account
            </Link>
          </div>
        )}
        
        
      </div>
    </header>


      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/ImageGenerator" element={<ImageGenerator />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/BasicPlan" element={<BasicPlan />} />
          <Route path="/ProPlan" element={<ProPlan />} />
          <Route path="/None" element={<None />} />
          <Route path="/checkout" element={<checkout />} />
          <Route path="/createBillingSession" element={<createBillingSession />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
