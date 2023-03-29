import React from 'react';

const Authentication = () => {
  return (
    <>
      <p className="links">
        <a href="/signup">Sign up using Email →</a>
      </p>
      <div className="content">
        <form className="auth-container text-left" action="/auth/local/signin" method="POST">
          <div className="text-center">
            <a href="/">
              <img
                className="mb-4"
                src="../images/saasbase.png"
                alt=""
                width="72"
                height="72"
              />
            </a>
            <h1 className="h3 mb-3 font-weight-normal">Sign in with Email</h1>
            <p className="mb-3 text-muted">
              Implement a local signin strategy using Passport.js and MongoDB
            </p>
            <div className="text-left">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="elon.musk@gmail.com"
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  ax
                  placeholder="elonmusk79!"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <a href="">Forgot password?</a>
            </div>
            <button className="btn btn-primary btn-block my-2" type="submit">
              Sign In
            </button>
            {messages && messages.error && (
              <p className="error-text">{messages.error}</p>
            )}
            <div className="mt-5 mb-3 text-center">
              <a className="text-muted" href="https://saasbase.dev">
                Built by SaaSBase
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Authentication;
