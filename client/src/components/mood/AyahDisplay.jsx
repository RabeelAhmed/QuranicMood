import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import Card, { CardBody } from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { addFavoriteAyah } from '../../utils/api';

const AyahDisplay = ({ ayah, loading, mood }) => {
  const [animation, setAnimation] = useState('');
  const [favoriteStatus, setFavoriteStatus] = useState({ loading: false, success: false, error: false });
  
  useEffect(() => {
    if (ayah) {
      setAnimation('animate-fade-in');
      const timer = setTimeout(() => setAnimation(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [ayah]);

  const handleAddToFavorites = async () => {
    if (!ayah) return;
    
    try {
      setFavoriteStatus({ loading: true, success: false, error: false });
      await addFavoriteAyah({ ...ayah, mood }); // Include mood when saving favorite
      setFavoriteStatus({ loading: false, success: true, error: false });
      
      // Reset success status after 3 seconds
      setTimeout(() => {
        setFavoriteStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      console.error('Failed to add to favorites:', err);
      setFavoriteStatus({ loading: false, success: false, error: true });
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setFavoriteStatus(prev => ({ ...prev, error: false }));
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-12 h-48">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!ayah) return null;

  const getBgColor = () => {
    const moodColors = {
      happy: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20',
      sad: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
      anxious: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
      angry: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20',
      confused: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20',
      stressed: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20',
      grateful: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20',
      fearful: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20',
      peaceful: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/20'
    };
    
    return moodColors[mood] || 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/20';
  };

  const getButtonStatus = () => {
    if (favoriteStatus.loading) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner size="sm" /> 
          <span>Saving...</span>
        </div>
      );
    }
    
    if (favoriteStatus.success) {
      return (
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <FaCircleCheck className="h-5 w-5" />
          <span>Added to favorites!</span>
        </div>
      );
    }
    
    if (favoriteStatus.error) {
      return (
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <FaCircleXmark className="h-5 w-5" />
          <span>Failed to save</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center space-x-2">
        <FaStar className="h-5 w-5" />
        <span>Add to favorites</span>
      </div>
    );
  };

  return (
    <Card className={`overflow-hidden shadow-lg ${animation} ${getBgColor()}`}>
      <CardBody className="p-8">
        <div className="flex flex-col items-center">
          <blockquote className="text-center mb-6">
            <p className="text-xl font-medium italic text-gray-800 dark:text-white mb-4 leading-relaxed">
              "{ayah.text}"
            </p>
            <footer className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {ayah.reference}
            </footer>
          </blockquote>

          <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
          
          <div className="text-center mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              This ayah was selected based on your <span className="font-medium text-primary">{mood}</span> mood.
            </p>
          </div>
          
          <button
            onClick={handleAddToFavorites}
            disabled={favoriteStatus.loading || favoriteStatus.success}
            className={`mt-4 px-4 py-2 rounded-full flex items-center justify-center min-w-40 transition-colors ${
              favoriteStatus.success 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
                : favoriteStatus.error
                ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-900/70'
            }`}
          >
            {getButtonStatus()}
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AyahDisplay;