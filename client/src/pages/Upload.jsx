import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [form, setForm] = useState({
    name: '',
    filename: '',
    code: '',
    tags: '',
    cliCommand: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim())
      };
      await axios.post('http://localhost:5000/component', payload, { withCredentials: true });
      navigate('/');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-[#1c1c1c] p-6 rounded-xl border border-[#2a2a2a]">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Component</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" name="name" placeholder="Component Name" onChange={handleChange} required className="w-full p-2 bg-[#121212] border border-[#333] rounded" />
        <input type="text" name="filename" placeholder="Filename (e.g. Button.jsx)" onChange={handleChange} required className="w-full p-2 bg-[#121212] border border-[#333] rounded" />
        <textarea name="code" placeholder="Code..." rows="5" onChange={handleChange} required className="w-full p-2 bg-[#121212] border border-[#333] rounded font-mono" />
        <input type="text" name="cliCommand" placeholder="CLI Command" onChange={handleChange} className="w-full p-2 bg-[#121212] border border-[#333] rounded" />
        <input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} className="w-full p-2 bg-[#121212] border border-[#333] rounded" />
        <input type="text" name="image" placeholder="Image URL (Cloudinary)" onChange={handleChange} className="w-full p-2 bg-[#121212] border border-[#333] rounded" />
        <button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 rounded font-semibold">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
