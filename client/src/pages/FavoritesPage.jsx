import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import FavoriteAyahs from '../components/mood/FavoriteAyahs';
import { LoadingSpinner } from '../components/common/Loading';

const FavoritesPage = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-gray-800 dark:text-white">
            Your Favorite Ayahs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Collection of Quranic verses that have inspired you.
          </p>
      </div>
      
      <FavoriteAyahs />
    </div>
  );
};

export default FavoritesPage;