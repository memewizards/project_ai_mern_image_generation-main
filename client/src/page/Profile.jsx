import React, { useState, useEffect } from 'react';
import useCustomer from "../hooks/useCustomer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const profile = useCustomer("http://localhost:8080/profile");

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);
  

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto mt-10">
          <h1 className="text-4xl mb-4">User Profile</h1>
          <hr />
          {user ? (
            <div className="flex flex-row">
              <div className="w-1/6">
                <img
                  src="https://lh3.googleusercontent.com/a-/AOh14GjSb0KZnfOv_wP8cT6M7wEoGMlpG1fFbsO1Uszm7lw=s96-c"
                  className="w-full"
                />
              </div>
              <div className="w-5/6 ml-4">
                <h3 className="text-2xl">
                  {user.firstName} {user.lastName} (#{user.id})
                </h3>
                <p>Logged in using {user.source}</p>
                <p>{user.email}</p>
                <p>Last visited on {user.lastVisited}</p>
                <p>
                  <a href="/auth/logout" className="text-blue-600">
                    Logout
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl">User not found</h1>
          )}
        </div>
      </main>

      <footer className="mt-auto py-3">
        <div className="container mx-auto">
          <span className="text-gray-600">
            The full guide is available at{' '}
            <a
              href="https://saasbase.dev/"
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              saasbase.dev
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
