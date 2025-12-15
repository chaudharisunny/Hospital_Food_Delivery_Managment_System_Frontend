import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewRoom = () => {
  const [form, setForm] = useState({
    patientId: '',
    room_Number: '',
    bed_Number: '',
    floor_Number: '',
  });

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:3050/api/v1/patients'); // adjust if your route is different
        setPatients(res.data.data);
      } catch (err) {
        console.error('Failed to load patients', err);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { patientId, room_Number, bed_Number, floor_Number } = form;

    if (!room_Number || !bed_Number || !floor_Number || !patientId) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:3050/api/v1/new_room', form);
      alert('Room created and assigned to patient successfully!');
      navigate('/all-rooms');
    } catch (err) {
      console.error(err);
      setError('Failed to create room');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Room & Assign Patient</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Patient</label>
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.patient_Name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Room Number</label>
          <input
            type="text"
            name="room_Number"
            value={form.room_Number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Bed Number</label>
          <input
            type="text"
            name="bed_Number"
            value={form.bed_Number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Floor Number</label>
          <input
            type="text"
            name="floor_Number"
            value={form.floor_Number}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default NewRoom;
