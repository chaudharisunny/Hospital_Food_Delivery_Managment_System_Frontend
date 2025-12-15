import React from "react";
import {
  FaUserShield,
  FaBed,
  FaUtensils,
  FaExclamationTriangle,
  FaBoxes,
  FaClipboardList,
} from "react-icons/fa";

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Active Admins */}
      <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-xl transition">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-indigo-700">
            Active Admins
          </h3>
          <FaUserShield className="text-indigo-700" size={24} />
        </div>
        <p className="text-4xl font-bold mt-4">10</p>
        <p className="text-sm text-gray-600">Currently on duty</p>
      </div>

      {/* Patients */}
      <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-xl transition">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-700">
            Active Patients
          </h3>
          <FaBed className="text-blue-700" size={24} />
        </div>
        <p className="text-4xl font-bold mt-4">128</p>
        <p className="text-sm text-gray-600">Admitted patients</p>
      </div>

      {/* Rooms */}
      <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-xl transition">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-green-700">
            Room Availability
          </h3>
          <FaBed className="text-green-700" size={24} />
        </div>
        <p className="text-4xl font-bold mt-4">34</p>
        <p className="text-sm text-gray-600">Rooms available</p>
      </div>

      {/* Meal Plans */}
      <div className="bg-purple-100 p-6 rounded-lg shadow hover:shadow-xl transition">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-purple-700">
            Today’s Meal Plans
          </h3>
          <FaClipboardList className="text-purple-700" size={24} />
        </div>
        <p className="text-4xl font-bold mt-4">22</p>
        <p className="text-sm text-gray-600">Meals to prepare today</p>
      </div>

      {/* Allergy Alerts */}
      <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-xl transition">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-red-700">
            Allergy Alerts
          </h3>
          <FaExclamationTriangle className="text-red-700" size={24} />
        </div>
        <p className="text-4xl font-bold mt-4">15</p>
        <p className="text-sm text-gray-600">Patients with food restrictions</p>
      </div>

      {/* Pantry Stock */}
      <div className="bg-orange-100 p-6 rounded-lg shadow hover:shadow-xl transition">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-orange-700">
            Pantry Alerts
          </h3>
          <FaBoxes className="text-orange-700" size={24} />
        </div>
        <p className="text-4xl font-bold mt-4">8</p>
        <p className="text-sm text-gray-600">Items low in stock</p>
      </div>

    </div>
  );
}

export default Home;
