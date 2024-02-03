import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AppRoutes from "./routes/Routes";
axios.defaults.baseURL = "https://lnhs-api.vercel.app";
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
