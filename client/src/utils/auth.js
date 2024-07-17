import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  // Function to decode JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      const decodedToken = parseJwt(token);
      if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [navigate]);

  return children;
};

export default RequireAuth;
