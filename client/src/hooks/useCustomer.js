// client/src/hooks/useCustomer.js
import { useState, useEffect } from "react";

async function fetchCustomerId() {
  try {
    const res = await fetch("http://localhost:8080/api/v1/getCustomerId", {
      credentials: "include", // Make sure to include credentials
    });

    if (res.status === 400) {
      console.error("User is not logged in");
      return null;
    }

    const data = await res.json();
    setCustomerId(data.customerId);
  } catch (error) {
    console.error("Failed to get customerID", error);
  }
}


export default fetchCustomerId;
