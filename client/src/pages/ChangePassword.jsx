import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = ({ token, userId }) => {
  const [formData, setFormData] = useState({
    userId: userId,
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "currentPassword") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a confirmation dialog before updating the password
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to change your password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        // Send a POST request to update the password
        const response = await axios.post(
          "http://localhost:3000/api/auth/update-password",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // setMessage("Password updated successfully");

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Passwords updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        if (error.response) {
          // setMessage("Password update failed");
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Password update failed",
            showConfirmButton: true,
          });
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded shadow-lg border-2">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      {message && (
        <div className="text-green-600 text-center mb-4">{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-2 rounded input-style"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {showCurrentPassword ? (
                <FiEyeOff className="text-gray-400" />
              ) : (
                <FiEye className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-2 rounded input-style"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showNewPassword ? (
                <FiEyeOff className="text-gray-400" />
              ) : (
                <FiEye className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
