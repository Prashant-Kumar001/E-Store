import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth0(); // Access user info and loading states
  console.log(user)

  // Define form states for possible profile updates
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    picture: ''
  });

  // Set user data on load
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        picture: user.picture
      });
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (!isAuthenticated) {
    return <div>You need to log in to view your profile.</div>; // Handle unauthenticated state
  }

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle profile updates (this is local state only)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // (Optional) Function to submit profile updates to a server or database
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
    // Add logic here to send updates to your backend or Auth0 Management API
    toggleEditMode(); // Exit edit mode after saving changes
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>

      <div className="profile-content">
        <img src={profileData.picture} alt={profileData.name} className="w-32 h-32 rounded-full mb-4" />

        {!editMode ? (
          <>
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={toggleEditMode}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="border-2 border-gray-300 rounded p-2 w-full"
                disabled
              />
            </div>

            {/* Add an optional picture update */}
            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture URL:</label>
              <input
                type="text"
                name="picture"
                value={profileData.picture}
                onChange={handleInputChange}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={toggleEditMode}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
