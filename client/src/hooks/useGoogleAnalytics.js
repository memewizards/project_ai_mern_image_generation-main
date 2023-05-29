import { useEffect } from "react";

const useGoogleAnalytics = (trackingId) => {
  useEffect(() => {
    if (!trackingId) {
      console.error("Google Analytics tracking ID is missing");
      return;
    }

    // Load the Google Analytics script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize the tracking code
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", trackingId);
  }, [trackingId]);

  // Return an empty object as no data is needed to be passed
  return {};
};

export default useGoogleAnalytics;
