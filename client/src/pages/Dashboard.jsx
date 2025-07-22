import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/profile', { withCredentials: true });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchMyComponents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/component'); // could filter for logged-in user
        const user = JSON.parse(localStorage.getItem('devstash_user'));
        const filtered = res.data.filter(c => c.creator?._id === user?._id);
        setComponents(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyComponents();
  }, []);

  if (!profile) return <p className="text-gray-400">Loading dashboard...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">Welcome, {profile.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Your Components</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {components.map((comp) => (
          <div key={comp._id} className="bg-[#1c1c1c] p-4 rounded-xl border border-[#2a2a2a]">
            <h3 className="text-lg font-bold">{comp.name}</h3>
            <p className="text-sm text-gray-400">{comp.filename}</p>
            <pre className="mt-2 text-xs bg-[#121212] p-2 rounded overflow-x-auto">
              <code>{comp.code.slice(0, 120)}...</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
