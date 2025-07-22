import React from 'react';

/**
 * A reusable, styled input component.
 *
 * @param {object} props - The component props.
 * @param {string} props.id - The unique ID for the input, used for the label's htmlFor.
 * @param {string} props.label - The text for the input's label.
 * @param {string} props.type - The input's type (e.g., 'text', 'email', 'password').
 * @param {string} props.value - The current value of the input.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - The function to call on value change.
 * @param {string} [props.placeholder] - The placeholder text.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} [props.icon] - An optional icon to display inside the input.
 */
const Input = ({ id, label, type, value, onChange, placeholder, required = false, className = '', icon }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-primary border border-border-color rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-300 ${icon ? 'pl-10' : ''} ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;
