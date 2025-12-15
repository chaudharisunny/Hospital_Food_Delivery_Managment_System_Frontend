import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePatient = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_Name: '',
    Age: '',
    Gender: '',
    Contact_Information: '',
    emergency_contact: '',
  });

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.put(`http://localhost:3050/api/v1/update_patient/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching patient:', err);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/patient/update/${id}`, formData);
      alert('Patient updated successfully!');
      navigate('/'); // Redirect to home or patient list
    } catch (err) {
      console.error('Update error:', err);
      alert('Update failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Update Patient</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="patient_Name"
          value={formData.patient_Name}
          onChange={handleChange}
          placeholder="Patient Name"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="Age"
          value={formData.Age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          placeholder="Gender"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="Contact_Information"
          value={formData.Contact_Information}
          onChange={handleChange}
          placeholder="Contact Information"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="emergency_contact"
          value={formData.emergency_contact}
          onChange={handleChange}
          placeholder="Emergency Contact"
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
