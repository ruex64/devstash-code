import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateComponentPage from './pages/CreateComponentPage';
import ComponentDetailPage from './pages/ComponentDetailPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EditProfilePage from './pages/EditProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import EditComponentPage from './pages/EditComponentPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/component/:id" element={<ComponentDetailPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Protected Routes (for any logged-in user) */}
        <Route path="/create" element={<ProtectedRoute><CreateComponentPage /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path="/edit-component/:id" element={<ProtectedRoute><EditComponentPage /></ProtectedRoute>} />
        
        {/* Admin-Only Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      </Routes>
    </Layout>
  );
}

export default App;
