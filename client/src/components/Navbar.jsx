import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FiLogOut,
  FiUser,
  FiHome,
  FiUserPlus,
  FiPlus,
} from "react-icons/fi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        DevStash
      </Link>

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
