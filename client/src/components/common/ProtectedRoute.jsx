import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A component that protects routes from unauthenticated users.
 * If the user is not logged in, it redirects them to the login page.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The component/page to render if the user is authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If the authentication state is still loading, show a blank screen or a loader
  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  // If the user is not authenticated, redirect to the login page
  // We also pass the original location in the state so we can redirect back after login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;
