import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminProfileEditor = () => {
  const { user } = useSelector((state) => state.auth);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [social, setSocial] = useState({
    github: "",
    linkedin: "",
    instagram: "",
    blog: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`/api/users/${user.name}`);
        const data = res.data.user;
        setBio(data.bio || "");
        setAvatar(data.avatar || "");
        setSocial(data.social || {});
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      }
    };

    if (user?.name) fetchAdminData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/profile", {
        bio,
        avatar,
        social,
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed", err);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Profile Editor</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="https://your-avatar-url.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Tell something about yourself"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["github", "linkedin", "instagram", "blog", "email"].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
              <input
                type="text"
                value={social[key]}
                onChange={(e) =>
                  setSocial((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full border p-2 rounded"
                placeholder={`Your ${key} link`}
              />
            </div>
          ))}
        </div>
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

export default AdminProfileEditor;
