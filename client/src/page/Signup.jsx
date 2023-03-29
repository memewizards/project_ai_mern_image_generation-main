import React from 'react';

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password } = e.target.elements;
    const newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    };

    fetch('http://localhost:8080/auth/local/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was an error:', error);
      });
  };

    return (
    <>
      <div className="container mx-auto px-4 my-12">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <div className="py-4 px-6">
            <p className="text-center mb-4">
              
              <a className="text-blue-500 hover:text-blue-700" href="/local/signin">
                Sign in using Email →
              </a>
            </p>

            <p className="text-center mb-4">
              <a className="text-blue-500 hover:text-blue-700" href="http://localhost:8080/auth/google">
                Sign in using Google →
              </a>
            </p>

            <form onSubmit={handleSubmit}>
              <a href="/">
                <img
                  className="mb-4 mx-auto w-16 h-16"
                  src="../images/saasbase.png"
                  alt=""
                />
              </a>
              <h1 className="text-xl font-bold mb-2">Sign up with Email</h1>
              <p className="text-gray-600 mb-4">
                Implement a local signup strategy using Passport.js and MongoDB
              </p>

              <div className="text-left">
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    className="border border-gray-400 p-2 w-full"
                    aria-label="First name"
                    placeholder="Elon"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    className="border border-gray-400 p-2 w-full"
                    aria-label="Last name"
                    placeholder="Musk"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="border border-gray-400 p-2 w-full"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="elon.musk@gmail.com"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="border border-gray-400 p-2 w-full"
                    id="exampleInputPassword1"
                    placeholder="elonmusk79!"
                    required
                  />
                </div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4

            4 w-full rounded" type="submit">
            Sign Up
            </button>

          <div className="mt-5 mb-3 text-center">
            <a className="text-gray-600" href="https://saasbase.dev">
              
            </a>
          </div>
        </form>
      </div>
      <div className="py-4 px-6 bg-gray-100"></div>
    </div>
  </div>
</>
);
};

export default Signup;