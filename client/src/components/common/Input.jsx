// src/components/common/Input.jsx
import React from 'react';

const Input = React.forwardRef(({
  label,
  type = 'text',
  name,
  value,
  onChange,
  helperText,
  required = false,
  autoComplete,
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={ref}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all duration-200"
        {...props}
      />
      {helperText && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;