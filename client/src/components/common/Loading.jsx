import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-48">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 border-4 border-accent-gold/30 rounded-full" />
        <div className="absolute inset-0 border-t-4 border-accent-gold rounded-full" />
        {/* Geometric Center */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-accent-gold/20 rotate-45 transform" />
        </div>
      </motion.div>
    </div>
  );
};

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

Skeleton.propTypes = {
    className: PropTypes.string
};
