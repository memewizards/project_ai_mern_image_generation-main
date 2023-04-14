import React, { useState, useEffect } from 'react';


const UserProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`/user/${username}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        throw new Error('Error fetching user profile data');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  fetchProfileData();
}, [username]);
  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        profileData && (
          <div>
            <h1>
              {profileData.user.firstName} {profileData.user.lastName}'s Public
              Images
            </h1>
            <div>
              {profileData.images.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt={image.description}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
