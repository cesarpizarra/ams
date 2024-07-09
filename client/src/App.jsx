import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AppRoutes from "./routes/Routes";
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;

const App = () => {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
