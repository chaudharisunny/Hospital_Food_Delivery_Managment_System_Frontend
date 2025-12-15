import React, { useState } from 'react';
import axios from 'axios';

const NewPatient = () => {
  const [formData, setFormData] = useState({
    patient_Name: '',
    Age: '',
    Gender: '',
    Contact_Information: '',
    emergency_contact: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3050/api/v1/new_patient', formData); // replace with your actual API route
      setMessage(res.data.message);
      console.log(res.data)
      setFormData({
        patient_Name: '',
        Age: '',
        Gender: '',
        Contact_Information: '',
        emergency_contact: '',
      });
    } catch (error) {
      console.error(error);
      setMessage('Error adding patient');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patient_Name"
          placeholder="Patient Name"
          value={formData.patient_Name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Age"
          placeholder="Age"
          value={formData.Age}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="Gender"
          placeholder="Gender"
          value={formData.Gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="Contact_Information"
          placeholder="Contact Information"
          value={formData.Contact_Information}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="emergency_contact"
          placeholder="Emergency Contact"
          value={formData.emergency_contact}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default NewPatient;
