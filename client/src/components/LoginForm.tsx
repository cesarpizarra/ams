import React, { useState } from 'react';
import axios from 'axios';
import { EncryptStorage } from 'encrypt-storage';
const SECRET = import.meta.env.VITE_LOCAL_KEY as string;
import Logo from '../assets/icon.png';
import { toast } from 'sonner';
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      setTimeout(() => {
        localStorage.setItem('token', response.data.token);
        encryptStorage.setItem('ascs', {
          username: response.data.username,
          role: response.data.role,
        });
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error: any) {
      console.log('Error: ' + error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="demo-container d-flex align-items-center justify-content-center vh-100">
      <div className="bg-light py-3 py-md-5">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                  <img
                    src={Logo}
                    alt="Logo"
                    width="175"
                    height="175"
                    className="object-fit-cover"
                  />
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Sign in to your account
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          name="username"
                          id="username"
                          placeholder="name@example.com"
                          required
                        />
                        <label className="form-label">Username</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
