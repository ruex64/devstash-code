import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import axios from "axios";

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/me`,
          { withCredentials: true }
        );
        dispatch(setUser(data.user));
        navigate("/dashboard");
      } catch (err) {
        alert("OAuth failed. Please try logging in again.");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Redirecting...
    </div>
  );
};

export default OAuthRedirect;
