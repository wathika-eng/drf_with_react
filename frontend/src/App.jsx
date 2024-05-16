import React from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoutes";
import NotFound from "./Pages/404";

// clear the tokens when a user logouts or wants to register again
const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};
const RegisterandLogout = () => {
  localStorage.clear();
  return <Register />;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
