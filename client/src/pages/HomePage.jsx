import { useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import Button from '../components/common/Button';

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const welcomeShown = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !welcomeShown.current) {
      toast.success('Welcome back! 😊');
      welcomeShown.current = true;
    }
  }, [isAuthenticated]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find <span className="text-primary">Quranic Guidance</span> Based on Your Mood
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover relevant Quranic verses that provide comfort, guidance, and inspiration based on how you're feeling today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="primary" className="px-8 py-3 text-lg">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary" className="px-8 py-3 text-lg">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="px-8 py-3 text-lg">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-center mb-4">
              <span className="text-4xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Share Your Mood</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Simply select how you're feeling, whether happy, sad, anxious, or peaceful.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-center mb-4">
              <span className="text-4xl">📖</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Get Personalized Ayah</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Receive a Quranic verse that resonates with your current emotional state.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-center mb-4">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Track Your Journey</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Build a collection of your moods and the Quranic guidance you've received.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;