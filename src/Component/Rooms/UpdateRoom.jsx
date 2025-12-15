import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateRoom = () => {
  const { id } = useParams(); // Room ID from route
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientId: '',
    room_Number: '',
    bed_Number: '',
    floor_Number: '',
  });

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  // Fetch room data and patients
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch room details
        const roomRes = await axios.get(`http://localhost:3050/api/v1/room/${id}`);
        console.log(roomRes)
        const roomData = roomRes.data?.data;
        
        // Fetch patients
        const patientsRes = await axios.get(`http://localhost:3050/api/v1/patients`);
        setPatients(patientsRes.data.data || []);

        // Set room form data
        if (roomData) {
          setForm({
            patientId: roomData.patientId?._id || '',
            room_Number: roomData.room_Number || '',
            bed_Number: roomData.bed_Number || '',
            floor_Number: roomData.floor_Number || '',
          });
        }
      } catch (err) {
        console.error('Error loading room or patients', err);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientId, room_Number, bed_Number, floor_Number } = form;

    if (!patientId || !room_Number || !bed_Number || !floor_Number) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.put(`http://localhost:3050/api/v1/update_room/${id}`, form);
      alert('Room updated successfully!');
      navigate('/all-rooms');
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update room');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Update Room</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Assign Patient</label>
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

        <input
          type="text"
          name="room_Number"
          value={form.room_Number}
          onChange={handleChange}
          placeholder="Room Number"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="bed_Number"
          value={form.bed_Number}
          onChange={handleChange}
          placeholder="Bed Number"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="floor_Number"
          value={form.floor_Number}
          onChange={handleChange}
          placeholder="Floor Number"
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
