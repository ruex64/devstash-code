import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FiLogOut,
  FiUser,
  FiHome,
  FiUserPlus,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(searchInput), 500); // debounce delay
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    if (debounced) {
      navigate(`/?search=${debounced}`);
    } else if (location.pathname === "/") {
      navigate(`/`);
    }
  }, [debounced]);

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        DevStash
      </Link>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search components..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border border-gray-300 rounded pl-10 pr-4 py-2"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-4 items-center text-sm">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 flex items-center gap-1 hover:text-indigo-600"
            >
              <FiHome /> Dashboard
            </Link>

            <Link
              to="/upload"
              className="text-gray-700 flex items-center gap-1 hover:text-indigo-600"
            >
              <FiPlus /> Upload
            </Link>

            <button
              onClick={() => dispatch(logout())}
              className="text-red-500 flex items-center gap-1 hover:text-red-600"
            >
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 flex items-center gap-1 hover:text-indigo-600"
            >
              <FiUser /> Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 flex items-center gap-1 hover:text-indigo-600"
            >
              <FiUserPlus /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
