import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token'); // Make sure token is stored
        const res = await axios.get('http://localhost:3050/api/v1/allAdmin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && Array.isArray(res.data.data)) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch admin list',err);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) return <p className="p-4 text-gray-700">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Registered Admins</h2>
      {users.length === 0 ? (
        <p>No admin found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((admin, index) => (
              <tr key={admin._id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{admin.username}</td>
                <td className="px-4 py-2 border">{admin.email}</td>
                <td className="px-4 py-2 border">{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAdmin;
