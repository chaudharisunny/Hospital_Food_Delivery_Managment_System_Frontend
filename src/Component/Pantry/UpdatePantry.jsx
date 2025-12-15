import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePantry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    staffName: '',
    contactInfo: '',
    location: '',
    tasks: [{ taskType: '', mealType: '', status: '' }],
  });

  const [error, setError] = useState('');

  // Fetch pantry data on load
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const res = await axios.get(`http://localhost:3050/api/v1/pantry/${id}`);
        const pantry = res.data.result;
        console.log(pantry)
        // Fallback in case pantry.tasks is missing or empty
        const safeTasks =
          Array.isArray(pantry.tasks) && pantry.tasks.length > 0
            ? pantry.tasks
            : [{ taskType: '', mealType: '', status: '' }];

        setForm({
          staffName: pantry.staffName || '',
          contactInfo: pantry.contactInfo || '',
          location: pantry.location || '',
          tasks: safeTasks,
        });
      } catch (err) {
        console.error('Failed to fetch pantry:', err);
        setError('Unable to load pantry data.');
      }
    };

    fetchPantry();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle task-specific changes
  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTasks = [...form.tasks];
    updatedTasks[index][name] = value;
    setForm((prev) => ({ ...prev, tasks: updatedTasks }));
  };

  // Submit updated form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3050/api/v1/updatepantry/${id}`, form);
      navigate('/all-pantry'); // Go back to pantry list after update
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update pantry.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Pantry</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="staffName"
          value={form.staffName}
          onChange={handleChange}
          placeholder="Staff Name"
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          placeholder="Contact Info"
          className="w-full border p-2"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2"
        />

        {form.tasks.map((task, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="taskType"
              value={task.taskType}
              onChange={(e) => handleTaskChange(index, e)}
              placeholder="Task Type"
              className="border p-2"
            />
            <input
              type="text"
              name="mealType"
              value={task.mealType}
              onChange={(e) => handleTaskChange(index, e)}
              placeholder="Meal Type"
              className="border p-2"
            />
            <input
              type="text"
              name="status"
              value={task.status}
              onChange={(e) => handleTaskChange(index, e)}
              placeholder="Status"
              className="border p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Pantry
        </button>
      </form>
    </div>
  );
};

export default UpdatePantry;
