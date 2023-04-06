import { useState, useEffect } from "react";

async function fetchData(endpoint) {
  try {
    const res = await fetch(endpoint, {
      credentials: "include",
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
        fetchData(devEndpoint).then((fetchedData) => {
          setData(fetchedData);
        });
      }
    };

    // Replace 'https' with 'http' for development environment
    const devEndpoint = endpoint.replace("https://", "http://");
    fetchData(devEndpoint).then((fetchedData) => {
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
