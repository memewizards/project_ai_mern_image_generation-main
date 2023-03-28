import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { preview } from '../assets';
import { FormField, Loader } from '../components';
import useCustomer from '../hooks/useCustomer';
import { Button } from 'react-bootstrap'; // import individual component

const Account = () => {
  const [customer, setCustomer] = useState(null);
  const { customerId } = useCustomer();

  useEffect(() => {
  if (customerId) {
    fetch(`http://localhost:8080/api/customers/${customerId}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data.customer))
      .catch((error) => console.error(error));
  }
}, [customerId]);

  return (
    <div className="d-flex flex-column h-100">
      {/* Begin page content */}
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">Account Dashboard</h1>
          {customer ? (
            <>
              <p className="lead">Hi {customer.email}</p>
              {customer.plan === 'none' ? (
                <>
                  <p className="lead">
                    You are currently not on any plan. Purchase a subscription
                    below.
                  </p>
                  <input
                    type="radio"
                    id="basic"
                    name="product"
                    value="basic"
                  />
                  <label htmlFor="basic">Basic for $10</label>
                  <br />
                  <input type="radio" id="pro" name="product" value="pro" />
                  <label htmlFor="pro">Pro for $12</label>
                  <br />
                  <button
                    className="btn btn-primary"
                    id="checkout-button"
                    type="submit"
                  >
                    Buy now
                  </button>
                </>
              ) : (
                <>
                  <p className="lead">
                    You are currently on the {customer.plan} plan
                  </p>
                  {customer.hasTrial ? (
                    <p className="lead">
                      Trial active until {customer.endDate}
                    </p>
                  ) : (
                    <p className="lead">
                      Trial inactive. Plan will end on {customer.endDate}
                    </p>
                  )}
                  <hr />
                  <p>You can access your content by clicking one of the buttons below.</p>
                  <ul>  
                    <li><a href="/none">None</a></li>  
                    <li><a href="/basic">Basic</a></li>  
                    <li><a href="/pro">Pro</a></li>  
                  </ul>  
                  <hr />  
                  <p className="mt-4 text-muted">
                    Not happy with your current plan? Cancel or Upgrade by
                    clicking the button below.
                  </p>
                  <button
                    className="btn btn-lg btn-primary"
                    id="manage-billing-button"
                    type="submit"
                  >
                    Manage Billing
                  </button>
                </>
              )}
            </>
          ) : (
            <p>User does not exist in the database</p>
          )}
        </div>
      </main>
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">
            The full guide is available at{' '}
            <a href="https://saasbase.dev/">saasbase.dev</a>
          </span>
        </div>
      </footer>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossOrigin="anonymous"
      ></script>
      <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
      <script>{`var customer = ${JSON.stringify(customer)}; console.log(customer);`}</script>
      <script type="text/javascript" src="./js/account.js"></script>
    </div>
  );
};

export default Account;
