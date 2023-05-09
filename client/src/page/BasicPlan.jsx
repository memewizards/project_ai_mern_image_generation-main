// BasicPlan.jsx
import React from "react";

const BasicPlan = () => {
  return (
    <div className="d-flex flex-column h-100">
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">View - For Basic plan customers only</h1>
          <p className="lead">
            If you're able to view this page - Success! You have purchased the
            Basic plan.
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

export default BasicPlan;
