import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

function Sidebar() {
  const [role, setRole] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    admin: [
      { label: "All Admin", path: "/all-admin" },
      { label: "New Admin", path: "/new-admin" },
      { label: "Patients", path: "/all-patient" },
      { label: "Pantry", path: "/all-pantry" },
    ],
    doctor: [
      { label: "Dashboard", path: "/doctor" },
      { label: "Patients", path: "/all-patient" },
      {
        label: "Allergies",
        children: [
          { label: "All Allergies", path: "/all-allergies" },
          { label: "New Allergy", path: "/new-allergy" },
        ],
      },
      {
        label: "Meal Plans",
        children: [
          { label: "All Meals", path: "/all-meals" },
          { label: "New Meal", path: "/new-meal" },
        ],
      },
      {
        label: "Rooms",
        children: [
          { label: "All Rooms", path: "/all-rooms" },
          { label: "New Room", path: "/new-room" },
        ],
      },
      
    ],
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  if (!role) return null;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 capitalize">{role} Panel</h2>
      <ul className="space-y-2">
        {menus[role]?.map((item, index) =>
          item.children ? (
            <li key={index}>
              <button
                onClick={() => toggleMenu(index)}
                className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-gray-800 transition"
              >
                <span>{item.label}</span>
                {openMenu === index ? (
                  <FaChevronDown size={14} />
                ) : (
                  <FaChevronRight size={14} />
                )}
              </button>
              {openMenu === index && (
                <ul className="ml-4 mt-1 space-y-1 transition-all">
                  {item.children.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={sub.path}
                        className="block px-3 py-1 text-sm rounded hover:bg-gray-700"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={index}>
              <Link
                to={item.path}
                className="block px-3 py-2 rounded hover:bg-gray-800 transition"
              >
                {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
