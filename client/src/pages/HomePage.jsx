import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useDebounce from '../hooks/useDebounce';
import ComponentCard from '../components/specific/ComponentCard';
import Input from '../components/common/Input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/components?keyword=${debouncedSearchTerm}`);
        setComponents(data);
      } catch (error) {
        console.error("Failed to fetch components:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, [debouncedSearchTerm]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold text-center text-text-primary">Explore Components</h1>
        <p className="text-center text-text-secondary mt-2">Discover, share, and remix code snippets from the community.</p>
      </motion.div>

      <div className="max-w-xl mx-auto">
        <Input
          id="search"
          label=""
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, tag, or description..."
          icon={<Search size={18} />}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {components.map((component) => (
              <ComponentCard key={component._id} component={component} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      
      {!loading && components.length === 0 && (
        <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary">No Components Found</h3>
            <p className="text-text-secondary mt-2">Try a different search term or be the first to create one!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
