
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
            Update the content on this page by editing the ./views/basic.ejs
            file
          </p>
          <p>
            <a href="/profile">Account Dashboard</a>
          </p>
        </div>
      </main>

      <div id="tokens-div">
        <p>
          Tokens: <span id="token-balance"></span>
        </p>
        <button id="use-tokens-btn">Use Tokens</button>
      </div>

      <div id="tokens-div">
        <button id="add-tokens-btn">Add 25 Free Tokens</button>
      </div>

      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">
            The full guide is available at{" "}
            <a href="https://saasbase.dev/">saasbase.dev</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ProPlan;
