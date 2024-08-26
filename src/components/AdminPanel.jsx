import { useState } from "react";
import Api from '../constants/Api';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    amountGiven: 0,
    pricingTimeFrame: 0,
    interestRate: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        background: "rgb(38,38,38)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Incorrect email or password. Please try again.",
          background: "rgb(38,38,38)",
          color: "#ffffff",
          timer: 1500,
          showConfirmButton: false,
        });
    }

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      amount_given: parseFloat(formData.amountGiven),
      pricing_time_frame: parseInt(formData.pricingTimeFrame),
      interest_rate: parseFloat(formData.interestRate),
    };

    try {
      const response = await Api.createUser(userData);
      console.log("User created:", response);
      Swal.fire({
        icon: "success",
        title: "User Created!",
        text: "User created successfully!",
        background: "rgb(38,38,38)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to create user. Please try again.",
        background: "rgb(38,38,38)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      amountGiven: "",
      pricingTimeFrame: "",
      interestRate: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-8 px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-3xl text-center mb-6 text-white">Admin Panel Form</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-white mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-white mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-white mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email ID */}
          <div className="mb-4">
            <label className="block text-white mb-2">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Amount Given */}
          <div className="mb-4">
            <label className="block text-white mb-2">Amount Given</label>
            <input
              type="number"
              name="amountGiven"
              value={formData.amountGiven}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Pricing Time Frame */}
          <div className="mb-4">
            <label className="block text-white mb-2">Pricing Time Frame</label>
            <input
              type="text"
              name="pricingTimeFrame"
              value={formData.pricingTimeFrame}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-4">
            <label className="block text-white mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
