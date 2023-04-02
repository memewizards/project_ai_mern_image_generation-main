// client/src/hooks/useCustomer.js
import { useState, useEffect } from "react";

async function fetchData(endpoint) {
  try {
    const res = await fetch(endpoint, {
      credentials: "include", // Make sure to include credentials
    });

    if (res.status === 404) {
      console.error("User not found");
      return null;
    }

    const data = await res.json();
    console.log("Fetched data:", data);
    return data.user;
  } catch (error) {
    console.error("Failed to get data", error);
    return null;
  }
}

export default function useCustomer(endpoint) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(endpoint).then((fetchedData) => {
      setData(fetchedData);
    });
  }, [endpoint]);

  return data;
}
