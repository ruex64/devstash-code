import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Type, FileText, Hash, Terminal, Image as ImageIcon } from 'lucide-react';

const EditComponentPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    commands: '',
    filename: '',
    filetype: 'javascript',
    code: '',
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComponentData = async () => {
        try {
            const { data } = await api.get(`/components/${id}`);
            setFormData({
                name: data.name,
                description: data.description || '',
                tags: data.tags.join(', '),
                commands: data.commands || '',
                filename: data.filename || '',
                filetype: data.filetype,
                code: data.code,
            });
            setCurrentImage(data.image);
        } catch (error) {
            toast.error("Could not fetch component data.");
            navigate('/');
        }
    };
    fetchComponentData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = new FormData();
    if (image) {
        submissionData.append('image', image);
    }
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }

    try {
      await api.put(`/components/${id}`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Component updated successfully!');
      navigate(`/component/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update component.');
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
        <h2 className="text-3xl font-bold text-center text-text-primary">Edit Component</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="name" name="name" label="Component Name" type="text" value={formData.name} onChange={handleChange} required icon={<Type size={18} />} />
          <Input id="filename" name="filename" label="File Name" type="text" value={formData.filename} onChange={handleChange} icon={<FileText size={18} />} />
        </div>

        <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Component Image</label>
            <div className="flex items-center gap-4">
                <img src={image ? URL.createObjectURL(image) : currentImage} alt="Current component" className="w-24 h-24 object-cover rounded-md border border-border-color"/>
                <div className="flex-grow">
                    <label htmlFor="image-upload" className="relative cursor-pointer bg-secondary border border-border-color rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium text-text-primary hover:bg-border-color">
                        <ImageIcon size={16} className="mr-2" />
                        <span>{image ? image.name : 'Change image'}</span>
                        <input id="image-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                    </label>
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
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditComponentPage;
