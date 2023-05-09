
import React from "react";

const ProPlan = () => {
  return (
    <div className="d-flex flex-column h-100">
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">View - For Pro plan customers only</h1>
          <p className="lead">
            If you're able to view this page - Success! You have purchased the
            Pro plan.
          </p>
        
          <p>
            <a href="/profile">Account Dashboard</a>
          </p>
        </div>
      </main>

    

      <footer className="footer mt-auto py-3">
        <div className="container">
        
        </div>
      </footer>
    </div>
  );
};

export default ProPlan;
