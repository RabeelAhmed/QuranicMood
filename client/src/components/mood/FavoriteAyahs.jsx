import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaStar, FaTrash } from 'react-icons/fa';
import Card, { CardBody, CardHeader } from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { getFavoriteAyahs, removeFavoriteAyah } from '../../utils/api';

const FavoriteAyahs = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
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
      setFavorites(favorites.filter(fav => fav._id !== id));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  const getMoodBadgeStyle = (mood) => {
    const moodStyles = {
      happy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      sad: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      anxious: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      angry: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      confused: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      stressed: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      grateful: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      fearful: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      peaceful: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
    };
    return moodStyles[mood] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  if (loading) {
    return <div className="flex justify-center items-center my-12 h-48"><LoadingSpinner size="lg" /></div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600 dark:text-red-400"><p>{error}</p></div>;
  }

  if (favorites.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardBody>
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <FaStar className="text-gray-400 dark:text-gray-600 text-5xl mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              You haven't saved any favorite ayahs yet.
            </h3>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {favorites.map((favorite) => (
        <Card key={favorite._id} className="overflow-hidden shadow-md">
          <CardHeader className="bg-gray-50 dark:bg-gray-800 flex justify-between items-center p-4">
            <div className="flex items-center space-x-2">
              <FaStar className="text-amber-500 text-lg" />
              <h3 className="font-medium text-gray-800 dark:text-white">Favorite Ayah</h3>
              {favorite.ayah.mood && (
  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getMoodBadgeStyle(favorite.ayah.mood)}`}>
    {favorite.ayah.mood}
  </span>
)}

            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(favorite.createdAt), 'MMM d, yyyy - h:mm a')}
              </span>
              <button
                onClick={() => handleRemoveFavorite(favorite._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <blockquote className="text-center mb-4">
              <p className="text-lg font-medium italic text-gray-800 dark:text-white mb-4 leading-relaxed">
                "{favorite.ayah.text}"
              </p>
              <footer className="text-sm text-gray-600 dark:text-gray-400">
                {favorite.ayah.reference}
              </footer>
            </blockquote>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default FavoriteAyahs;
