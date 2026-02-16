import { useEffect, useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import Card, { CardBody } from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { addFavoriteAyah } from '../../utils/api';

const AyahDisplay = ({ ayah, mood }) => {
  const [animation, setAnimation] = useState('');
  const [favoriteStatus, setFavoriteStatus] = useState({ 
    loading: false, 
    success: false, 
    error: false 
  });
  
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
      await addFavoriteAyah({ ...ayah, mood });
      setFavoriteStatus({ loading: false, success: true, error: false });
      
      setTimeout(() => {
        setFavoriteStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      console.error('Failed to add to favorites:', err);
      setFavoriteStatus({ loading: false, success: false, error: true });
      
      setTimeout(() => {
        setFavoriteStatus(prev => ({ ...prev, error: false }));
      }, 3000);
    }
  };

  if (!ayah) return null;

  const getBgColor = () => {
    const moodColors = {
      happy: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10',
      sad: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10',
      anxious: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10',
      angry: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10',
      confused: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10',
      stressed: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/10',
      grateful: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10',
      fearful: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/10',
      peaceful: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/10'
    };
    
    return moodColors[mood] || 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/10';
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
        <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
          <FaCircleCheck className="h-5 w-5" />
          <span>Added to favorites!</span>
        </div>
      );
    }
    
    if (favoriteStatus.error) {
      return (
        <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
          <FaCircleXmark className="h-5 w-5" />
          <span>Failed to save</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center space-x-2">
        <FaHeart className="h-5 w-5" />
        <span>Save to favorites</span>
      </div>
    );
  };

  return (
    <Card className={`overflow-hidden shadow-lg ${animation} ${getBgColor()} border border-gray-200 dark:border-gray-700`}>
      <CardBody className="p-8">
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-2xl text-center">
            <span className="absolute top-0 left-0 text-6xl opacity-10 dark:opacity-20">﴾</span>
            <span className="absolute top-0 right-0 text-6xl opacity-10 dark:opacity-20">﴿</span>
            
            <blockquote className="relative z-10">
              <p className="text-2xl font-medium text-gray-800 dark:text-white mb-6 leading-relaxed">
                "{ayah.text}"
              </p>
              <footer className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                {ayah.reference}
              </footer>
            </blockquote>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full my-8 opacity-70"></div>
          
          <div className="text-center mb-8">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              This ayah was selected for your{' '}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {mood}
              </span>{' '}
              mood.
            </p>
          </div>
          
          <button
            onClick={handleAddToFavorites}
            disabled={favoriteStatus.loading || favoriteStatus.success}
            className={`mt-2 px-6 py-3 rounded-full flex items-center justify-center min-w-48 transition-all duration-300 ${
              favoriteStatus.success 
                ? 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/50 dark:text-green-300 shadow-green-200/50' 
                : favoriteStatus.error
                ? 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/50 dark:text-red-300 shadow-red-200/50'
                : 'bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 text-amber-800 dark:from-amber-900/50 dark:to-amber-800/50 dark:text-amber-300 shadow-amber-200/50 hover:shadow-lg'
            } shadow-md`}
          >
            {getButtonStatus()}
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AyahDisplay;