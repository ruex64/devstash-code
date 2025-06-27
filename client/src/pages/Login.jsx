import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiGithub, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        form,
        { withCredentials: true }
      );
      dispatch(setUser(data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };

  const githubLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/github`, "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg p-6 w-full max-w-sm rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <FiLogIn /> Login
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={googleLogin}
            className="flex items-center gap-2 border px-4 py-1 rounded hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" /> Google
          </button>
          <button
            type="button"
            onClick={githubLogin}
            className="flex items-center gap-2 border px-4 py-1 rounded hover:bg-gray-100"
          >
            <FiGithub className="text-xl" /> GitHub
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
