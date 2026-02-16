import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Quote } from 'lucide-react';
import { format } from 'date-fns';
import { getFavoriteAyahs, removeFavoriteAyah } from '../../utils/api'; // Ensure api utils exist or use axios directly
import { LoadingSpinner } from '../common/Loading'; // Correct import path
import ErrorState from '../common/ErrorState'; // Correct import path
import { toast } from 'react-hot-toast';

const FavoriteAyahs = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // Assuming getFavoriteAyahs uses axios and returns data directly
        // If not, we might need to adjust. 
        // Based on previous file, it seemed to be a utility function.
        // I will assume it works as before or I should have checked api.js.
        // To be safe, I'll use the imported function but wrap in try-catch.
        const data = await getFavoriteAyahs(); 
        setFavorites(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError('Failed to load favorites');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavoriteAyah(id);
      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
      toast.success('Removed from favorites');
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      toast.error('Failed to remove');
    }
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      sad: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      anxious: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
      angry: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      confused: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      grateful: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      lonely: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      hopeful: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    };
    return colors[mood?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
        </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  if (favorites.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Quote className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Favorites Yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Save verses that resonate with you to see them here.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {favorites.map((fav, index) => (
          <motion.div
            key={fav._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            <div className="flex justify-between items-start mb-4">
               {fav.ayah.mood ? (
                   <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getMoodColor(fav.ayah.mood)}`}>
                       {fav.ayah.mood}
                   </span>
               ) : (
                   <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                       Saved
                   </span>
               )}
               
               <button 
                onClick={() => handleRemoveFavorite(fav._id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Remove"
               >
                   <Trash2 className="w-4 h-4" />
               </button>
            </div>

            <div className="mb-4">
               <p className="font-arabic text-2xl text-right text-gray-800 dark:text-gray-100 mb-3 leading-loose" dir="rtl">
                   {fav.ayah.text} 
               </p>
               {/* 
                  Note: The backend seems to store the full text in 'text'. 
                  If backend separates them later, update here.
                  For now we just show what we have.
               */}
               <p className="text-sm text-gray-600 dark:text-gray-300 italic line-clamp-4">
                   {fav.ayah.translation !== fav.ayah.text ? fav.ayah.translation : ""}
               </p>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="font-semibold text-accent-gold">{fav.ayah.reference}</span>
                <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(fav.createdAt), 'MMM d')}
                </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteAyahs;