import React, { useState } from 'react';
import axios from 'axios';

const NewPantry = () => {
  const [form, setForm] = useState({
    staffName: '',
    contactInfo: '',
    location: '',
    tasks: [
      { taskType: 'Preparation', mealType: 'Morning', status: 'Pending' },
    ],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (index, e) => {
    const updatedTasks = [...form.tasks];
    updatedTasks[index][e.target.name] = e.target.value;
    setForm({ ...form, tasks: updatedTasks });
  };

  const addTask = () => {
    setForm({
      ...form,
      tasks: [
        ...form.tasks,
        { taskType: 'Preparation', mealType: 'Morning', status: 'Pending' },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3050/api/v1/newpantry', form);
      console.log(res)
      alert('Pantry entry created successfully!');
      setForm({
        staffName: '',
        contactInfo: '',
        location: '',
        tasks: [{ taskType: 'Preparation', mealType: 'Morning', status: 'Pending' }],
      });
    } catch (error) {
      console.error(error);
      alert('Error creating pantry entry.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Pantry Staff</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="staffName"
          placeholder="Staff Name"
          value={form.staffName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <h3 className="font-semibold text-lg">Tasks:</h3>
        {form.tasks.map((task, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-2">
            <select
              name="taskType"
              value={task.taskType}
              onChange={(e) => handleTaskChange(index, e)}
              className="border px-2 py-1 rounded"
            >
              <option>Preparation</option>
              <option>Delivery</option>
            </select>

            <select
              name="mealType"
              value={task.mealType}
              onChange={(e) => handleTaskChange(index, e)}
              className="border px-2 py-1 rounded"
            >
              <option>Morning</option>
              <option>Evening</option>
              <option>Night</option>
            </select>

            <select
              name="status"
              value={task.status}
              onChange={(e) => handleTaskChange(index, e)}
              className="border px-2 py-1 rounded"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        ))}

        <button
          type="button"
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Another Task
        </button>

        <button
          type="submit"
          className="block w-full bg-green-600 text-white py-2 mt-4 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPantry;
