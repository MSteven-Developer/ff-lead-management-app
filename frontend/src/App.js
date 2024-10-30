import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeadForm from "./Pages/Lead/LeadForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ProtectedRoute from "./Routes/protectedRoute";
import PublicRoute from "./Routes/publicRoute";
import Leads from "./Pages/Lead/Leads";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<PublicRoute element={<Register />} />}
        />
        <Route path="/" element={<ProtectedRoute element={<Leads />} />} />
        <Route
          path="/lead/create"
          element={<ProtectedRoute element={<LeadForm />} />}
        />
        <Route
          path="/lead/:id/edit"
          element={<ProtectedRoute element={<LeadForm />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;