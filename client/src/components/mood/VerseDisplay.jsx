import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, Share2, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PropTypes from 'prop-types';

const VerseDisplay = ({ verse, isAuthenticated, onSave }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (verse?.audio) {
      const newAudio = new Audio(verse.audio);
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [verse]);

  const toggleAudio = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleCopy = () => {
    const text = `${verse.arabic}\n\n${verse.translation}\n\n(${verse.surah}:${verse.ayah})`;
    navigator.clipboard.writeText(text);
    toast.success('Verse copied to clipboard');
  };

  const handleSave = async () => {
      if (!isAuthenticated) {
          toast.error("Please login to save verses");
          return;
      }
      try {
          // Optimistic UI update
          setIsSaved(!isSaved); 
          await onSave(verse);
          toast.success(isSaved ? "Removed from favorites" : "Added to favorites");
      } catch (error) {
           setIsSaved(!isSaved); // Revert
           console.error(error);
           toast.error("Failed to update favorites");
      }
  }

  // Check if verse is already favorite - This logic would typically come from parent or context
  // checking against a list of favorites. For now simplified.

  if (!verse) return null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={verse.id || verse.arabic}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-3xl mx-auto mt-8 glass rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
      >
        {/* Decorative Islamic Star Pattern Overlay */}
         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" fill="currentColor"/>
            </svg>
         </div>

        {/* Header: Surah & Play Controls */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div>
            <h2 className="text-lg font-bold text-accent-gold">{verse.surahEnglish}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Surah {verse.surahNumber}, Ayah {verse.ayahNumber}</p>
          </div>
          <div className="flex gap-2">
             <button onClick={toggleAudio} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Play Audio">
                 <Volume2 className={`w-5 h-5 ${isPlaying ? 'text-accent-gold animate-pulse' : 'text-gray-600 dark:text-gray-300'}`} />
             </button>
             <button onClick={handleCopy} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Copy Text">
                 <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
             </button>
              <button 
                onClick={handleSave} 
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Save to Favorites"
              >
                 <motion.div whileTap={{ scale: 0.8 }}>
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
                 </motion.div>
             </button>
          </div>
        </div>

        {/* Arabic Text */}
        <div className="text-center mb-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-arabic text-3xl md:text-5xl leading-loose text-gray-800 dark:text-gray-100 mb-6"
            dir="rtl"
          >
            {verse.arabic}
          </motion.p>
        </div>

        {/* Translation */}
        <div className="text-center space-y-4">
            <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium italic"
            >
                "{verse.translation}"
            </motion.p>
            {verse.tafsir && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.6 }}
                     className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 text-left"
                >
                    <strong className="block mb-2 text-accent-gold">Reflection:</strong>
                    {verse.tafsir}
                </motion.div>
            )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

VerseDisplay.propTypes = {
    verse: PropTypes.shape({
        id: PropTypes.string,
        arabic: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired,
        surahEnglish: PropTypes.string,
        surahNumber: PropTypes.number,
        ayahNumber: PropTypes.number,
        audio: PropTypes.string,
        tafsir: PropTypes.string
    }),
    isAuthenticated: PropTypes.bool,
    onSave: PropTypes.func
};

export default VerseDisplay;
