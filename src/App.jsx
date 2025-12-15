import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Component/Home';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import Login from './Component/Admin/Login';
import Signup from './Component/Admin/Signup';
import NewPatient from './Component/Patient/NewPatient'; // ✅ Import new component
import AllPatient from './Component/Patient/AllPatient';
import UpdatePatient from './Component/Patient/UpdatePatient';
import AllRooms from './Component/Rooms/AllRooms';
import NewRoom from './Component/Rooms/NewRoom';
import UpdateRoom from './Component/Rooms/UpdateRoom';
import NewAllergy from './Component/Allergies/NewAllergy';
import AllAllergies from './Component/Allergies/AllAllergies';
import NewPantry from './Component/Pantry/NewPantry';
import AllPantry from './Component/Pantry/AllPantry';
import UpdatePantry from './Component/Pantry/UpdatePantry';
import NewMeal from './Component/MealPlan/NewMeal';
import AllMeal from './Component/MealPlan/AllMeal';
import UpdateMealPlan from './Component/MealPlan/UpdateMeal';
import AllAdmin from './Component/Admin/AllAdmin';
import DoctorDashboard from './Component/Doctor/DoctorDashboard';
import Profile from './Component/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route - No Header/Sidebar */}
        <Route path="/login" element={<Login />} />
        

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            <div className="h-screen flex flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-admin" element={<Signup />} />
                     <Route path="/all-admin" element={<AllAdmin />} />
                     
                     <Route path="/profile" element={<Profile/>} />

                     <Route path="/doctor" element={<DoctorDashboard />} />
                     
                    <Route path="/all-patient" element={<AllPatient />} />
                    <Route path="/new-patient" element={<NewPatient />} />
                    <Route path="/update-patient/:id" element={<UpdatePatient/>} /> 

                    <Route path="/all-rooms" element={<AllRooms/>} />
                    <Route path="/new-room" element={<NewRoom/>} /> 
                    <Route path="/update-room/:id" element={<UpdateRoom/>} /> 

                    <Route path="/new-allergy" element={<NewAllergy/>} /> 
                    <Route path="/all-allergies" element={<AllAllergies/>} /> 

                    <Route path="/new-pantry" element={<NewPantry/>} />
                    <Route path="/all-pantry" element={<AllPantry/>} /> 
                    <Route path="/update-pantry/:id" element={<UpdatePantry/>} />

                    <Route path="/new-meal" element={<NewMeal/>} />
                    <Route path="/all-meals" element={<AllMeal/>} />
                    <Route path="/updateMealPlan/:id" element={<UpdateMealPlan/>} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
