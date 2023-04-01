import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:8080/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get the email value from the input field
    const email = e.target.email.value;

    try {
      // send a POST request to /login with the email in the form data
      const response = await fetch("http://localhost:8080/userLogin", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        const customerId = data.customerId;
        navigate(`/account/${customerId}`);
      } else {
        // handle error responses here
        console.log("else has occured" + error);
      }
    } catch (error) {
      // handle network errors here
    }
  };

  return (
    <>
      <html lang='en'>
        <head>
          <meta charset='utf-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta name='description' content='' />
          <title>SaaSBase - Authentication</title>

          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
            integrity='sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2'
            crossorigin='anonymous'
          />

          <link href='./css/index.css' rel='stylesheet' />
        </head>
        <body>
          <p className='links'>
            <a href='/local/signup'>Sign up using Email →</a>
          </p>
          <div className='content'>
            <form className='text-center' onSubmit={handleGoogleLogin}>
              <img
                className='mb-4'
                src='./images/saasbase.png'
                alt=''
                width='72'
                height='72'
              />
              <h1 className='h3 mb-3 font-weight-normal'>Sign in with Google</h1>
              <p className='mb-3 text-muted'>
                Implement a Google OAuth strategy using Passport.js and MongoDB
              </p>

              <button className='btn btn-primary btn-block my-2' type='submit'>
                Sign in with Google
              </button>
            </form>

            <hr className='divider' />
            <form className='text-center' onSubmit={handleSubmit}>
              <button
                className='btn btn-secondary btn-block my-2'
                type='submit'
              >
                Sign in with Email
              </button>

              <div className='mt-5 mb-3 text-center'>
                <a className='text-muted' href='https://saasbase.dev'>
                  Built by SaaSBase
                </a>
              </div>
            </form>
          </div>
          <script
           src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
            integrity='sha384-DfXdz2htPH0lsSS
            0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
crossorigin='anonymous'
></script>
<script
         src='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js'
         integrity='sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx'
         crossorigin='anonymous'
       ></script>
</body>
<head>
<meta charset='UTF-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<title>Document</title>
<script src='https://js.stripe.com/v3/'></script>
</head>
<body>
Stripe Subscriptions
<button id='checkout-button'>Checkout</button>
</body>
</html>
  <div className='container mx-auto px-4 my-12'>
    <div className='max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md'>
      <div className='py-4 px-6'>
        <h1 className='text-xl font-bold mb-2'>Log in</h1>
        <p className='text-gray-600 mb-4'>
          This is a live demo on collecting Subscription payments for your
          saas using Stripe and Mongo
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='border border-gray-400 p-2 w-full'
              placeholder='Enter your email'
              required
              autoFocus
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Sign in
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </button>
          </div>
        </form>
        <a href='/signup'>Sign up using Email →</a>
      </div>
      <div className='py-4 px-6 bg-gray-100'></div>
    </div>
  </div>
</>
);
};

export default UserLogin;
