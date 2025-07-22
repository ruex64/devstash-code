import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { LogOut, User, PlusCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-card !rounded-none border-b border-border-color">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-accent">
              DevStash
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Conditionally render Admin button */}
                {user.role === 'admin' && (
                    <Button variant="secondary" onClick={() => navigate('/admin')} icon={<ShieldCheck size={18} />}>
                        Admin
                    </Button>
                )}
                <Button variant="secondary" onClick={() => navigate('/create')} icon={<PlusCircle size={18} />}>
                  Create
                </Button>
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 text-text-primary">
                    <User size={20} />
                    <span>{user.name}</span>
                  </button>
                  {/* Corrected Dropdown positioning and transition */}
                  <div className="absolute right-0 top-full pt-2 w-48 bg-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transform group-hover:translate-y-0 -translate-y-2">
                    <div className="bg-secondary border border-border-color rounded-md shadow-lg py-1">
                        <Link to={`/profile/${user._id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-border-color">
                          <User size={16} />
                          My Profile
                        </Link>
                        <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-border-color">
                          <LogOut size={16} />
                          Logout
                        </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="primary" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
