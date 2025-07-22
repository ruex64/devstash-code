import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Type, FileText, Hash, Terminal, Image as ImageIcon, GitFork } from 'lucide-react';

const CreateComponentPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access navigation state
  const componentToRemix = location.state?.componentToRemix;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    commands: '',
    filename: '',
    filetype: 'javascript',
    code: '',
    remixedFrom: null, // Field to store the original component's ID
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If there's a component to remix, pre-populate the form
    if (componentToRemix) {
      toast.success(`Remixing "${componentToRemix.name}"`);
      setFormData({
        name: `Remix of ${componentToRemix.name}`,
        description: componentToRemix.description || '',
        tags: componentToRemix.tags.join(', '),
        commands: componentToRemix.commands || '',
        filename: componentToRemix.filename || '',
        filetype: componentToRemix.filetype,
        code: componentToRemix.code,
        remixedFrom: componentToRemix._id, // Set the reference to the original
      });
    }
  }, [componentToRemix]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please upload a new image for your remixed component.');
      return;
    }
    setLoading(true);

    const submissionData = new FormData();
    submissionData.append('image', image);
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }

    try {
      await api.post('/components', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Component created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create component.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="p-8 space-y-8 glass-card">
        <h2 className="text-3xl font-bold text-center text-text-primary flex items-center justify-center gap-3">
            {componentToRemix && <GitFork />}
            {componentToRemix ? 'Remix Component' : 'Create a New Component'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="name" name="name" label="Component Name" type="text" value={formData.name} onChange={handleChange} required icon={<Type size={18} />} />
          <Input id="filename" name="filename" label="File Name" type="text" value={formData.filename} onChange={handleChange} icon={<FileText size={18} />} />
        </div>

        <div>
            <label htmlFor="image" className="block text-sm font-medium text-text-secondary mb-1">Component Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-color border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-text-secondary" />
                    <div className="flex text-sm text-text-secondary">
                        <label htmlFor="image-upload" className="relative cursor-pointer bg-primary rounded-md font-medium text-accent hover:text-accent/80 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="image-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required />
                        </label>
                        <p className="pl-1">{image ? image.name : 'or drag and drop'}</p>
                    </div>
                    <p className="text-xs text-text-secondary">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
        
        <Input id="tags" name="tags" label="Tags" type="text" value={formData.tags} onChange={handleChange} placeholder="react, button, animation (comma-separated)" icon={<Hash size={18} />} />
        <Input id="commands" name="commands" label="Installation Commands" type="text" value={formData.commands} onChange={handleChange} placeholder="npm install framer-motion" icon={<Terminal size={18} />} />
        
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-text-secondary mb-1">Code</label>
          <textarea id="code" name="code" rows={15} value={formData.code} onChange={handleChange} className="w-full bg-primary border border-border-color rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-300 font-mono" required></textarea>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="w-full md:w-auto" isLoading={loading}>
            {componentToRemix ? 'Publish Remix' : 'Create Component'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateComponentPage;
