import React from 'react';
import Navbar from './Navbar';

/**
 * The main layout component for the application.
 * It includes the Navbar and a main content area for pages.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The page content to render inside the layout.
 */
export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
