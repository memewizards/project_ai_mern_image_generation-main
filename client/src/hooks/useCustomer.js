// client/src/hooks/useCustomer.js
import { useState, useEffect } from "react";

async function fetchCustomer() {
  try {
    const res = await fetch("http://localhost:8080/profile", {
      credentials: "include", // Make sure to include credentials
    });

    if (res.status === 404) {
      console.error("User not found");
      return null;
    }

    const data = await res.json();
    console.log("Fetched customer data:", data);
    return data.user;
  } catch (error) {
    console.error("Failed to get customer data", error);
    return null;
  }
}

export default function useCustomer() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer().then((fetchedCustomer) => {
      setCustomer(fetchedCustomer);
    });
  }, []);

  return customer;
}
