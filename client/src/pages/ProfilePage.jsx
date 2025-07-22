import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Edit } from 'lucide-react';
import ComponentCard from '../components/specific/ComponentCard';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  // Get the user ID from the URL (e.g., /profile/someUserId)
  const { userId } = useParams();
  
  // Get the currently logged-in user's data from our global context
  const { user: loggedInUser } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Key Logic ---
  // Check if the logged-in user's ID matches the ID from the URL.
  // This will be true only when you are viewing your own profile.
  const isOwnProfile = loggedInUser?._id === userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/users/${userId}/profile`);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!profile) {
    return <div className="text-center py-16"><h2 className="text-2xl font-bold">User not found</h2></div>;
  }

  const { user, components } = profile;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="p-8 glass-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-text-primary">{user.name}</h1>
              <p className="text-text-secondary mt-2">{user.email}</p>
              {user.bio && <p className="mt-4 max-w-2xl text-text-primary">{user.bio}</p>}
              <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
                {user.socials?.github && <a href={user.socials.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent"><Github /></a>}
                {user.socials?.instagram && <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent"><Instagram /></a>}
                {user.socials?.linkedin && <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent"><Linkedin /></a>}
              </div>
            </div>
            
            {/* --- Conditional Rendering --- */}
            {/* This button will only be rendered if isOwnProfile is true */}
            {isOwnProfile && (
                <Link to="/edit-profile">
                    <Button variant="secondary" icon={<Edit size={16} />}>
                        Edit Profile
                    </Button>
                </Link>
            )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Components by {user.name}</h2>
        {components.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <ComponentCard key={component._id} component={component} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card">
            <h3 className="text-xl font-semibold text-text-primary">No Components Yet</h3>
            <p className="text-text-secondary mt-2">{user.name} hasn't shared any components.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
