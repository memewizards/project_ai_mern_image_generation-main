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

    console.log("API response:", res.status, res.statusText); // Log the response status and statusText

    if (res.status === 404) {
      console.error("User not found");
      return null;
    }

    const data = await res.json();
    console.log("Fetched data:", data);

    if (!data.user) {
      console.error("User property not found in the API response");
      return null;
    }

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

    console.log("Endpoint URL:", endpoint); // Log the endpoint URL

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
