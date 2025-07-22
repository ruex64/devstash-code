import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual user auth state logic
    const storedUser = JSON.parse(localStorage.getItem('devstash_user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('devstash_user');
    setUser(null);
    // Optionally call backend logout route
  };

  return (
    <nav className="bg-[#111] border-b border-[#222] px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">DevStash</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
