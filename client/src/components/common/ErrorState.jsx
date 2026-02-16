import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ErrorState = ({ message, onRetry }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message || "We couldn't load the content. Please check your connection and try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </motion.div>
  );
};

ErrorState.propTypes = {
    message: PropTypes.string,
    onRetry: PropTypes.func
};

export default ErrorState;
