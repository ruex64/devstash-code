import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A component that protects routes from users who are not admins.
 * If the user is not an admin, it redirects them to the home page.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The component/page to render if the user is an admin.
 */
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
  }

  // If user is not logged in or is not an admin, redirect them
  if (!user || user.role !== 'admin') {
    // Redirect them to the home page, or login page if not logged in at all.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
