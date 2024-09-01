import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/getToken';
import { toast } from 'sonner';
const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      await axios.post('/api/auth/update-password', formData, {
        headers: {
          Authorization: getToken,
        },
      });

      setFormData({
        currentPassword: '',
        newPassword: '',
      });

      toast.success('Password changed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="changePasswordModal">
                Change Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="col-form-label">Current Password:</label>
                  <input
                    placeholder="Enter your current password"
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">New Password:</label>
                  <input
                    placeholder="Enter your new password"
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="modal-footer">
                  {message ? (
                    <div
                      className={
                        message.includes('successfully')
                          ? 'alert alert-success'
                          : 'alert alert-danger'
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
