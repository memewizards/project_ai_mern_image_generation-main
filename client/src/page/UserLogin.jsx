import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // get the email value from the input field
    const email = e.target.email.value;
    
    try {
      // send a POST request to /login with the email in the form data
      const response = await fetch('http://localhost:8080/userLogin', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        const customerId = data.customerId;
        navigate(`/account/${customerId}`);
      } else {
        // handle error responses here
        console.log("else has occured" + error);
      }
    } catch (error) {
      // handle network errors here
    }
  }

  return (
    <div className="container mx-auto px-4 my-12">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="py-4 px-6">
          <h1 className="text-xl font-bold mb-2">Log in</h1>
          <p className="text-gray-600 mb-4">This is a live demo on collecting Subscription payments for your saas using Stripe and Mongo</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
              <input type="email" id="email" name="email" className="border border-gray-400 p-2 w-full" placeholder="Enter your email" required autoFocus />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
            </div>
          </form>
        </div>
        <div className="py-4 px-6 bg-gray-100">
          
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
