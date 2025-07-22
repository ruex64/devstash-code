import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Tag } from 'lucide-react';

/**
 * A card component to display a summary of a code component.
 *
 * @param {object} props - The component props.
 * @param {object} props.component - The component data object.
 * @param {string} props.component._id - The component's ID.
 * @param {string} props.component.name - The component's name.
 * @param {string} props.component.image - The URL for the component's image.
 * @param {string[]} props.component.tags - An array of tags for the component.
 * @param {object} props.component.user - The user who created the component.
 * @param {string} props.component.user._id - The creator's ID.
 * @param {string} props.component.user.name - The creator's name.
 */
const ComponentCard = ({ component }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden group"
    >
      <Link to={`/component/${component._id}`}>
        <img 
          src={component.image} 
          alt={component.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-bold text-text-primary truncate">
          <Link to={`/component/${component._id}`} className="hover:text-accent transition-colors">
            {component.name}
          </Link>
        </h3>
        
        <Link to={`/profile/${component.user._id}`} className="flex items-center gap-2 mt-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <User size={14} />
          <span>{component.user.name}</span>
        </Link>

        <div className="flex flex-wrap gap-2 mt-4">
          {component.tags.slice(0, 3).map((tag, index) => (
            <div key={index} className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full text-text-secondary">
              <Tag size={12} />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentCard;
