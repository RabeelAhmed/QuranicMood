import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Card, { CardHeader } from '../components/common/Card';
import FavoriteAyahs from '../components/mood/FavoriteAyahs';

const FavoritesPage = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="text-center">Authenticating...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="mb-8">
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Favorite Ayahs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Collection of Quranic verses that have inspired you.
          </p>
        </CardHeader>
      </Card>
      
      <FavoriteAyahs />
    </div>
  );
};

export default FavoritesPage;