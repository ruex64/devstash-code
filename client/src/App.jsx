import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthRedirect from "./pages/OAuthRedirect";
import UploadComponent from "./pages/UploadComponent";
import UserProfile from "./pages/UserProfile";
import DashboardProfile from "./pages/DashboardProfile";
import AdminDashboard from "./pages/AdminDashboard";
import ComponentDetail from "./pages/ComponentDetail";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:slug" element={<UserProfile />} />
        <Route path="/auth/redirect" element={<OAuthRedirect />} />
        <Route path="/components/:slug" element={<ComponentDetail />} />
        <Route
          path="/upload"
          element={<ProtectedRoute><UploadComponent /></ProtectedRoute>}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === "admin" ? <AdminDashboard /> : <DashboardProfile />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
