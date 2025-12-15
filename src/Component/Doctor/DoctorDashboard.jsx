import React from 'react';
import { FaClipboardList, FaUserMd, FaBed, FaAllergies } from 'react-icons/fa';
import { MdOutlineMonitorHeart } from 'react-icons/md';
import { GiMeal } from 'react-icons/gi';

function DoctorDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Patients */}
      <div className="bg-blue-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Patients</h3>
        <p className="text-4xl font-bold text-gray-800">128</p>
        <p className="text-gray-700">Patients Under Your Care</p>
      </div>

      {/* Active Treatments */}
      <div className="bg-green-300 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold mb-2 text-green-700">Treatments</h3>
        <p className="text-4xl font-bold text-gray-800">54</p>
        <p className="text-gray-700">Ongoing Treatments</p>
      </div>

      {/* Rooms Assigned */}
      <div className="bg-yellow-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold mb-2 text-yellow-700">Rooms</h3>
        <p className="text-4xl font-bold text-gray-800">34</p>
        <p className="text-gray-700">Patients Room Assignments</p>
      </div>

      {/* Meal Plans */}
      <div className="bg-purple-200 shadow-md rounded-lg p-6 hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-purple-700">Meal Plans</h3>
          <GiMeal size={24} className="text-purple-700" />
        </div>
        <p className="text-4xl font-bold text-gray-800">22</p>
        <p className="text-sm text-gray-600 mt-1">Customized for Patients</p>
      </div>

      {/* Allergies */}
      <div className="bg-pink-200 shadow-md rounded-lg p-6 hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-pink-700">Allergies</h3>
          <FaAllergies size={24} className="text-pink-700" />
        </div>
        <p className="text-4xl font-bold text-gray-800">15</p>
        <p className="text-sm text-gray-600 mt-1">Tracked Allergies</p>
      </div>

      {/* Appointments */}
      <div className="bg-orange-200 shadow-md rounded-lg p-6 hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-orange-700">Appointments</h3>
          <FaClipboardList size={24} className="text-orange-700" />
        </div>
        <p className="text-4xl font-bold text-gray-800">12</p>
        <p className="text-sm text-gray-600 mt-1">Today’s Schedule</p>
      </div>
    </div>
  );
}

export default DoctorDashboard;
