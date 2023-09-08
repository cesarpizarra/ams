import React from "react";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p className="text-lg text-gray-700 mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-4 py-2 ml-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
            onClick={() => {
              onLogout();
              onClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LogoutModal;
