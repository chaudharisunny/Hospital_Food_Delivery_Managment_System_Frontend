import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllMeal = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:3050/api/v1/allMealPlan');
      setMeals(res.data.result);
    } catch (err) {
      console.error('Error fetching meal plans:', err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal plan?')) return;
    try {
      await axios.delete(`/api/mealplan/${id}`);
      fetchMeals(); // Refresh list
    } catch (err) {
      console.error('Error deleting meal plan:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/updateMealPlan/${id}`); // route to EditMeal.jsx
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Meal Plans</h2>
      {meals.length === 0 ? (
        <p>No meal plans found.</p>
      ) : (
        <div className="grid gap-4">
          {meals.map((meal, index) => (
            <div key={meal._id || index} className="border rounded p-4 shadow">
              <p><strong>Patient ID:</strong> {meal.patientId?._id || meal.patientId}</p>

              <div className="mt-2">
                <h3 className="font-semibold">Morning</h3>
                <p><strong>Meal:</strong> {meal.morning?.meal}</p>
                <p><strong>Ingredients:</strong> {meal.morning?.ingredients?.join(', ')}</p>
                <p><strong>Instructions:</strong> {meal.morning?.instructions}</p>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold">Evening</h3>
                <p><strong>Meal:</strong> {meal.evening?.meal}</p>
                <p><strong>Ingredients:</strong> {meal.evening?.ingredients?.join(', ')}</p>
                <p><strong>Instructions:</strong> {meal.evening?.instructions}</p>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold">Night</h3>
                <p><strong>Meal:</strong> {meal.night?.meal}</p>
                <p><strong>Ingredients:</strong> {meal.night?.ingredients?.join(', ')}</p>
                <p><strong>Instructions:</strong> {meal.night?.instructions}</p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEdit(meal._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMeal;
