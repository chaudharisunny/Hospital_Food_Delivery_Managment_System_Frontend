import React, { useState } from 'react';
import axios from 'axios';

const NewAllergy = () => {
  const [allergy, setAllergy] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:3050/api/v1//add_allergies', {
        allergies_Name: allergy,
      });
      if (res.status === 201) {
        setMessage('✅ Allergy added successfully!');
        setAllergy('');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding allergy');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Add New Allergy</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="allergy" className="block mb-1 font-medium">Allergy Name</label>
          <input
            type="text"
            id="allergy"
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
            placeholder="Enter allergy name"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Allergy
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-semibold text-green-700">{message}</p>
      )}
    </div>
  );
};

export default NewAllergy;
