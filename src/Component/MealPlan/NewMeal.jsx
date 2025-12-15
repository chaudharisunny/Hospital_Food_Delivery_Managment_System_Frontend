import React, { useState } from 'react';
import axios from 'axios';

const NewMeal = () => {
  const [form, setForm] = useState({
    patientId: '',
    morning: {
      meal: '',
      ingredients: '',
      instructions: ''
    },
    evening: {
      meal: '',
      ingredients: '',
      instructions: ''
    },
    night: {
      meal: '',
      ingredients: '',
      instructions: ''
    }
  });

  const handleChange = (e, time, field) => {
    if (time) {
      setForm(prev => ({
        ...prev,
        [time]: {
          ...prev[time],
          [field]: e.target.value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        morning: {
          ...form.morning,
          ingredients: form.morning.ingredients.split(',').map(i => i.trim())
        },
        evening: {
          ...form.evening,
          ingredients: form.evening.ingredients.split(',').map(i => i.trim())
        },
        night: {
          ...form.night,
          ingredients: form.night.ingredients.split(',').map(i => i.trim())
        }
      };

        await axios.post('http://localhost:3050/api/v1/newMealPlan', payload);
      alert('Meal plan created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create meal plan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Patient ID"
        value={form.patientId}
        onChange={(e) => handleChange(e, null, 'patientId')}
        className="border p-2 w-full"
        required
      />

      {['morning', 'evening', 'night'].map(time => (
        <div key={time} className="border p-3 rounded">
          <h3 className="font-bold capitalize">{time}</h3>
          <input
            type="text"
            placeholder={`${time} meal`}
            value={form[time].meal}
            onChange={(e) => handleChange(e, time, 'meal')}
            className="border p-2 w-full my-1"
          />
          <input
            type="text"
            placeholder={`${time} ingredients (comma separated)`}
            value={form[time].ingredients}
            onChange={(e) => handleChange(e, time, 'ingredients')}
            className="border p-2 w-full my-1"
          />
          <textarea
            placeholder={`${time} instructions`}
            value={form[time].instructions}
            onChange={(e) => handleChange(e, time, 'instructions')}
            className="border p-2 w-full my-1"
          />
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default NewMeal;
