import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { FiLogOut, FiUser, FiHome, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        DevStash
      </Link>
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 flex items-center gap-1">
              <FiUser /> Login
            </Link>
            <Link to="/register" className="text-gray-700 flex items-center gap-1">
              <FiUserPlus /> Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-gray-700 flex items-center gap-1">
              <FiHome /> Dashboard
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="text-red-500 flex items-center gap-1"
            >
              <FiLogOut /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
