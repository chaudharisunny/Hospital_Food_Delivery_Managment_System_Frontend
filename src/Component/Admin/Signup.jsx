import React, { useState, useEffect } from 'react';
import API from '../../API';


const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    contactno: '',
    specialization: '' // Only for doctors
  });

  const [message, setMessage] = useState('');
  const [specializations, setSpecializations] = useState([]);

  const availableRoles = ['admin', 'doctor', 'nutritionist', 'kitchen_staff'];

  // Fetch specializations on load
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await API.get('/api/v1/specializations');
        setSpecializations(res.data.message || []);
        console.log(res.data.message)
      } catch (error) {
        console.error("Error fetching specializations:", error);
        setSpecializations([]);
      }
    };
    fetchSpecializations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatRoleLabel = (role) => {
    switch (role) {
      case 'kitchen_staff':
        return 'Kitchen Staff';
      case 'nutritionist':
        return 'Nutritionist';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const payload = { ...form };
      if (form.role !== 'doctor') {
        delete payload.specialization;
      }

      await API.post(
        '/api/v1/adminSignup',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('User added successfully!');
      setForm({
        username: '',
        email: '',
        password: '',
        role: '',
        contactno: '',
        specialization: ''
      });
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register New User</h2>
      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contactno"
          placeholder="Contact Number"
          value={form.contactno}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Role --</option>
          {availableRoles.map((role) => (
            <option key={role} value={role}>
              {formatRoleLabel(role)}
            </option>
          ))}
        </select>

        {/* Show Specialization only if role is doctor */}
        {form.role === 'doctor' && (
          <select
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Specialization --</option>
          {specializations.map((spec) => (
            <option key={spec._id} value={spec.specializations_Name}>
              {spec.specializations_Name}
            </option>
          ))}
        </select>
                )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default Signup;
