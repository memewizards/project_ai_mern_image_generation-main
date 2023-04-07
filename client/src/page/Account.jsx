import React, { useState, useEffect } from "react";
import useCustomer from "../hooks/useCustomer";
import { loadStripe } from '@stripe/stripe-js';

import Stripe from "stripe";


const Account = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const customer = useCustomer('https://localhost:8080/account');

  const handleProductSelection = (event) => {
    setSelectedProduct(event.target.value);
  };

 const handleCheckout = async (event) => {
  event.preventDefault();

  console.log('handleCheckout called');
  if (!selectedProduct || !customer) return;

  console.log('Selected product:', selectedProduct);
  console.log('Customer:', customer);

  let stripe;
  try {
    stripe = await loadStripe("pk_test_LFl6r8t36e0jVZElE4YwlT2Y00mulyi0Qt");
    console.log('Stripe instance:', stripe);
  } catch (error) {
    console.error('Error loading Stripe:', error);
    return;
  }
  console.log("Email being sent in headers:", customer.email);

  const response = await fetch("http://localhost:8080/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: customer.email,
    },
    body: JSON.stringify({
      product: selectedProduct,
      customerID: customer.billingID,
    }),
  });
  console.log('Fetch response:', response);

  const { sessionId } = await response.json();
  console.log('Session ID:', sessionId);

  stripe.redirectToCheckout({ sessionId });
 };

const handleManageBilling = async (event) => {
  event.preventDefault();

  if (!customer) return;

  try {
    const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    email: customer.email,
    // Add the following headers to enable CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  },
      body: JSON.stringify({
        customer: customer.billingID,
      }),
    };
    
    const response = await fetch("http://localhost:8080/billing", requestOptions);
    const result = await response.json();
    window.location.replace(result.url);

    // Add the following line to redirect the user to the Stripe billing page
    window.location.href = 'https://billing.stripe.com/p/login/test_3csdU4cnx1S41mo288';

  } catch (error) {
    console.error("Error in handleManageBilling:", error);
  }
};





  if (!customer) {
    return <div>Loading...</div>;
  }

 return (
  <div className="flex flex-col min-h-screen">
    {/* Begin page content */}
    <main className="flex-grow px-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-5">Account Dashboard</h1>
        {customer ? (
          <>
            <p className="text-lg">Hi {customer.email}</p>
            {customer.plan === 'none' ? (
              <>
                <p className="text-lg my-4">
                  You are currently not on any plan. Purchase a subscription
                  below.
                </p>
                <div className="mb-4">
                  <input
                    type="radio"
                    id="basic"
                    name="product"
                    value="basic"
                    onChange={handleProductSelection}
                    className="mr-2"
                  />
                  <label htmlFor="basic">Basic for $10</label>
                </div>
                <div className="mb-4">
                  <input
                    type="radio"
                    id="pro"
                    name="product"
                    value="pro"
                    onChange={handleProductSelection}
                    className="mr-2"
                  />
                  <label htmlFor="pro">Pro for $12</label>
                </div>
                <button
                  className="btn btn-primary py-2 px-4 bg-blue-600 text-white font-semibold rounded"
                  id="checkout-button"
                  type="submit"
                  onClick={handleCheckout}
                >
                  Buy now
                </button>
              </>
            ) : (
              <>
                <p className="text-lg my-4">
                  You are currently on the {customer.plan} plan
                </p>
                {customer.hasTrial ? (
                  <p className="text-lg">
                    Trial active until {customer.endDate}
                  </p>
                ) : (
                  <p className="text-lg">
                    Trial inactive. Plan will end on {customer.endDate}
                  </p>
                )}
                <hr className="my-6 border-t-2 border-gray-200" />
                <p className="mb-4">
                  You can access your content by clicking one of the buttons
                  below.
                </p>
                <ul className="list-disc list-inside mb-6">
                  <li>
                    <a href="/none" className="text-blue-600 hover:underline">
                      None
                    </a>
                  </li>
                  <li>
                    <a
                      href="/BasicPlan"
                      className="text-blue-600 hover:underline"
                    >
                      Basic
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ProPlan"
                      className="text-blue-600 hover:underline"
                    >
                      Pro
                    </a>
                  </li>
                </ul>
                <hr className="mb-6 border-t-2 border-gray-200" />
                <p className="text-lg mb-4">
                  Not happy with your current plan? Cancel or Upgrade by
                  clicking the button below.
                </p>
                <button
                  className="btn btn-lg btn-primary py-2 px-6 bg-blue-600 text-white font-semibold rounded"
                  id="manage-billing-button"
                  type="submit"
                  onClick={handleManageBilling}
                >
                  Manage Billing
                </button>

              </> 
            )}
          </>
        ) : (
   <p>User does not exist in the database</p>
        )}
      </div>
    </main>
    <footer className="bg-gray-200 mt-auto py-3">
      <div className="container mx-auto text-center">
        <span className="text-muted">
          The full guide is available at{' '}
          <a
            href="https://saasbase.dev/"
            className="text-blue-600 hover:underline"
          >
            saasbase.dev
          </a>
        </span>
      </div>
    </footer>
    <script
      src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossOrigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
      crossOrigin="anonymous"
    ></script>
    <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
    <script>{`var customer = ${JSON.stringify(customer)}; console.log(customer);`}</script>
    <script type="text/javascript" src="./js/account.js"></script>
  </div>
);
};

export default Account;
