import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3050/api/v1/all_rooms');
      setRooms(response.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await axios.delete(`http://localhost:3050/api/v1/delete_room/${id}`);
      fetchRooms(); // Refresh after delete
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-room/${id}`); // Make sure this route exists in your App.js
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Rooms</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Patient Name</th>
                <th className="border px-4 py-2">Room Number</th>
                <th className="border px-4 py-2">Bed Number</th>
                <th className="border px-4 py-2">Floor Number</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td className="border px-4 py-2">
                    {room.patientId?.patient_Name || 'Unassigned'}
                  </td>
                  <td className="border px-4 py-2">{room.room_Number}</td>
                  <td className="border px-4 py-2">{room.bed_Number}</td>
                  <td className="border px-4 py-2">{room.floor_Number}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleUpdate(room._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRooms;
