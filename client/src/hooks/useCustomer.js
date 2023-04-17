import { useState, useEffect } from "react";

async function fetchData(endpoint) {
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(endpoint, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const onStorageChange = (e) => {
      if (e.key === "authToken") {
        fetchData(endpoint).then((fetchedData) => {
          setData(fetchedData);
        });
      }
    };

    // Choose the correct protocol based on the environment
    if (process.env.NODE_ENV === "development") {
      endpoint = endpoint.replace("https://", "http://");
    }

    fetchData(endpoint).then((fetchedData) => {
      setData(fetchedData);
    });

    // Listen for changes in localStorage
    window.addEventListener("storage", onStorageChange);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("storage", onStorageChange);
    };
  }, [endpoint]);

  return data;
}