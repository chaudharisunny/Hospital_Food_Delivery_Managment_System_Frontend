import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllPatient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3050/api/v1/patients');
      setPatients(response.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Delete patient
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;

    try {
      await axios.delete(`http://localhost:3050/api/v1/delete_patient/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete patient');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
        <button
          onClick={() => navigate('/new-patient')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Patient
        </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Emergency</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="border px-4 py-2">{patient.patient_Name}</td>
                  <td className="border px-4 py-2">{patient.Age}</td>
                  <td className="border px-4 py-2">{patient.Gender}</td>
                  <td className="border px-4 py-2">{patient.Contact_Information}</td>
                  <td className="border px-4 py-2">{patient.emergency_contact}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/update-patient/${patient._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

export default AllPatient;
