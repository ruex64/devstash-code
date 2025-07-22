import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable, animated button component with different visual styles.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - The button style variant.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type attribute.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {boolean} [props.isLoading] - If true, shows a loading state.
 * @param {React.ReactNode} [props.icon] - An optional icon to display before the text.
 */
const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', isLoading = false, icon }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-accent text-background hover:bg-accent/90 focus:ring-accent',
    secondary: 'bg-secondary text-text-primary hover:bg-border-color focus:ring-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {icon && <span className="w-5 h-5">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
