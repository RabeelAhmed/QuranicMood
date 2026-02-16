import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const MoodCard = ({ mood, onClick, isSelected }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(mood)}
      className={clsx(
        "relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-300 text-left w-full h-32 flex flex-col justify-between group",
        "bg-white dark:bg-gray-800 border border-transparent hover:border-accent-gold/30",
        isSelected && "ring-2 ring-accent-gold ring-offset-2 dark:ring-offset-gray-900"
      )}
    >
      {/* Background Gradient Blob */}
      <div 
        className={clsx(
          "absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity",
          mood.color || "bg-accent-gold"
        )} 
      />

      <div className="relative z-10">
        <span className="text-4xl mb-2 block">{mood.emoji}</span>
        <h3 className="text-lg font-bold font-heading text-gray-800 dark:text-white group-hover:text-accent-gold transition-colors">
          {mood.label}
        </h3>
      </div>
    </motion.button>
  );
};

MoodCard.propTypes = {
  mood: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    color: PropTypes.string, // Tailwind class for blob color, e.g., 'bg-blue-500'
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default MoodCard;
