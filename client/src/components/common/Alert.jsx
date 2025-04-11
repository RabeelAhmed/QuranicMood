// src/components/common/Alert.jsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Alert = ({ variant = 'error', children, onDismiss }) => {
  const variants = {
    error: 'bg-red-50 border-red-400 text-red-700',
    success: 'bg-green-50 border-green-400 text-green-700',
  };

  return (
    <div className={`${variants[variant]} border px-4 py-3 rounded relative mb-4`} role="alert">
      <div className="flex items-center">
        <span className="block sm:inline pr-6">{children}</span>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 p-1 hover:bg-opacity-20 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;