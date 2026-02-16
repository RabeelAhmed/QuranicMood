import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import MoodCard from '../components/mood/MoodCard';
import VerseDisplay from '../components/mood/VerseDisplay';
import { LoadingSpinner } from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import { toast } from 'react-hot-toast';
import { getAyahByMood, addFavoriteAyah } from '../utils/api';

const MOODS = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-400' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-400' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-teal-400' },
  { id: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-400' },
  { id: 'confused', label: 'Confused', emoji: '😕', color: 'bg-purple-400' },
  { id: 'grateful', label: 'Grateful', emoji: '🤲', color: 'bg-accent-gold' },
  { id: 'lonely', label: 'Lonely', emoji: '🙍', color: 'bg-gray-400' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌱', color: 'bg-green-400' },
];

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedMood, setSelectedMood] = useState(null);
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMoodSelect = async (mood) => {
    if (!isAuthenticated) {
      toast.error('Please login to get personalized verses');
      return;
    }

    setSelectedMood(mood.id);
    setLoading(true);
    setError(null);
    setVerse(null);

    try {
      const data = await getAyahByMood(mood.id);
      
      setVerse({
        id: Date.now().toString(),
        arabic: data.text || "Arabic text unavailable",
        translation: data.translation !== data.text ? data.translation : "",
        surahEnglish: data.reference || "Quran Reference",
        surahNumber: 0,
        ayahNumber: 0,
      });

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch verse. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setVerse(null);
    setError(null);
  };

  const handleSaveVerse = async (verseToSave) => {
     try {
      await addFavoriteAyah({
        text: verseToSave.arabic,
        reference: verseToSave.surahEnglish,
        translation: verseToSave.translation || verseToSave.arabic,
        mood: selectedMood
      });
     } catch (err) {
         console.error("Error saving favorite:", err);
         throw err;
     }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold font-heading mb-6"
        >
          How are you <span className="text-gradient">feeling</span> today?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Select your mood to receive a personalized Quranic verse for guidance and comfort.
        </motion.p>
      </div>

      {/* Mood Grid */}
      <AnimatePresence mode='wait'>
        {!selectedMood && (
             <motion.div 
             key="grid"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, y: -20 }}
             className="grid grid-cols-2 md:grid-cols-4 gap-6"
           >
             {MOODS.map((mood, index) => (
               <motion.div
                 key={mood.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
               >
                 <MoodCard 
                   mood={mood} 
                   onClick={() => handleMoodSelect(mood)} 
                 />
               </motion.div>
             ))}
           </motion.div>
        )}

        {/* Loading State */}
        {loading && (
             <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
             >
                 <LoadingSpinner />
                 <p className="text-center text-gray-500 mt-4">Consulting the Quran for you...</p>
             </motion.div>
        )}

        {/* Result State */}
        {(verse || error) && !loading && (
            <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
            >
                {error ? (
                    <ErrorState message={error} onRetry={() => handleMoodSelect({ id: selectedMood })} />
                ) : (
                    <VerseDisplay 
                        verse={verse} 
                        isAuthenticated={isAuthenticated}
                        onSave={handleSaveVerse}
                    />
                )}
                
                <button 
                    onClick={handleReset}
                    className="mt-12 text-gray-500 hover:text-accent-gold transition-colors flex items-center gap-2"
                >
                    ← Choose another mood
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;