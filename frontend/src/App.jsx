import React from "react";
import { BrowserRouter, Routes, Navigation, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
//import 404 from './Components/404';

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};
function App() {
  return (
    <>

    </>
  );
}

export default App;
