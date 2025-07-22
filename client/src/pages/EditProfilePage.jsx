import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { User, FileText, Github, Twitter, Linkedin } from 'lucide-react';

const EditProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    socials: {
      github: '',
      twitter: '',
      linkedin: '',
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        socials: {
          github: user.socials?.github || '',
          twitter: user.socials?.twitter || '',
          linkedin: user.socials?.linkedin || '',
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.socials) {
      setFormData(prev => ({
        ...prev,
        socials: { ...prev.socials, [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/users/profile', formData);
      // Update the user in the auth context and localStorage
      setUser(prevUser => ({ ...prevUser, ...data }));
      toast.success('Profile updated successfully!');
      navigate(`/profile/${user._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="p-8 space-y-8 glass-card">
        <h2 className="text-3xl font-bold text-center text-text-primary">Edit Your Profile</h2>
        
        <Input id="name" name="name" label="Full Name" type="text" value={formData.name} onChange={handleChange} required icon={<User size={18} />} />
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-text-secondary mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="w-full bg-primary border border-border-color rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-300"
            placeholder="Tell us a little about yourself..."
          ></textarea>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Social Links</h3>
            <Input id="github" name="github" label="GitHub" type="url" value={formData.socials.github} onChange={handleChange} placeholder="https://github.com/username" icon={<Github size={18} />} />
            <Input id="twitter" name="twitter" label="Twitter / X" type="url" value={formData.socials.twitter} onChange={handleChange} placeholder="https://twitter.com/username" icon={<Twitter size={18} />} />
            <Input id="linkedin" name="linkedin" label="LinkedIn" type="url" value={formData.socials.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" icon={<Linkedin size={18} />} />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="w-full md:w-auto" isLoading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProfilePage;
