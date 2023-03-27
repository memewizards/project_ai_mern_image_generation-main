import { useState, useEffect } from "react";

const useCustomer = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/account");
        const data = await response.json();
        setCustomer(data.customer);
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  return { customer, loading };
};

export default useCustomer;
