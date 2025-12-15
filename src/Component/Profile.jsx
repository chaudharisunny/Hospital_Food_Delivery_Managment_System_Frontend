import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // stored at login
        const res = await axios.get('http://localhost:3050/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default Profile;
