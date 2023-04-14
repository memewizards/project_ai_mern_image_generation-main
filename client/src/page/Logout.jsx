import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const emitTokenBalanceUpdate = (newBalance) => {
  const event = new CustomEvent("tokenBalanceUpdate", { detail: newBalance });
  window.dispatchEvent(event);
};

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setTokenBalance } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // To include cookies in the request
      });

      if (response.ok) {
        // Reset the isLoggedIn and tokenBalance states
        setIsLoggedIn(false);

        // Update the token balance to 0 and emit the custom event
        setTokenBalance(0);
        emitTokenBalanceUpdate(0);

        // Remove JWT token from localStorage
        localStorage.removeItem("authToken");

        // Redirect the user to the home page after logging out
        navigate('/');
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, [navigate, setIsLoggedIn, setTokenBalance]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-semibold mb-6">Logging out...</h1>
    </div>
  );
};

export default Logout;
