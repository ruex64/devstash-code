import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../redux/authSlice";

const DashboardProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    bio: user?.bio || "",
    github: user?.social?.github || "",
    linkedin: user?.social?.linkedin || "",
    instagram: user?.social?.instagram || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/users/profile`,
        {
          bio: form.bio,
          social: {
            github: form.github,
            linkedin: form.linkedin,
            instagram: form.instagram,
          },
        },
        { withCredentials: true }
      );
      dispatch(setUser(data)); // update in Redux
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        {["github", "linkedin", "instagram"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize font-medium">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default DashboardProfile;
