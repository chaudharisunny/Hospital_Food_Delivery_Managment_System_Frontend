import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllPantry = () => {
  const [pantries, setPantries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPantryData();
  }, []);

  const fetchPantryData = async () => {
    try {
      const response = await axios.get('http://localhost:3050/api/v1/allpantry');
      setPantries(response.data.result);
    } catch (error) {
      console.error('Error fetching pantry data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pantry staff?')) return;
    try {
      await axios.delete(`http:localhost:3050/api/v1/deletepantry/${id}`);
      fetchPantryData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-pantry/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Pantry Staff</h2>
        <button
          onClick={() => navigate('/new-pantry')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ Add Pantry Staff
        </button>
      </div>

      {pantries.length === 0 ? (
        <p>No pantry data found.</p>
      ) : (
        <div className="grid gap-4">
          {pantries.map((pantry) => (
            <div key={pantry._id} className="border p-4 shadow rounded-md">
              <p><strong>Staff Name:</strong> {pantry.staffName}</p>
              <p><strong>Contact Info:</strong> {pantry.contactInfo}</p>
              <p><strong>Location:</strong> {pantry.location}</p>

              <div className="mt-2">
                <p className="font-semibold">Tasks:</p>
                <ul className="list-disc pl-5">
                  {pantry.tasks.map((task, index) => (
                    <li key={index}>
                      {task.taskType} - {task.mealType} - <span className="italic">{task.status}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(pantry._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(pantry._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPantry;
