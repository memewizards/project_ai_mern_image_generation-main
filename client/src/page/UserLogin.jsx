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

        // Set the JWT token in the local storage
        localStorage.setItem('authToken', data.token);

        const customerId = data.customerId;
        navigate(`/account/${customerId}`);
      } else {
        // handle error responses here
        console.log("else has occurred" + error);
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
        <style>{`
          .content {
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
        `}
        </style>
      </head>
      <body>

        {/* <p className='links'>
          <a href='/local/signup'>Sign up using Email →</a>
        </p> */}
        <div className='content'>
          <form className='text-center' onSubmit={handleGoogleLogin}>
            {/* <img
              className='mb-4'
              src='./images/saasbase.png'
              alt=''
              width='72'
              height='72'
            /> */}
            <h1 className='h3 mb-3 font-weight-normal'>Sign in with Google</h1>
            <p className='mb-3 text-muted'>
             Create an account or sign in using your Google account.
            </p>
            <button className='btn btn-primary w-auto px-4 py-2 my-2 btn-sm' type='submit'>
              Sign in with Google
            </button>
          </form>

          {/* <hr className='divider' />
          <form className='text-center' onSubmit={handleSubmit}>
            <button className='btn btn-secondary w-auto px-4 py-2 my-2 btn-sm' type='submit'>
              Sign in with Email
            </button>

          </form> */}
        </div>
      </body>
    </html>
  </>
);

};

export default UserLogin;
