import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateMealPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    morning: { meal: '', ingredients: [], instructions: '' },
    evening: { meal: '', ingredients: [], instructions: '' },
    night: { meal: '', ingredients: [], instructions: '' },
  });

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const res = await axios.get(`http://localhost:3050/api/v1/mealplan/${id}`);
        setForm(res.data.result);
      } catch (err) {
        console.error('Error fetching meal plan:', err);
      }
    };

    fetchMealPlan();
  }, [id]);

  const handleChange = (e, section, field) => {
    const value = field === 'ingredients' ? e.target.value.split(',') : e.target.value;
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3050/api/v1/updateMealPlan/${id}`, form);
      alert('Meal plan updated!');
      navigate('/all-meals'); // go back to list
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Meal Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['morning', 'evening', 'night'].map((section) => (
          <div key={section} className="border p-4 rounded">
            <h3 className="font-semibold capitalize">{section}</h3>
            <input
              type="text"
              placeholder="Meal"
              value={form[section]?.meal || ''}
              onChange={(e) => handleChange(e, section, 'meal')}
              className="block w-full border px-2 py-1 my-1"
            />
            <input
              type="text"
              placeholder="Ingredients (comma-separated)"
              value={form[section]?.ingredients?.join(',') || ''}
              onChange={(e) => handleChange(e, section, 'ingredients')}
              className="block w-full border px-2 py-1 my-1"
            />
            <textarea
              placeholder="Instructions"
              value={form[section]?.instructions || ''}
              onChange={(e) => handleChange(e, section, 'instructions')}
              className="block w-full border px-2 py-1 my-1"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMealPlan;
