import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllAllergies = () => {
  const [allergies, setAllergies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const res = await axios.get('http://localhost:3050/api/v1/all_allergies');
        setAllergies(res.data.data);
      } catch (error) {
        console.error('Error fetching allergies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllergies();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">All Allergies</h2>

      {allergies.length === 0 ? (
        <p className="text-center text-gray-500">No allergies found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Allergy Name</th>
            </tr>
          </thead>
          <tbody>
            {allergies.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.allergies_Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAllergies;
