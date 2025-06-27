import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import OAuthRedirect from "./pages/OAuthRedirect";
import UploadComponent from "./pages/UploadComponent";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/redirect" element={<OAuthRedirect />} />
        <Route
  path="/upload"
  element={
    <ProtectedRoute>
      <UploadComponent />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
